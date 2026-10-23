/* =========================================================================
   projets.fr.js — LES PROJETS DU PORTFOLIO (version française)

   C'est le seul fichier à modifier pour ajouter, retirer ou corriger un
   projet : le script js/projets.js fabrique les cartes à partir d'ici.
   Source des textes : les fiches de docs/projets/ (seule source de vérité).

   Règles d'écriture :
   - chaque projet est un bloc { ... } séparé du suivant par une virgule ;
   - les textes sont entre guillemets droits "..." ; pour mettre un guillemet
     droit dans un texte, écrire \" (les guillemets « » s'écrivent normalement) ;
   - une ligne qui commence par // est un commentaire, ignoré par le site.

   Champs d'un projet :
   - id         : identifiant court, sans espace ni accent (sert aux liens) ;
   - categorie  : "principal" (grande carte) ou "secondaire" (carte compacte,
                  étape 6a) ;
   - visible    : true pour afficher le projet, false pour le cacher ;
   - titre      : nom du projet ;
   - badge      : texte surligné en jaune près du titre, ou null pour aucun ;
   - phrase     : le projet en une phrase ;
   - fiche      : lignes « libellé / valeur », dans l'ordre d'affichage ;
   - image      : visuel principal (voir le détail sur le premier projet) ;
   - liens      : boutons sous la fiche, [] pour aucun.
   ========================================================================= */

const PROJETS = [

  // ---------------------------------------------------------------- Loom
  {
    id: "loom",
    categorie: "principal",
    visible: true,
    titre: "Loom Collection",
    badge: null,
    // Accroche de la fiche, traduite de l'anglais
    phrase: "Rendre la technologie invisible grâce à des objets du quotidien, pour les personnes âgées.",
    fiche: [
      { libelle: "Contexte", valeur: "Projet d'innovation, projet majeur de 4e année à l'ESILV · printemps 2026 · en binôme avec Alexandre Le Port" },
      { libelle: "Rôle", valeur: "Prototypage et une partie du code" },
      { libelle: "Outils", valeur: "Raspberry Pi 5, Python, Faster-Whisper, Ollama + Mistral, Kokoro, WebSocket, SQLite" },
      { libelle: "Résultat", valeur: "Prototype fonctionnel de bout en bout, testé auprès de personnes âgées" },
    ],
    image: {
      // Chemin dans site/img/, sans la largeur ni l'extension :
      // le script ajoute « -800.webp », « -1200.webp »… selon « largeurs ».
      fichier: "img/loom/loom-test-utilisateur",
      // Largeurs disponibles (affichées par tools/optimiser_images.py)
      largeurs: [800, 1200],
      // Largeur et hauteur de l'original : réservent la place de l'image
      // pendant son chargement, pour que la page ne saute pas.
      dimensions: [1200, 1600],
      // Description pour les personnes qui ne voient pas l'image.
      // Photo anonymisée : seule la main de la personne est visible.
      alt: "Une personne âgée, dont on ne voit que la main, porte à son oreille le combiné de The Teller, un téléphone vintage noir posé sur une table.",
      legende: "Test de The Teller auprès d'une personne âgée",
      // true : petite image posée au centre d'un fond blanc, à sa taille
      // réelle (pour une photo en basse résolution). Ici, photo nette.
      surFondBlanc: false,
    },
    liens: [
      { texte: "Voir le code", url: "https://github.com/Alexlp05/Loom" },
    ],
  },

  // ---------------------------------------------------------------- OccluMap
  {
    id: "occlumap",
    categorie: "principal",
    visible: true,
    titre: "OccluMap",
    // Règle du projet : le statut « en cours » doit toujours être visible
    badge: "En cours · jusqu'en janv. 2027",
    phrase: "Un prototype qui lit le scan intra-oral d'un patient et montre, dent par dent, où réduire et où rehausser.",
    fiche: [
      { libelle: "Contexte", valeur: "Projet d'innovation de 5e année, IFT / ESILV · oct. 2026 – janv. 2027 · avec Pierre, étudiant en chirurgie dentaire" },
      { libelle: "Rôle", valeur: "Conception, état de l'art, développement du prototype (3D, interface, machine learning), protocole d'évaluation" },
      { libelle: "Outils prévus", valeur: "Python, PyVista / VTK, Open3D, NumPy / SciPy, PyTorch" },
      // Aucun résultat n'existe encore : ne pas en inventer (fiche du projet)
      { libelle: "État", valeur: "Prototype en développement. Fin du projet en janvier 2027" },
    ],
    image: {
      fichier: "img/occlumap/occlumap-maquette",
      largeurs: [800, 1600],
      dimensions: [1672, 941],
      alt: "Maquette de l'interface d'OccluMap : vue de dessus d'une arcade dentaire, les dents à réduire en rouge et celles à rehausser en bleu, des réglages à gauche et un tableau par dent en dessous.",
      // Règle du projet : toujours indiquer que la maquette est générée par IA
      legende: "Maquette conceptuelle générée par IA, valeurs fictives",
      surFondBlanc: false,
    },
    liens: [],
  },

];
