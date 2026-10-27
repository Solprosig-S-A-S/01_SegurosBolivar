"""Validate game syntax, offline resources and canonical SCORM packages.

Uses Python stdlib and the existing Node executable. Does not launch a browser,
install packages or change source files. Exit status is nonzero on any defect.
"""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class GameMarkup(HTMLParser):
    """Collect actual IDs, script bodies and runtime resources, excluding JS templates."""

    def __init__(self):
        super().__init__()
        self.ids = []
        self.scripts = []
        self.styles = []
        self.resources = []
        self.active = None
        self.parts = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag in ('script', 'style'):
            self.active = tag
            self.parts = []
        if tag in ('script', 'img', 'iframe', 'audio', 'video', 'source', 'link'):
            resource = attrs.get('src') or attrs.get('href')
            if resource:
                self.resources.append(resource)

    def handle_data(self, data):
        if self.active:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag == self.active:
            (self.scripts if tag == 'script' else self.styles).append(''.join(self.parts))
            self.active = None


def verify():
    """Check five sources and six ZIPs; raise AssertionError on inconsistencies."""
    games = sorted(ROOT.glob('juego*.html'))
    assert len(games) == 5, 'Expected exactly five games'
    for game in games:
        source = game.read_text(encoding='utf-8')
        markup = GameMarkup()
        markup.feed(source)
        assert not [key for key, count in Counter(markup.ids).items() if count > 1], f'{game.name}: duplicate IDs'
        assert not markup.resources, f'{game.name}: unembedded runtime resource: {markup.resources}'
        for css in markup.styles:
            assert not re.search(r'url\(\s*["\']?(?:https?:)?//|@import', css), f'{game.name}: remote CSS resource'
        for number, script in enumerate(markup.scripts, 1):
            result = subprocess.run(['node', '--check', '-'], input=script, text=True, encoding='utf-8', capture_output=True)
            assert result.returncode == 0, f'{game.name}, script {number}: {result.stderr}'
        assert 'BEGIN GAME ACCESSIBILITY' in source, f'{game.name}: accessibility runtime missing'
        expected = (ROOT / 'tools' / 'accessibility_runtime.html').read_text(encoding='utf-8').strip()
        embedded = re.search(r'<!-- BEGIN GAME ACCESSIBILITY -->.*?<!-- END GAME ACCESSIBILITY -->', source, re.S)
        assert embedded and embedded.group(0).strip() == expected, f'{game.name}: stale accessibility runtime'
        assert 'training-scope-note' in source, f'{game.name}: scenario scope missing'
        package = ROOT / 'scorm_packages' / f'{game.stem}_scorm.zip'
        with zipfile.ZipFile(package) as archive:
            assert archive.testzip() is None, f'{package.name}: corrupted entry'
            assert archive.read('index.html').decode('utf-8').replace('\r\n', '\n') == source, f'{package.name}: stale HTML'
            manifest = ET.fromstring(archive.read('imsmanifest.xml'))
            ns = {'ims': 'http://www.imsproject.org/xsd/imscp_rootv1p1p2'}
            for resource in manifest.findall('.//ims:file', ns):
                assert resource.attrib['href'] in archive.namelist(), f'{package.name}: missing manifest resource'
        print(f'OK {game.name}: {len(markup.scripts)} scripts; offline resources; SCORM matches')
    with zipfile.ZipFile(ROOT / 'scorm_packages' / 'suite_completa_5juegos_scorm.zip') as archive:
        assert archive.testzip() is None, 'Suite ZIP corruption'
        ET.fromstring(archive.read('imsmanifest.xml'))
        for game in games:
            assert archive.read(game.name).decode('utf-8').replace('\r\n', '\n') == game.read_text(encoding='utf-8'), f'Suite: stale {game.name}'
    print('OK suite: five current sources and valid XML')


if __name__ == '__main__':
    try:
        verify()
    except (AssertionError, OSError, ET.ParseError, zipfile.BadZipFile) as error:
        print(f'FAIL: {error}', file=sys.stderr)
        raise SystemExit(1) from error
