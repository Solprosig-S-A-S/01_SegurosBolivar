"""Embed the games' existing CDN dependencies for standalone/offline distribution.

Uses only Python's standard library. Downloads exactly the URLs already referenced
by each HTML plus font files referenced by their stylesheets. Versions of GSAP
(3.12.2) and Font Awesome (6.4.0) are preserved; no package is installed.
Network/HTTP failures propagate without changing the current HTML file. Download
all required assets before writing any HTML, so an incomplete download is harmless.
"""

import base64
import hashlib
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]


def bundle():
    """Embed remote CSS/scripts and fonts, preserving upstream license comments.

    Returns None. Raises HTTPError, URLError or OSError on download/write failure.
    Existing self-contained files are left unchanged on subsequent runs.
    """
    cache = {}

    def download(url):
        if url not in cache:
            request = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36'
            })
            with urllib.request.urlopen(request, timeout=30) as response:
                cache[url] = response.read()
        return cache[url]

    def css_with_fonts(url):
        css = download(url).decode('utf-8')

        def inline_font(match):
            resource = match.group(1).strip('"\' ')
            if resource.startswith('data:'):
                return match.group(0)
            full_url = urllib.parse.urljoin(url, resource)
            extension = urllib.parse.urlparse(full_url).path.rsplit('.', 1)[-1]
            mime = {'woff2': 'font/woff2', 'woff': 'font/woff', 'ttf': 'font/ttf'}.get(extension)
            if not mime:
                raise ValueError(f'Unexpected CSS resource: {full_url}')
            encoded = base64.b64encode(download(full_url)).decode('ascii')
            return f'url(data:{mime};base64,{encoded})'

        return re.sub(r'url\(([^)]+)\)', inline_font, css)

    prepared = {}
    for file in sorted(ROOT.glob('juego*.html')):
        html = file.read_text(encoding='utf-8')
        html = re.sub(r'^\s*<link[^>]+rel="preconnect"[^>]*>\s*$', '', html, flags=re.M)

        def inline_stylesheet(match):
            url = match.group(1)
            vendor = 'font-awesome-6.4.0' if 'font-awesome' in url else 'google-fonts'
            return f'<style data-vendor="{vendor}">\n{css_with_fonts(url)}\n</style>'

        html = re.sub(r'<link[^>]+href="(https://(?:fonts\.googleapis\.com|cdnjs\.cloudflare\.com)[^"]+)"[^>]*>', inline_stylesheet, html)

        def inline_script(match):
            url = match.group(1)
            script = download(url).decode('utf-8')
            if '</script' in script.lower():
                raise ValueError('Unexpected closing script tag in vendor asset')
            return f'<script data-vendor="gsap-3.12.2">\n{script}\n</script>'

        html = re.sub(r'<script src="(https://cdnjs\.cloudflare\.com/ajax/libs/gsap/3\.12\.2/gsap\.min\.js)"></script>', inline_script, html)
        prepared[file] = html

    if not cache:
        print('All five HTML files are already self-contained.')
        return
    for file, html in prepared.items():
        file.write_text(html, encoding='utf-8', newline='\n')
    provenance = [
        '# Embedded third-party assets', '',
        'Embedded by `python tools/bundle_offline.py` from dependencies already used by the games.',
        'Upstream license notices are preserved in the embedded CSS/JavaScript.',
        'GSAP: https://gsap.com/standard-license/ . Font Awesome: https://fontawesome.com/license/free .',
        'Google Fonts: https://fonts.google.com/attribution . No runtime network requests are needed.', '',
        '| Source | SHA-256 |', '| --- | --- |'
    ]
    provenance.extend(f'| {url} | `{hashlib.sha256(data).hexdigest()}` |' for url, data in cache.items())
    (ROOT / 'docs' / 'THIRD_PARTY_ASSETS.md').write_text('\n'.join(provenance) + '\n', encoding='utf-8')
    print(f'Embedded {len(cache)} existing assets into five HTML files.')


if __name__ == '__main__':
    bundle()
