/* =========================================================================
   projets.fr.js — LES PROJETS DU PORTFOLIO (version française)

   C'est le seul fichier à modifier pour ajouter, retirer ou corriger un
   projet : le script js/projets.js fabrique les cartes et les fenêtres de
   détail à partir d'ici.
   Source des textes : les fiches de docs/projets/ (seule source de vérité).

   Règles d'écriture :
   - chaque projet est un bloc { ... } séparé du suivant par une virgule ;
   - les textes sont entre guillemets droits "..." ; pour mettre un guillemet
     droit dans un texte, écrire \" (les guillemets « » s'écrivent normalement) ;
   - une ligne qui commence par // est un commentaire, ignoré par le site.

   Champs d'un projet :
   - id         : identifiant court, sans espace ni accent. Sert aussi
                  d'adresse directe de la fenêtre de détail (…/portfolio/#loom) ;
   - categorie  : "principal" (grande carte, section 01) ou "secondaire"
                  (carte compacte, section 02 « Autres projets ») ;
   - visible    : true pour afficher le projet, false pour le cacher ;
   - titre      : nom du projet ;
   - badge      : texte surligné en jaune près du titre, ou null pour aucun ;
   - phrase     : le projet en une phrase ;
   - contexte   : (projets secondaires) ligne courte sous la phrase de la
                  carte : cadre, date, équipe ;
   - fiche      : lignes « libellé / valeur », dans l'ordre d'affichage
                  (carte des projets principaux, et fenêtre de détail) ;
   - image      : visuel principal (voir le détail sur le premier projet),
                  ou null. Pour un projet secondaire sans image, l'un des
                  deux champs suivants le remplace :
   - demo       : aperçu d'une démo en ligne, dessiné en fenêtre de
                  navigateur : { titre, adresse, url, code, consigne, texte, note }
                  (code : adresse du code source ; consigne : texte affiché
                  au-dessus de la démo, ou null) ;
   - visuelManquant : nom du visuel attendu, affiché dans un bloc gris ;
   - liens      : boutons externes (sous la fiche ou dans la fenêtre), [] pour aucun ;
   - detail     : contenu de la fenêtre « Voir le projet », ou null pour ne
                  pas proposer de fenêtre.

   Contenu de « detail » :
   - mention  : phrase d'avertissement affichée sous la fiche, ou null ;
   - sommaire : true pour afficher la liste cliquable des sections
                (utile quand la fenêtre regroupe plusieurs projets). Les
                titres de sections sont alors affichés en grand ;
   - sections : liste de { titre, sousTitre, blocs } (sousTitre facultatif,
                ex. la date). Chaque bloc a un « type » :
       { type: "paragraphe", texte: "..." }
       { type: "liste", elements: ["...", "..."] }
       { type: "chiffres", elements: [{ valeur, texte, source }] }
           chiffres clés affichés en grand ; « source » est facultative
       { type: "etapes", elements: ["...", "..."] }
           étapes numérotées ; un élément peut aussi être { titre, texte }
       { type: "cartes", elements: [{ titre, badge, texte, liste }] }
           petits encadrés côte à côte (badge, texte et liste facultatifs)
       { type: "schema", blocs: [{ titre, sousTitre, lignes }], liaisons: ["..."] }
           blocs reliés par des flèches ; liaisons[0] est écrit sur la
           flèche entre le 1er et le 2e bloc, etc.
       { type: "image", image: { même format que le champ « image » } }
       { type: "sources", elements: [{ texte, url }] }
       { type: "note", texte: "..." }
           consigne ou avertissement, dans un encadré
       { type: "liens", elements: [{ texte, url }] }
           boutons vers des pages externes
       { type: "demo", titre, url, code, consigne }
           bouton « Essayer la démo » (fenêtre intégrée sur ordinateur,
           nouvel onglet sur mobile), lien vers le code, et consigne
           facultative (null pour aucune)
   ========================================================================= */

