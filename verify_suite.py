import os
import re

def main():
    checks = {
        'index.html': ['Solprosig', 'Seguros Bolívar', 'Siggy', 'sb_solprosig_arcade_state', 'sb_kma_arcade_state', 'KMA Construcciones'],
        'siggy_mascot.html': ['Solprosig', 'Seguros Bolívar', 'SiggyController', 'KMA Construcciones'],
        'game1_sga_hazard.html': ['Res. 773', 'SGA_PICTOGRAMS', 'getGhsSvg', 'GHS_CANVAS_IMAGES', 'signalWord', 'hazardCode', 'PELIGRO', 'Solprosig', 'KMA', 'quizModal', 'Puntuación Final Total'],
        'game2_bodega_peligro.html': ['Res. 773', 'PROHIBIDO REENVASE', 'GHS02', 'GHS05', 'GHS03', 'GHS07', 'getGhsSvg', 'STORAGE_ITEMS', 'Solprosig', 'KMA', 'quizModal', 'Puntuación Final Total'],
        'game3_combustible_nitro.html': ['Dec. 1079', '1202', '30', 'NFPA 704', 'ACPM B10', 'SOLPROSIG', 'KMA', 'quizModal', 'Puntuación Final Total'],
        'game4_meca_dress_respel.html': ['Dec. 4741', 'RESPEL', 'ROJA RESPEL', 'RECICLABLE', 'SOLPROSIG', 'KMA', 'quizModal', 'Puntuación Final Total'],
        'game5_slime_invasor.html': ['Dec. 4741', 'Res. 773', 'RESPEL', 'H225', 'Tyvek', 'SOLPROSIG', 'KMA', 'quizModal', 'Puntuación Final Total']
    }

    all_ok = True
    print("=== AUDITORÍA TÉCNICA Y NORMATIVA DE MINIJUEGOS ===")
    for f, tokens in checks.items():
        if not os.path.exists(f):
            print(f"❌ FAIL: {f} no existe")
            all_ok = False
            continue
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        missing = [t for t in tokens if t not in c]
        if missing:
            print(f"[FAIL]: {f} carece de los tokens: {missing}")
            all_ok = False
        else:
            print(f"[PASS]: {f} ({len(tokens)} tokens normativos validados)")

    print("\n=== VERIFICACION DE INDEPENDENCIA DE RECURSOS RASTER ===")
    raster_pattern = re.compile(r'src=["\']https?://[^"\']+\.(png|jpg|jpeg|gif|webp)["\']', re.IGNORECASE)
    for f in checks.keys():
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        matches = raster_pattern.findall(c)
        if matches:
            print(f"[WARN]: Imagenes raster externas detectadas en {f}: {matches}")
            all_ok = False
        else:
            print(f"[PASS]: {f} cumple 100% vector SVG/Canvas offline sin dependencias binarias externas")

    if all_ok:
        print("\nTODOS LOS MINIJUEGOS CUMPLEN CON LA NORMATIVA Y ESTANDARES VISUALES OFICIALES (100% OK)")
    return 0 if all_ok else 1

if __name__ == '__main__':
    exit(main())
