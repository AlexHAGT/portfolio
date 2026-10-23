# Direction visuelle

Validée par Alexandre à l'étape 2 (22/10/2026). Ce document sert de référence pour toutes
les étapes suivantes.

**Choix retenus :** accent bleu encre `#2B4C9B` · titres en Bricolage Grotesque · visuels droits.

## 1. Idée directrice : le carnet d'ingénieur

Un fond de papier très légèrement quadrillé, de l'encre noire, **une seule couleur d'accent**
comme un stylo, des annotations en police à chasse fixe (comme des cotes sur un plan) et un
surligneur pour les statuts (« en cours », « Kickstarter »).

Ce que ça reprend des inspirations :

| De huyml.co (typographie) | De bermawy.com (layout) |
|---|---|
| Très grands titres en capitales, très petits libellés | En-tête : nom à gauche, liens entre crochets `[CONTACT]` à droite, filet dessous |
| Projets numérotés en très grand (`01`, `02`) | Fond de papier quadrillé |
| Grilles « libellé / valeur » (Rôle, Contexte, Outils…) | Sections annoncées par un petit libellé et un long filet |
| Vue détaillée : métadonnées à gauche, grand visuel à droite | Cartes cliquables d'un bloc, listes en lignes encadrées, grand nom en pied de page |

Pourquoi ce choix : sobre et lisible pour un recruteur, et cohérent avec ton profil
(prototypage, objets, recherche). Le visuel des projets reste la vedette, le décor reste discret.

## 2. Palette

Contrastes calculés selon la norme WCAG (texte courant : 4,5:1 minimum ; grands titres : 3:1).

| Rôle | Couleur | Contraste sur le papier | Usage |
|---|---|---|---|
| Papier | `#F6F5F1` | — | Fond de page |
| Blanc carte | `#FFFFFF` | — | Fond des cartes et des lignes de liste |
| Encre | `#151515` | 16,7:1 | Titres et texte |
| Gris texte | `#5E5D59` | 6,0:1 | Libellés, textes secondaires |
| Quadrillage | `#E3E1DA` | décoratif | Lignes du fond uniquement |
| Bordure | `#BDBBB4` | décoratif | Contours des cartes et des lignes |
| Surligneur | `#F2C14E` | encre dessus : 10,9:1 | Badges « EN COURS », « KICKSTARTER » |
| **Accent : bleu encre** | `#2B4C9B` | 7,4:1 (texte papier sur bleu : 7,4:1) | Liens, filets, nom dans l'en-tête, contour de focus clavier |

L'accent bleu encre rappelle l'encre de stylo de bermawy et contraste bien avec les photos
chaudes (Pétale orange, Loom noir). Le rouge de huyml (`#D2302B`) a été écarté : il entrait en
concurrence avec l'orange de Pétale et le rouge/bleu de la carte OccluMap.

