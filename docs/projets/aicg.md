---
titre: "Projets AICG"
sous-titre: "Trois applications d'IA et d'infographie qui tournent entièrement dans le navigateur"
categorie: projet-secondaire
type: "Groupe de projets de cours"
cours: "AICG"
periode: "novembre 2025 – janvier 2026"
image: "aucune : la démo sert d'illustration (aperçu dessiné en fenêtre de navigateur, décision du 13/11/2026)"
projets:
  - classdigit
  - raymarching-webgpu
  - rag-lit-reviewer
---

# Projets AICG

## Consignes d'affichage pour Claude Code

Ce fichier décrit **un seul bloc** de la section « Projets secondaires », qui regroupe
trois projets réalisés dans le cours AICG.

### Comportement attendu
1. **Une seule carte** dans la grille des projets secondaires, titrée « Projets AICG »,
   avec la mention « 3 projets » et un visuel.
2. **Au clic**, la carte s'ouvre (panneau déplié, fenêtre modale ou page dédiée : propose-moi
   les options avant de choisir) et affiche les trois projets côte à côte ou en onglets,
   chacun avec ses détails ci-dessous.
3. **Chaque projet a une démo en ligne** (GitHub Pages). Le visiteur doit pouvoir l'essayer
   **dans une fenêtre intégrée au portfolio** (iframe dans une modale), sans quitter le site.

### Règles pour la fenêtre de démo
- Ne charger l'iframe **qu'au clic** sur « Essayer la démo », jamais au chargement de la page :
  ces démos utilisent le GPU et téléchargent des modèles, elles ralentiraient tout le portfolio.
- Toujours afficher à côté un bouton **« Ouvrir dans un nouvel onglet »** et un lien
  **« Voir le code sur GitHub »**.
- Afficher une courte note : « Démo WebGPU : fonctionne sur Chrome ou Edge récent, sur ordinateur. »
- Sur mobile, privilégier l'ouverture dans un nouvel onglet plutôt que l'iframe
  (écran trop petit, WebGPU souvent indisponible).
- Fermeture de la modale avec la touche Échap, un bouton de fermeture visible, et le focus
  clavier géré correctement (accessibilité).
- **À tester avant de valider** : vérifier que chaque page GitHub Pages s'affiche bien dans
  une iframe et que WebGPU y fonctionne. Si une démo refuse de s'afficher intégrée, garder
  uniquement le bouton « Ouvrir dans un nouvel onglet » pour celle-ci et me le signaler.

### Ordre d'affichage
1. ClassDiGit (le plus immédiat à essayer pour un recruteur)
2. Ray marching WebGPU
3. RAG Lit Reviewer

---

## 1. ClassDiGit — reconnaissance de chiffres manuscrits

- **Démo :** https://alexhagt.github.io/ClassDiGit/
- **Code :** https://github.com/AlexHAGT/ClassDiGit
- **Date :** novembre 2025
- **Capture :** non nécessaire (pas d'image pour AICG : la démo sert d'illustration)

**En une phrase :** on dessine un chiffre à la souris, et deux réseaux de neurones le
reconnaissent instantanément, directement dans le navigateur.

**Ce que j'ai fait :**
- Entraînement de deux modèles sur le jeu de données MNIST avec la bibliothèque **TinyGrad** :
  un perceptron multicouche (**MLP**) et un réseau convolutif (**CNN**).
- Campagne de réglage des hyperparamètres (taux d'apprentissage, taille de lot, nombre
  d'étapes, décroissance, augmentation de données), avec 8 essais pour le MLP et 9 pour le CNN.
- Export des modèles et exécution sur la carte graphique de l'utilisateur via **WebGPU**.
- Interface web : zone de dessin, gomme, effacement, bascule entre les deux modèles,
  barres de probabilité pour chaque chiffre, détection de la compatibilité WebGPU.

**Résultats :**
| Modèle | Précision sur le jeu de test |
|---|---|
| MLP | 96,78 % |
| CNN | 99,09 % |

**Technologies :** Python, TinyGrad, WebGPU, JavaScript, HTML, Tailwind CSS.

**Ce que ça montre :** une chaîne complète de machine learning, de l'entraînement du modèle
jusqu'à son utilisation dans une application, sans serveur.

---

## 2. Ray marching WebGPU — scène 3D interactive

- **Démo :** https://alexhagt.github.io/Projet-CG-WebGPU-AH-/
- **Code :** https://github.com/AlexHAGT/Projet-CG-WebGPU-AH-
- **Date :** décembre 2025
- **Capture :** disponible dans le dépôt (`How it looks like.png`), non utilisée (la démo sert d'illustration)

**En une phrase :** une petite scène 3D (sol en damier, sphère et cube) calculée en temps
réel par la carte graphique, dont on modifie les objets avec des curseurs.

**Ce que j'ai fait :**
- Rendu par **ray marching** avec des fonctions de distance signée (SDF) pour la sphère,
  le cube et le sol, écrit dans un shader **WGSL**.
- Éclairage diffus, ombres, brouillard et correction gamma.
- Interface de réglage en temps réel : position, taille et couleur de la sphère et du cube,
  transmises au shader à chaque image sans recompilation.
- Caméra pilotée à la souris : rotation en maintenant le clic gauche, zoom à la molette.

**Technologies :** WebGPU, WGSL, JavaScript, HTML.

**Ce que ça montre :** des bases solides en infographie 3D et en programmation GPU.

**Note pour la démo :** à l'ouverture, il faut sélectionner le shader « Ray Marching – Basic »
puis cliquer une fois sur « Compile ». Afficher cette consigne au-dessus de la fenêtre de démo.

---

## 3. RAG Lit Reviewer — revue de littérature assistée par IA

- **Démo :** https://alexhagt.github.io/rag-lit-reviewer/
- **Code :** https://github.com/AlexHAGT/rag-lit-reviewer
- **Date :** janvier 2026
- **Capture :** non nécessaire (pas d'image pour AICG : la démo sert d'illustration)

**En une phrase :** on dépose des articles scientifiques en PDF, et un modèle de langage
local en tire une revue de littérature structurée, sans qu'aucune donnée ne quitte le navigateur.

**Ce que j'ai fait :**
- Chaîne **RAG** (Retrieval-Augmented Generation) entièrement côté navigateur, sans serveur.
- Import de PDF par glisser-déposer, extraction du texte avec **PDF.js**, découpage en
  passages qui se chevauchent.
- Calcul d'embeddings avec **Transformers.js** (modèle all-MiniLM-L6-v2) et recherche
  sémantique par similarité cosinus.
- Génération de réponses avec un modèle de langage exécuté localement via **WebLLM**,
  avec un mode « revue de littérature » structuré (introduction, thèmes principaux,
  limites, conclusion) et des réponses limitées aux extraits retrouvés dans les documents.
- Confidentialité par conception : les fichiers ne sont jamais envoyés à un serveur.

**Technologies :** JavaScript, HTML, CSS, PDF.js, Transformers.js, WebLLM, WebGPU.

**Ce que ça montre :** la compréhension d'une architecture d'IA générative actuelle (RAG)
et la capacité à la faire fonctionner en local, avec un souci de confidentialité.

**Note pour la démo :** le chargement du modèle de langage est long au premier lancement
(téléchargement dans le navigateur). L'indiquer clairement au visiteur.

---

Je précise que AICG signifie Artificial intelligence and Computer graphics. C'est un cours dans le cadre de ma formation d'ingénieur dans la Majeur creative technoligies de l'ESILV