"""
SCRIPT AUTOMATIZADO DE EMPAQUETADO SCORM 1.2 PARA MOODLE LMS
Suite Arcade de Seguridad Química - Seguros Bolívar & KMA Construcciones

Genera paquetes SCORM 1.2 (.zip) estándar listos para importar directamente
en Moodle como actividades calificables ('Añadir actividad o recurso -> Paquete SCORM').
Cada paquete incluye su imsmanifest.xml canónico, launch file index.html y metadatos CMI.
"""

import os
import zipfile

GAMES_CONFIG = [
    {
        "id": "BOLIVAR-SGA-01",
        "source": "juego1_sga.html",
        "zip_name": "juego1_sga_scorm.zip",
        "title": "Juego 1: Desafío SGA - Clasificación de Peligros y Lectura de FDS",
        "description": "Simulador de evaluación del Sistema Globalmente Armonizado, lectura de FDS (Sección 2 y 8) y pictogramas bajo Res. 773/2021.",
        "mastery_score": 80
    },
    {
        "id": "BOLIVAR-BODEGA-02",
        "source": "juego2_bodega.html",
        "zip_name": "juego2_bodega_scorm.zip",
        "title": "Juego 2: Bodega Segura - Matriz de Compatibilidad Química y Segregación",
        "description": "Puzzle 2.5D de compatibilidad química según NTC 4435, CISTEMA ARL Sura y Decreto 4741/2005 para bodegas de obra.",
        "mastery_score": 80
    },
    {
        "id": "BOLIVAR-TRASIEGO-03",
        "source": "juego3_trasiego.html",
        "zip_name": "juego3_trasiego_scorm.zip",
        "title": "Juego 3: Inspector de Trasiego - Procedimiento Seguro de Abastecimiento",
        "description": "Inspección paso a paso de trasiego de combustible diésel/ACPM según Decreto 1079 de 2015 y NFPA 77.",
        "mastery_score": 80
    },
    {
        "id": "BOLIVAR-TALLER-04",
        "source": "juego4_taller.html",
        "zip_name": "juego4_taller_scorm.zip",
        "title": "Juego 4: Taller Seguro - Dotación EPP y Gestión de Residuos RESPEL",
        "description": "Simulador isométrico multiescenario de taller mecánico, vestidor de bioseguridad y confinamiento de residuos peligrosos.",
        "mastery_score": 80
    },
    {
        "id": "BOLIVAR-EMERGENCIAS-05",
        "source": "juego5_emergencias.html",
        "zip_name": "juego5_emergencias_scorm.zip",
        "title": "Juego 5: Brigada de Emergencia - Simulador en 1ª Persona de Control de Fuga",
        "description": "Simulador 3D en primera persona para atención táctica de fugas químicas, lavaojos ANSI Z358.1 y contención con kit.",
        "mastery_score": 80
    }
]

def generate_manifest_xml(cfg):
    """Genera el contenido XML del imsmanifest.xml oficial SCORM 1.2."""
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="{cfg['id']}-MANIFEST" version="1.1"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.imsoperas.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="{cfg['id']}-ORG">
    <organization identifier="{cfg['id']}-ORG">
      <title>{cfg['title']}</title>
      <item identifier="{cfg['id']}-ITEM" identifierref="{cfg['id']}-RES">
        <title>{cfg['title']}</title>
        <adlcp:masteryscore>{cfg['mastery_score']}</adlcp:masteryscore>
        <adlcp:datafromlms></adlcp:datafromlms>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="{cfg['id']}-RES" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html" />
    </resource>
  </resources>
</manifest>
"""

def generate_multi_sco_manifest_xml():
    """Genera manifiesto SCORM 1.2 Multi-SCO que contiene los 5 juegos juntos en un solo paquete."""
    items_xml = ""
    resources_xml = ""
    for idx, cfg in enumerate(GAMES_CONFIG, start=1):
        items_xml += f"""      <item identifier="{cfg['id']}-ITEM" identifierref="{cfg['id']}-RES">
        <title>{cfg['title']}</title>
        <adlcp:masteryscore>{cfg['mastery_score']}</adlcp:masteryscore>
      </item>\n"""
        resources_xml += f"""    <resource identifier="{cfg['id']}-RES" type="webcontent" adlcp:scormtype="sco" href="{cfg['source']}">
      <file href="{cfg['source']}" />
    </resource>\n"""

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="BOLIVAR-SUITE-COMPLETA-MANIFEST" version="1.1"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.imsoperas.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="BOLIVAR-SUITE-ORG">
    <organization identifier="BOLIVAR-SUITE-ORG">
      <title>Suite Arcade de Seguridad Química (Seguros Bolívar &amp; KMA)</title>
{items_xml}    </organization>
  </organizations>
  <resources>
{resources_xml}  </resources>
</manifest>
"""

def build_packages():
    output_dir = "scorm_packages"
    os.makedirs(output_dir, exist_ok=True)
    
    print("============================================================")
    print("[SCORM BUILDER] CONSTRUYENDO PAQUETES SCORM 1.2 PARA MOODLE LMS")
    print("============================================================")

    # 1. Construir paquetes individuales
    for cfg in GAMES_CONFIG:
        source_path = cfg["source"]
        if not os.path.exists(source_path):
            print(f"[ERROR] No se encontro el archivo fuente: {source_path}")
            continue

        zip_path = os.path.join(output_dir, cfg["zip_name"])
        manifest_content = generate_manifest_xml(cfg)

        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            # Archivo manifiesto canonico
            zf.writestr("imsmanifest.xml", manifest_content.encode("utf-8"))
            # Archivo de lanzamiento index.html (copia del archivo fuente)
            with open(source_path, 'r', encoding='utf-8') as sf:
                html_content = sf.read()
            zf.writestr("index.html", html_content.encode("utf-8"))

        file_size_kb = round(os.path.getsize(zip_path) / 1024, 1)
        print(f"[OK] Paquete Creado: {zip_path} ({file_size_kb} KB)")
        print(f"     Titulo: {cfg['title']}")
        print(f"     Mastery Score Moodle: {cfg['mastery_score']} pts")

    # 2. Construir paquete Combo Multi-SCO de la Suite Completa
    combo_zip_path = os.path.join(output_dir, "suite_completa_5juegos_scorm.zip")
    multi_manifest = generate_multi_sco_manifest_xml()
    with zipfile.ZipFile(combo_zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("imsmanifest.xml", multi_manifest.encode("utf-8"))
        for cfg in GAMES_CONFIG:
            with open(cfg["source"], 'r', encoding='utf-8') as sf:
                zf.writestr(cfg["source"], sf.read().encode("utf-8"))

    combo_size_kb = round(os.path.getsize(combo_zip_path) / 1024, 1)
    print(f"[OK] Paquete Combo Creado: {combo_zip_path} ({combo_size_kb} KB) - 5 SCOs integrados")
    print("============================================================")
    print("[FINALIZADO] Todos los paquetes SCORM 1.2 listos para subir a Moodle.")

if __name__ == "__main__":
    build_packages()