const PROJETS = [

  // ===================================================================== Loom
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
    detail: {
      mention: null,
      sections: [
        {
          titre: "Le problème",
          blocs: [
            {
              type: "chiffres",
              elements: [
                { valeur: "25 %", texte: "des personnes âgées sont socialement isolées", source: "OMS" },
                { valeur: "50 %", texte: "des Françaises de plus de 75 ans sont veuves", source: "INED" },
              ],
            },
            { type: "paragraphe", texte: "L'isolement est un facteur majeur de mortalité prématurée (Holt-Lunstad, 2015). Les smartphones et tablettes conviennent mal aux seniors : interfaces complexes, trop de menus, manque de confiance. Les assistants vocaux lèvent la barrière physique, mais restent sources de malentendus et de craintes pour la vie privée." },
          ],
        },
        {
          titre: "L'idée",
          blocs: [
            { type: "paragraphe", texte: "Des projets comme KOMP et Yayagram montrent qu'une technologie est adoptée quand elle se loge dans un objet simple et familier. Notre parti pris : IA générative, objet familier et interaction minimale." },
            {
              type: "cartes",
              elements: [
                { titre: "The Teller", badge: "Prototypé", texte: "Téléphone GPO 746 : recueille les récits de vie et construit une frise chronologique pour la famille." },
                { titre: "The Tuner", badge: "Concept", texte: "Radio vintage : actualités et stimulation cognitive." },
                { titre: "The Imprint", badge: "Concept", texte: "Machine à écrire vintage : imprime les souvenirs sous forme d'histoires illustrées." },
              ],
            },
          ],
        },
        {
          titre: "Comment ça marche",
          blocs: [
            {
              type: "etapes",
              elements: [
                "On décroche le combiné : la conversation démarre automatiquement.",
                "L'IA pose des questions sur la vie : souvenirs, anecdotes, grandes étapes.",
                "Les récits sont transcrits, puis résumés et stockés par l'IA.",
                "La famille consulte « l'arbre de vie », une frise chronologique dans une application web.",
              ],
            },
            { type: "paragraphe", texte: "Aucune courbe d'apprentissage : décrocher suffit." },
            {
              type: "image",
              image: {
                fichier: "img/loom/loom-frise",
                largeurs: [680],
                dimensions: [680, 601],
                alt: "Capture de l'application web : une frise chronologique verticale de souvenirs, chacun avec un titre, une année approximative et le début du récit.",
                legende: "La frise des souvenirs consultée par la famille",
                surFondBlanc: true,
              },
            },
          ],
        },
        {
          titre: "Sous le capot",
          blocs: [
            {
              type: "schema",
              blocs: [
                {
                  titre: "Client",
                  sousTitre: "Raspberry Pi 5 dans le téléphone",
                  lignes: [
                    "Détecte le décroché (commutateur de crochet sur les GPIO)",
                    "Capte la voix par le micro du combiné",
                    "Joue la réponse de l'IA dans l'écouteur",
                  ],
                },
                {
                  titre: "Serveur",
                  sousTitre: "PC local",
                  lignes: [
                    "Reconnaissance vocale : Faster-Whisper",
                    "Modèle de langage : Ollama + Mistral",
                    "Synthèse vocale : Kokoro",
                    "Application web : frise + SQLite",
                  ],
                },
              ],
              liaisons: ["WebSocket"],
            },
            { type: "paragraphe", texte: "Tout le traitement reste en local : aucune donnée n'est envoyée dans le cloud, ce qui protège la vie privée." },
            {
              type: "image",
              image: {
                fichier: "img/loom/loom-interieur",
                largeurs: [331],
                dimensions: [331, 589],
                alt: "Le téléphone ouvert : le Raspberry Pi 5 dans son boîtier, les câbles du combiné et une pièce de fixation orange.",
                legende: "L'intérieur du Teller",
                surFondBlanc: true,
              },
            },
          ],
        },
        {
          titre: "Test et recherche",
          blocs: [
            { type: "paragraphe", texte: "Le prototype a été testé avec des personnes âgées." },
            {
              type: "cartes",
              elements: [
                {
                  titre: "Retours positifs",
                  liste: [
                    "Interaction avec le combiné jugée instinctive et pratique",
                    "Les questions de l'IA guident naturellement la conversation",
                    "Le principe d'un objet familier est bien reçu",
                    "Partager ses souvenirs à distance avec ses petits-enfants est apprécié",
                  ],
                },
                {
                  titre: "Réserves",
                  liste: [
                    "Risque de remplacer les vraies interactions avec les petits-enfants",
                    "Design de l'application web à améliorer",
                    "Usage quotidien à long terme non vérifié",
                  ],
                },
              ],
            },
            { type: "paragraphe", texte: "Nous avons aussi reproduit l'étude de Pradhan et al. (2020) sur les personnes âgées et Alexa : 5 seniors en France, en sessions de 15 à 20 minutes (discussion, démonstration, test guidé, test libre, retours)." },
            {
              type: "liste",
              elements: [
                "Confirmé : la voix paraît plus simple que les menus d'un smartphone, et la recherche d'information est l'usage le plus spontané.",
                "Nouveau : difficulté à savoir quoi demander sans être guidé, méfiance envers la voix de synthèse.",
                "Limite : sessions courtes, aucune conclusion possible sur l'adoption à long terme.",
              ],
            },
          ],
        },
        {
          titre: "Bilan",
          blocs: [
            {
              type: "cartes",
              elements: [
                {
                  titre: "Forces",
                  liste: [
                    "Prototype fonctionnel de bout en bout",
                    "Interaction sans apprentissage",
                    "Confidentialité : traitement local",
                    "Valeur sociale",
                  ],
                },
                {
                  titre: "Limites",
                  liste: [
                    "Dépend d'un PC à proximité : pas encore autonome",
                    "La latence du modèle de langage peut casser le rythme de la conversation",
                    "Voix encore un peu robotique",
                    "Design de l'application web perfectible",
                  ],
                },
                {
                  titre: "Suites envisagées",
                  liste: [
                    "Études en interaction humain-machine : téléphone rétro face à une enceinte, styles de relance de l'IA",
                    "Étude de 3 mois en EHPAD sur l'impact cognitif et social",
                    "Un Teller autonome, avec un pilote prévu dans 3 EHPAD",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // ===================================================================== OccluMap
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
    detail: {
      // Fiche du projet : ne pas le présenter comme un dispositif médical
      mention: "Prototype de recherche : ce n'est pas un dispositif médical, et il n'est pas utilisé pour des décisions cliniques.",
      sections: [
        {
          titre: "Le problème",
          blocs: [
            { type: "paragraphe", texte: "Quand un patient a des dents usées, ou des dents qui ont « poussé » faute de dent en face, le dentiste doit rétablir un plan d'occlusion régulier : la surface où les dents du haut et du bas se rencontrent." },
            { type: "paragraphe", texte: "Pour décider quelles dents réduire et lesquelles rehausser, il commande souvent une maquette des futures dents au prothésiste, le wax-up. C'est un aller-retour qui prend du temps, avec une décision qui repose beaucoup sur l'œil du praticien." },
          ],
        },
        {
          titre: "La solution",
          blocs: [
            {
              type: "etapes",
              elements: [
                "Entrée : deux fichiers STL exportés par un scanner intra-oral (arcades du haut et du bas, en occlusion).",
                "Détection des cuspides, les sommets des dents, par apprentissage automatique, avec sélection manuelle en secours.",
                "Ajustement robuste d'une surface de référence, la sphère de Monson : les dents trop hautes ou trop basses sont écartées du calcul au lieu de le fausser.",
                "Carte signée : distance de chaque point de la surface dentaire à la référence.",
                "Sortie : vue 3D en couleurs (rouge = à réduire, bleu = à rehausser), tableau par dent et réglages en direct.",
              ],
            },
            { type: "paragraphe", texte: "Tout le traitement est local : aucun scan ne quitte l'ordinateur, car ce sont des données de santé." },
            {
              type: "image",
              image: {
                fichier: "img/occlumap/occlumap-maquette",
                largeurs: [800, 1600],
                dimensions: [1672, 941],
                alt: "Maquette de l'interface d'OccluMap : vue de dessus d'une arcade dentaire, les dents à réduire en rouge et celles à rehausser en bleu, des réglages à gauche et un tableau par dent en dessous.",
                legende: "Maquette conceptuelle générée par IA, valeurs fictives",
                surFondBlanc: false,
              },
            },
            { type: "paragraphe", texte: "Vision à long terme : afficher cette analyse directement pendant la prise d'empreinte, comme les caméras intra-orales affichent déjà la carte des contacts entre arcades." },
            {
              type: "image",
              image: {
                fichier: "img/occlumap/occlumap-carte-contacts",
                largeurs: [530],
                dimensions: [530, 295],
                alt: "Logiciel d'un scanner intra-oral : une arcade dentaire en 3D, avec des zones colorées du bleu au rouge là où les dents du haut et du bas se touchent.",
                legende: "Carte des contacts entre arcades dans le logiciel d'un scanner intra-oral (capture d'un chirurgien-dentiste)",
                surFondBlanc: true,
              },
            },
          ],
        },
        {
          titre: "Ce qui le rend original",
          blocs: [
            { type: "paragraphe", texte: "Les briques existent séparément dans la littérature et dans des produits du marché. OccluMap les combine : à partir du seul fichier STL, avant le wax-up, robuste aux dents usées, avec une décision par dent. L'outil sera ensuite comparé au jugement de praticiens, et l'accord entre praticiens mesuré, ce qu'aucune étude trouvée ne mesure." },
            {
              type: "image",
              image: {
                fichier: "img/occlumap/occlumap-etat-de-l-art",
                largeurs: [800, 1160],
                dimensions: [1160, 752],
                alt: "Tableau Miro de l'état de l'art : 25 articles, brevets et produits répartis en 5 thèmes autour du projet.",
                legende: "État de l'art : 25 travaux, articles et brevets, cartographiés en 5 thèmes",
                surFondBlanc: false,
              },
            },
          ],
        },
        {
          titre: "Volet recherche",
          blocs: [
            { type: "paragraphe", texte: "Question : l'outil désigne-t-il les dents à réduire ou à rehausser aussi bien qu'un praticien ?" },
            { type: "paragraphe", texte: "Méthode prévue : une étude pilote sur une vingtaine de cas anonymisés. Le partenaire clinique et 2 ou 3 praticiens classent chaque dent sans voir la carte ; on compare ensuite les praticiens entre eux et avec l'outil (taux d'accord, coefficient kappa). Objectif : un article co-signé avec le partenaire clinique." },
            {
              type: "image",
              image: {
                fichier: "img/occlumap/occlumap-scan-wen-2025",
                largeurs: [800, 968],
                dimensions: [968, 690],
                alt: "Modèle numérique issu d'un scan intra-oral : les deux arcades dentaires vues de dessus, de face et de côté.",
                // Licence CC BY 4.0 : citer la source (règle du projet)
                legende: "Modèle numérique issu d'un scan intra-oral. Figure de Wen et al., Clin Exp Dent Res 2025, licence CC BY 4.0",
                surFondBlanc: false,
              },
            },
            {
              type: "sources",
              elements: [
                { texte: "Wen et al. 2025, Clin Exp Dent Res : sphère de Monson calculée à partir de scans intra-oraux", url: "https://doi.org/10.1002/cre2.70063" },
                { texte: "Ma et al. 2026, AJODO : détection automatique des repères dentaires par apprentissage profond", url: "https://doi.org/10.1016/j.ajodo.2025.09.009" },
              ],
            },
          ],
        },
        {
          titre: "Planning",
          blocs: [
            {
              type: "etapes",
              elements: [
                { titre: "Octobre 2026", texte: "Environnement, données, affichage des STL, sélection manuelle des cuspides, ajustement de la sphère" },
                { titre: "20 novembre 2026", texte: "Jalon : démo minimale complète (carte signée et tableau par dent)" },
                { titre: "Décembre 2026", texte: "Réglages interactifs, mode « référence imposée », détection automatique des cuspides" },
                { titre: "Janvier 2027", texte: "Évaluation avec les praticiens, analyse, soutenance" },
              ],
            },
          ],
        },
        {
          titre: "Mon rôle",
          blocs: [
            { type: "paragraphe", texte: "Conception du projet, état de l'art, développement du prototype (géométrie 3D, interface, apprentissage automatique), protocole d'évaluation et pilotage. Je m'appuie sur mon stage chez SEGULA Technologies : une application de bureau en Python, validée par le client, sous contrainte stricte de confidentialité des données." },
            { type: "paragraphe", texte: "Le projet est mené avec Pierre, étudiant en dernière année de chirurgie dentaire à Sorbonne Université, en clinique à l'hôpital Charles-Foix. Nous avions l'idée d'un projet commun depuis nos études de santé : j'ai fait une année de PASS avant l'école d'ingénieurs. Référente : Xiao Xiao (IFT / ESILV)." },
            {
              type: "liste",
              elements: [
                "Traitement de données 3D",
                "Apprentissage automatique appliqué à la santé",
                "Développement d'application de bureau",
                "Démarche de recherche : état de l'art, protocole, évaluation",
                "Collaboration avec un partenaire clinique",
                "Protection des données de santé",
              ],
            },
          ],
        },
      ],
    },
  },

  // ===================================================================== Pétale
  {
    id: "petale",
    categorie: "secondaire",
    visible: true,
    titre: "Pétale",
    // Règle du projet : le mot « Kickstarter » doit être bien visible.
    // 337 % = 506 € collectés / 150 € d'objectif (fiche du projet)
    badge: "Kickstarter · financé à 337 %",
    phrase: "Un abat-jour modulable en acrylique, conçu en groupe et financé sur Kickstarter.",
    contexte: "Cours Quickstarter · 2026 · groupe de 4",
    fiche: [
      { libelle: "Contexte", valeur: "Cours « Quickstarter » · 2026 · groupe de 4 étudiants" },
      { libelle: "Rôle", valeur: "Contribution à toutes les tâches : conception produit, visuels de campagne, rédaction, gestion des contributeurs, logistique" },
      { libelle: "Compétences", valeur: "CAO, découpe laser, design produit, communication, gestion de projet, pricing, logistique d'expédition" },
      { libelle: "Résultat", valeur: "Campagne financée à 337 % : 506 € collectés auprès de 16 contributeurs" },
    ],
    image: {
      fichier: "img/petale/petale-lampe",
      largeurs: [800, 1600],
      dimensions: [5202, 3464],
      alt: "La lampe Pétale allumée, posée sur un plan de travail en bois : cinq pétales en acrylique orange disposés en étoile autour d'une ampoule à la lumière chaude.",
      legende: null,
      surFondBlanc: false,
    },
    liens: [
      { texte: "Voir la campagne Kickstarter", url: "https://www.kickstarter.com/projects/petale/quickstarter-petale" },
    ],
    detail: {
      mention: null,
      sections: [
        {
          titre: "Le produit",
          blocs: [
            { type: "paragraphe", texte: "Un abat-jour composé de modules en acrylique, que l'on assemble à sa guise pour donner à la lampe la forme souhaitée." },
            {
              type: "liste",
              elements: [
                "Compatible avec les douilles standard E14 munies d'une bague à visser, et avec les douilles de moins de 29 mm de diamètre.",
                "Prévu pour une ampoule LED, de préférence blanc chaud (environ 2000 K) : les ampoules halogènes ou à incandescence chauffent trop pour l'acrylique.",
                "Peut être fixé au mur (visserie non fournie).",
              ],
            },
            {
              type: "image",
              image: {
                fichier: "img/petale/petale-pieces",
                largeurs: [800, 856],
                dimensions: [856, 445],
                alt: "Les pièces de l'abat-jour à plat : cinq pétales en acrylique orange, des pièces de fixation transparentes, de la visserie, et deux ampoules dessinées en pointillés signalées par des flèches rouges.",
                legende: "Les pièces de l'abat-jour en acrylique",
                surFondBlanc: false,
              },
            },
            {
              type: "image",
              image: {
                fichier: "img/petale/petale-lampe-2",
                largeurs: [800, 1600],
                dimensions: [5202, 3464],
                alt: "La lampe Pétale allumée dans un salon plongé dans la pénombre, posée sur un meuble à côté d'un amplificateur hi-fi.",
                legende: "La lampe en situation",
                surFondBlanc: false,
              },
            },
          ],
        },
        {
          titre: "La campagne Kickstarter",
          blocs: [
            { type: "paragraphe", texte: "Lancée au format Quickstarter : un produit fabriqué rapidement, une campagne courte de 20 jours et un petit objectif. Catégorie Product Design." },
            {
              type: "chiffres",
              elements: [
                { valeur: "506 €", texte: "collectés pour un objectif de 150 €", source: "Kickstarter" },
                { valeur: "337 %", texte: "de l'objectif atteint", source: "Kickstarter" },
                { valeur: "16", texte: "contributeurs", source: "Kickstarter" },
                { valeur: "20", texte: "jours de campagne, du 26 mars au 15 avril 2026", source: "Kickstarter" },
              ],
            },
            { type: "paragraphe", texte: "Contrepartie principale : la lampe à 19 €, hors frais de port. Livraison prévue de fin novembre à décembre 2026, avec un service après-vente (pièces de remplacement, ou lampe complète si nécessaire)." },
          ],
        },
        {
          titre: "Mon rôle",
          blocs: [
            { type: "paragraphe", texte: "Au sein d'un groupe de 4 étudiants, j'ai contribué à toutes les tâches :" },
            {
              type: "liste",
              elements: [
                "Conception produit",
                "Visuels de campagne",
                "Rédaction",
                "Gestion des contributeurs",
                "Logistique d'expédition",
              ],
            },
          ],
        },
      ],
    },
  },

  // ===================================================================== AICG
  // Trois projets du même cours, regroupés dans une seule carte.
  {
    id: "aicg",
    categorie: "secondaire",
    visible: true,
    titre: "Projets AICG",
    badge: "3 projets",
    phrase: "Trois applications d'IA et d'infographie qui tournent entièrement dans le navigateur.",
    contexte: "Cours Artificial Intelligence and Computer Graphics · nov. 2025 – janv. 2026",
    fiche: [
      { libelle: "Cours", valeur: "Artificial Intelligence and Computer Graphics (AICG), majeure Creative Technologies de l'ESILV" },
      { libelle: "Période", valeur: "Novembre 2025 – janvier 2026" },
      { libelle: "Technologies", valeur: "Python, TinyGrad, WebGPU, WGSL, JavaScript, PDF.js, Transformers.js, WebLLM" },
    ],
    // Pas d'image (règle du projet) : la démo sert d'illustration. Elle n'est
    // jamais chargée avec la page (GPU, modèles à télécharger) : la carte
    // n'en montre qu'un aperçu dessiné, avec un bouton pour la lancer.
    image: null,
    demo: {
      titre: "ClassDiGit",
      adresse: "alexhagt.github.io/ClassDiGit",
      url: "https://alexhagt.github.io/ClassDiGit/",
      code: "https://github.com/AlexHAGT/ClassDiGit",
      consigne: null,
      texte: "Dessinez un chiffre : deux réseaux de neurones le reconnaissent.",
      note: "Démo WebGPU : fonctionne sur Chrome ou Edge récent, sur ordinateur.",
    },
    liens: [],
    detail: {
      mention: "Démo WebGPU : fonctionne sur Chrome ou Edge récent, sur ordinateur.",
      sommaire: true,
      sections: [
        {
          titre: "ClassDiGit",
          sousTitre: "Novembre 2025",
          blocs: [
            { type: "paragraphe", texte: "On dessine un chiffre à la souris, et deux réseaux de neurones le reconnaissent instantanément, directement dans le navigateur." },
            {
              type: "chiffres",
              elements: [
                { valeur: "96,78 %", texte: "de précision sur le jeu de test pour le perceptron multicouche (MLP)" },
                { valeur: "99,09 %", texte: "de précision sur le jeu de test pour le réseau convolutif (CNN)" },
              ],
            },
            {
              type: "liste",
              elements: [
                "Entraînement des deux modèles sur le jeu de données MNIST avec la bibliothèque TinyGrad.",
                "Réglage des hyperparamètres (taux d'apprentissage, taille de lot, augmentation de données…) : 8 essais pour le MLP, 9 pour le CNN.",
                "Export des modèles et exécution sur la carte graphique du visiteur via WebGPU.",
                "Interface web : zone de dessin, gomme, bascule entre les deux modèles, probabilité pour chaque chiffre.",
              ],
            },
            { type: "paragraphe", texte: "Une chaîne complète de machine learning, de l'entraînement du modèle jusqu'à son utilisation dans une application, sans serveur. Technologies : Python, TinyGrad, WebGPU, JavaScript, HTML, Tailwind CSS." },
            {
              type: "demo",
              titre: "ClassDiGit",
              url: "https://alexhagt.github.io/ClassDiGit/",
              code: "https://github.com/AlexHAGT/ClassDiGit",
              consigne: null,
            },
          ],
        },
        {
          titre: "Ray marching WebGPU",
          sousTitre: "Décembre 2025",
          blocs: [
            { type: "paragraphe", texte: "Une petite scène 3D (sol en damier, sphère et cube) calculée en temps réel par la carte graphique, dont on modifie les objets avec des curseurs." },
            {
              type: "liste",
              elements: [
                "Rendu par ray marching avec des fonctions de distance signée (SDF), écrit dans un shader WGSL.",
                "Éclairage diffus, ombres, brouillard et correction gamma.",
                "Réglage en temps réel de la position, de la taille et de la couleur des objets, sans recompiler le shader.",
                "Caméra pilotée à la souris : rotation au clic gauche, zoom à la molette.",
              ],
            },
            { type: "paragraphe", texte: "Des bases en infographie 3D et en programmation GPU. Technologies : WebGPU, WGSL, JavaScript, HTML." },
            {
              type: "demo",
              titre: "Ray marching WebGPU",
              url: "https://alexhagt.github.io/Projet-CG-WebGPU-AH-/",
              code: "https://github.com/AlexHAGT/Projet-CG-WebGPU-AH-",
              consigne: "Pour lancer la démo : choisir le shader « Ray Marching – Basic », puis cliquer une fois sur « Compile ».",
            },
          ],
        },
        {
          titre: "RAG Lit Reviewer",
          sousTitre: "Janvier 2026",
          blocs: [
            { type: "paragraphe", texte: "On dépose des articles scientifiques en PDF, et un modèle de langage local en tire une revue de littérature structurée, sans qu'aucune donnée ne quitte le navigateur." },
            {
              type: "liste",
              elements: [
                "Chaîne RAG (génération augmentée par recherche) entièrement dans le navigateur, sans serveur.",
                "Import de PDF par glisser-déposer, extraction du texte avec PDF.js, découpage en passages.",
                "Recherche sémantique : embeddings calculés avec Transformers.js (all-MiniLM-L6-v2), similarité cosinus.",
                "Génération avec un modèle de langage exécuté localement via WebLLM, en mode « revue de littérature » (introduction, thèmes, limites, conclusion), limitée aux extraits retrouvés.",
              ],
            },
            { type: "paragraphe", texte: "Une architecture d'IA générative actuelle, qui fonctionne en local par souci de confidentialité. Technologies : JavaScript, PDF.js, Transformers.js, WebLLM, WebGPU." },
            {
              type: "demo",
              titre: "RAG Lit Reviewer",
              url: "https://alexhagt.github.io/rag-lit-reviewer/",
              code: "https://github.com/AlexHAGT/rag-lit-reviewer",
              consigne: "Premier lancement long : le modèle de langage se télécharge dans le navigateur.",
            },
          ],
        },
      ],
    },
  },

  // ===================================================================== Stage SEGULA
  // Caché (visible: false) : la décision de l'afficher en projet secondaire
  // sera prise à la fin. Il suffira alors de passer « visible » à true.
  // Source : docs/parcours.md. Projet confidentiel : pas de capture.
  {
    id: "stage-segula",
    categorie: "secondaire",
    visible: false,
    titre: "Application de capitalisation de projet",
    badge: "Stage · SEGULA Technologies",
    phrase: "Une application de bureau, puis web, pour une équipe de validation de systèmes embarqués connectés, en mission chez Stellantis.",
    contexte: "Stage de 4e année · mai – août 2026",
    fiche: [
      { libelle: "Contexte", valeur: "Stage ingénieur en développement logiciel, SEGULA Technologies, mission chez Stellantis · mai – août 2026 · Trappes / Poissy" },
      { libelle: "Outils", valeur: "Python, Flask, PySide6 (Qt), API REST, HTML / CSS, Git" },
      { libelle: "Résultat", valeur: "Application de bureau validée par le client, puis transposée en application web" },
    ],
    image: null,
    visuelManquant: "Visuel du stage SEGULA (projet confidentiel)",
    liens: [],
    detail: {
      mention: null,
      sections: [
        {
          titre: "La mission",
          blocs: [
            { type: "paragraphe", texte: "Conception et développement d'une application de capitalisation de projet pour une équipe de validation de systèmes embarqués connectés (mises à jour firmware à distance, applications connectées)." },
            {
              type: "liste",
              elements: [
                "Intégration des outils internes Teresa et JIRA via API REST, sous contrainte stricte de confidentialité.",
                "Application de bureau PySide6 validée par le client, puis transposée en application web Flask grâce à une architecture séparant logique métier et affichage.",
                "Développement par paliers, comptes rendus d'avancement, documentation et passation.",
              ],
            },
          ],
        },
      ],
    },
  },

];