Pas de mode sombre prévu (on pourra l'ajouter plus tard si tu le souhaites).

## 3. Typographie

Les polices de huyml (BT Glyphius, BT Grotesk) sont payantes. Je propose des équivalents
**gratuits** (Google Fonts, licence libre SIL OFL), hébergés avec le site.

Trois rôles, dont deux communs aux deux options :
- **Texte courant : Instrument Sans**, une sans-serif nette, très lisible en petit.
- **Libellés, dates, chiffres, badges : IBM Plex Mono**, une police à chasse fixe (chaque lettre a
  la même largeur, comme une machine à écrire), en capitales espacées. C'est le clin d'œil à bermawy.
- **Grands titres : Bricolage Grotesque**, grotesque à forte personnalité, superbe en très grand
  et en capitales, la plus proche de l'esprit de huyml. (Instrument Serif a été écartée.)

Échelle (taille sur mobile → taille sur grand écran, la taille varie en continu entre les deux) :

| Élément | Police | Taille | Style |
|---|---|---|---|
| Nom dans le profil | Titres | 56 → 192 px | Capitales, interligne serré |
| Numéro de projet (`01`) | Titres | 96 → 240 px | |
| Titre de projet | Titres | 36 → 88 px | Capitales |
| Libellé de section (`01 / PROJETS PRINCIPAUX`) | Mono | 13 px | Capitales espacées, suivi d'un filet |
| Texte courant | Instrument Sans | 17 → 18 px | Interligne 1,55, lignes de 65 caractères maximum |
| Libellés et badges | Mono | 13 px | Capitales espacées |

Aucun texte utile sous 13 px (huyml descend à 10 px : joli, mais trop petit pour être lu confortablement).

## 4. Grille et espacements

Conçue d'abord pour mobile (règle du projet).

| Écran | Colonnes | Marges latérales | Gouttière |
|---|---|---|---|
| Mobile (< 640 px) | 4 | 20 px | 16 px |
| Tablette (640–1024 px) | 8 | 32 px | 24 px |
| Ordinateur (> 1024 px) | 12 | 48 → 96 px (4 % de la largeur) | 24 px |

- Largeur maximale du contenu : 1920 px, centrée (1440 px au départ, élargie le 23/10/2026 : sur grand écran, les marges paraissaient trop larges).
- Espacements multiples de 8 px. Grand espace entre les sections (96 px sur mobile, 160 px sur ordinateur) :
  la page doit respirer.
- Quadrillage du fond : carreaux de 24 px, très pâles. Cartes et listes sur fond blanc uni pour la lecture.

## 5. Mise en page de chaque section

Schémas : à gauche mobile, à droite ordinateur. `▒` = visuel.

### En-tête
```
┌─────────────────────┐   ┌──────────────────────────────────────────────┐
│ ALEXANDRE HAGUET    │   │ ALEXANDRE HAGUET    [PROJETS] [PARCOURS] [CONTACT] │
│ [PROJETS] [PARCOURS]│   │══════════════════════════════════════════════│
│ [CONTACT]           │   └──────────────────────────────────────────────┘
│═════════════════════│
```
- Nom en mono capitales, couleur d'accent, filet d'accent dessous.
- Ordinateur : reste visible en haut quand on fait défiler. Mobile : défile avec la page (place gagnée).
- Pas de menu « burger » : trois liens visibles, plus simple et plus accessible.
- Place prévue pour la bascule `FR / EN` (étape 12).

### 1. Mon profil
```
┌─────────────────────┐   ┌──────────────────────────────────────────────┐
│ PORTFOLIO — 2026    │   │ ALEXANDRE                                    │
│ ALEXANDRE           │   │ HAGUET                                       │
│ HAGUET              │   │                                              │
│ Accroche            │   │ Accroche sur 2 lignes      STATUT    ...     │
│ STATUT    ...       │   │                            RECHERCHE ...     │
│ RECHERCHE ...       │   │ [ME CONTACTER →]           SECTEURS  ...     │
│ [ME CONTACTER →]    │   └──────────────────────────────────────────────┘
```
- Le nom en très grand occupe toute la largeur : c'est la première impression.
- Accroche à gauche, grille « libellé / valeur » à droite (statut, stage recherché, secteurs), comme les
  métadonnées de huyml : un RH lit l'essentiel en 5 secondes.
- Pas de photo pour l'instant ; la mise en page fonctionne sans. Emplacement possible plus tard.

### 2. Projets principaux (Loom, OccluMap)
```
┌─────────────────────┐   ┌──────────────────────────────────────────────┐
│ 01 / PROJETS PRINC. │   │ 01 / PROJETS PRINCIPAUX ──────────────────── │
│ 01                  │   │ 01                    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│ LOOM COLLECTION     │   │ LOOM COLLECTION       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │   │ Une phrase            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │   │ CONTEXTE  ...         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│ Une phrase          │   │ RÔLE      ...         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   │
│ CONTEXTE ...        │   │ OUTILS    ...                                │
│ RÔLE ...            │   │ RÉSULTAT  ...         [VOIR LE PROJET →]     │
│ [VOIR LE PROJET →]  │   └──────────────────────────────────────────────┘
```
- La plus grande place visuelle du site : chaque projet occupe presque un écran sur ordinateur.
- Texte sur 5 colonnes, visuel sur 7. Le second projet inverse les côtés pour donner du rythme.
- Grille « libellé / valeur » avec les 4 infos demandées par le brief : contexte, rôle, outils, résultat.
- **OccluMap** : badge surligneur `EN COURS · JUSQU'EN JANV. 2027` collé au titre, ligne « État
  d'avancement » au lieu de « Résultat », légende sous la maquette : « Maquette conceptuelle générée
  par IA, valeurs fictives ».
- Le clic ouvre la vue détaillée (forme décidée à l'étape 5b, sur le modèle de la vue projet de huyml).

### 3. Projets secondaires (Pétale, AICG, stage éventuel)
```
┌─────────────────────┐   ┌──────────────────────────────────────────────┐
│ 02 / AUTRES PROJETS │   │ 02 / AUTRES PROJETS ──────────────────────── │
│ ┌─────────────────┐ │   │ ┌────────────────────┐ ┌────────────────────┐ │
│ │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │ │   │ │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │ │ ▒▒▒ démo ▒▒▒▒▒▒▒▒▒ │ │
│ │ KICKSTARTER     │ │   │ │ KICKSTARTER        │ │ 3 PROJETS          │ │
│ │ PÉTALE          │ │   │ │ PÉTALE             │ │ PROJETS AICG       │ │
│ │ Une phrase   →  │ │   │ │ Une phrase      →  │ │ Une phrase      →  │ │
│ └─────────────────┘ │   │ └────────────────────┘ └────────────────────┘ │
```
- Cartes blanches cliquables d'un bloc (bermawy) : visuel en haut, badge, titre, une phrase, flèche.
- 1 colonne sur mobile, 2 sur tablette et ordinateur ; 3 si la carte du stage est ajoutée.
- Pétale : badge surligneur `KICKSTARTER · FINANCÉ À 337 %` (chiffre de la fiche).
- AICG : badge `3 PROJETS`, la démo sert de visuel (modalités à l'étape 6b).

### 4. Parcours et formation
```
┌─────────────────────┐   ┌──────────────────────────────────────────────┐
│ 03 / PARCOURS       │   │ 03 / PARCOURS ────────────────────────────── │
│┌───────────────────┐│   │┌──────────┬──────────────────────┬──────────┐│
││2022 — 2027        ││   ││2022—2027 │ ESILV, cycle ingénieur│FORMATION ││
││ESILV, cycle ingé. ││   │├──────────┼──────────────────────┼──────────┤│
│└───────────────────┘│   ││MAI—AOÛT 26│ SEGULA Technologies  │ STAGE    ││
│ COMPÉTENCES  ...    │   │└──────────┴──────────────────────┴──────────┘│
│ LANGUES      ...    │   │ COMPÉTENCES ...           LANGUES ...        │
```
- Liste en lignes encadrées (comme la liste d'articles de bermawy), du plus récent au plus ancien :
  dates en mono, intitulé et établissement, type (formation / stage).
- Une ligne = une étape, sans détail superflu ; les détails éventuels restent hors de la page.
- Dessous : compétences et langues en grille « libellé / valeur », centres d'intérêt sur une ligne discrète.

### 5. Contact et réseaux, puis pied de page
```
┌─────────────────────┐   ┌──────────────────────────────────────────────┐
│ 04 / CONTACT        │   │ 04 / CONTACT ─────────────────────────────── │
│ adresse@e-mail      │   │ adresse@e-mail (en très grand, cliquable)    │
│ (en grand)          │   │ LINKEDIN →     GITHUB →     CV (PDF) →       │
│ LINKEDIN →          │   │                                              │
│ GITHUB →            │   │ HAGUET  (nom géant, décoratif)               │
│ HAGUET              │   └──────────────────────────────────────────────┘
```
- Appel à l'action clair : l'adresse e-mail en très grand, cliquable (comme huyml).
- Liens en mono capitales avec flèche.
- Pied de page : le nom en lettres géantes sur toute la largeur (comme bermawy), purement décoratif
  (ignoré par les lecteurs d'écran), et une ligne de mentions.

## 6. Détails et interactions

- Survol : soulignement des liens, carte dont la bordure passe à l'encre et qui se soulève légèrement.
- Focus clavier toujours visible : contour de 2 px couleur d'accent.
- Animations minimales, désactivées si le visiteur l'a demandé dans son système (réglage « réduire les animations »).
- **Visuels droits**, alignés sur la grille (l'inclinaison façon « photos posées » a été écartée).

## 7. Remarque sur les visuels

`phone_front.png`, `phone_open.png` et `timeline_UI.png` (Loom) ont des **coins arrondis avec un
fond blanc intégré à l'image**. Sur le papier `#F6F5F1`, ces coins blancs se verront. Si tu as les
versions sans cadre, elles seront plus faciles à intégrer ; sinon je pourrai poser ces images sur
un fond blanc pour masquer le défaut.
