"""
Optimise les images du portfolio pour le web.

Prend les originaux dans assets/ (jamais modifiés) et crée dans site/img/
des versions WebP, plus légères, en une ou plusieurs largeurs. Le navigateur
choisit ensuite la taille adaptée à l'écran (attribut srcset dans le HTML).

Utilisation, depuis le dossier du projet :
    python tools/optimiser_images.py

Pour ajouter une image : ajouter une ligne dans IMAGES ci-dessous, relancer
le script, puis référencer l'image dans site/data/projets.fr.js.
Nécessite Pillow (pip install Pillow).
"""

from pathlib import Path

from PIL import Image, ImageOps

RACINE = Path(__file__).resolve().parent.parent
ORIGINAUX = RACINE / "assets"
DESTINATION = RACINE / "site" / "img"

# Largeurs produites par défaut (en pixels). Une image n'est jamais agrandie :
# les largeurs supérieures à l'original sont ignorées.
LARGEURS = [800, 1600]

# Qualité WebP de 0 à 100 : 82 est un bon compromis poids / netteté.
QUALITE = 82

# (fichier original dans assets/, fichier de sortie dans site/img/ sans extension)
# Le nom de sortie est sans espaces ni accents, pour des adresses web propres.
IMAGES = [
    # Cartes des projets principaux (étape 5a)
    ("Loom/user_holding_phone.jpeg", "loom/loom-test-utilisateur"),
    ("OccluMap/OccluMap maquette de l'interface généré par IA.png", "occlumap/occlumap-maquette"),
    # Vues détaillées (étape 5b)
    ("Loom/timeline_UI.png", "loom/loom-frise"),
    ("Loom/phone_open.png", "loom/loom-interieur"),
    ("OccluMap/Contact map between the arches in the intraoral scanner software.png", "occlumap/occlumap-carte-contacts"),
    ("OccluMap/Tableau Miro.png", "occlumap/occlumap-etat-de-l-art"),
    ("OccluMap/Digital intraoral scanning model from Wen et al., Clin Exp Dent Res 2025.jpg", "occlumap/occlumap-scan-wen-2025"),
    # Projets secondaires (étape 6a). La frise « timeline .png » est écartée :
    # ses dates de livraison ne sont plus à jour.
    ("kickstarter/photo lampe.jpeg", "petale/petale-lampe"),
    ("kickstarter/photo lampe2.jpeg", "petale/petale-lampe-2"),
    ("kickstarter/pieces lampes.png", "petale/petale-pieces"),
]


def largeurs_a_produire(largeur_originale):
    """Largeurs de LARGEURS plus petites que l'original, plus l'original
    lui-même s'il ne dépasse pas la plus grande largeur de LARGEURS.
    Exemples : 1672 px -> [800, 1600] ; 1200 px -> [800, 1200] ; 343 px -> [343]."""
    largeurs = [l for l in LARGEURS if l < largeur_originale]
    if largeur_originale <= max(LARGEURS):
        largeurs.append(largeur_originale)
    return largeurs


def optimiser(source, sortie):
    with Image.open(ORIGINAUX / source) as originale:
        # Les photos de téléphone enregistrent souvent leur orientation à part
        # (données EXIF) : on applique cette rotation pour que l'image soit
        # droite. Les métadonnées (date, lieu GPS…) ne sont pas recopiées
        # dans le fichier WebP : rien de personnel n'est publié.
        image = ImageOps.exif_transpose(originale)
        # Les PNG transparents gardent leur transparence (RGBA), les autres
        # passent en RGB : WebP accepte les deux.
        mode = "RGBA" if image.mode in ("RGBA", "LA", "P") else "RGB"
        image = image.convert(mode)
        largeur, hauteur = image.size

        for cible in largeurs_a_produire(largeur):
            # Hauteur calculée pour garder les proportions
            redim = image.resize((cible, round(hauteur * cible / largeur)), Image.LANCZOS)
            chemin = DESTINATION / f"{sortie}-{cible}.webp"
            chemin.parent.mkdir(parents=True, exist_ok=True)
            redim.save(chemin, "WEBP", quality=QUALITE, method=6)

            avant = (ORIGINAUX / source).stat().st_size // 1024
            apres = chemin.stat().st_size // 1024
            print(f"{chemin.relative_to(RACINE)}  {cible}x{redim.height}px  {avant} Ko -> {apres} Ko")

        # Dimensions d'origine, à reporter dans projets.fr.js (champ « dimensions »)
        print(f"  dimensions d'origine : {largeur} x {hauteur}")


if __name__ == "__main__":
    for source, sortie in IMAGES:
        optimiser(source, sortie)
