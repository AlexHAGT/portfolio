# Projet portfolio — Loom Collection (The Teller)

> Fichier de contexte pour Claude Code. Il décrit le projet Loom Collection afin de générer la page projet du portfolio d'Alexandre Haguet.
> **Règle principale : n'invente aucun chiffre, résultat, technologie ou rôle absent de ce fichier.** Si une information manque, laisse un `TODO` visible plutôt que de deviner.

---

## 1. Fiche d'identité

| Champ | Valeur |
|---|---|
| Nom du projet | **Loom Collection**, prototype phare **The Teller** |
| Accroche | *« Making technology invisible through everyday objects for elderly users »* |
| Slogan du prototype | *« Because everyone has a story to tell. »* |
| Contexte | Projet de soutenance, ESILV, 4e année, Master Creative Technology |
| Période | Printemps 2026 |
| Équipe | Binôme : Alexandre HAGUET & Alexandre LE PORT |
| Rôle d'Alexandre Haguet | `TODO : préciser la répartition (hardware, back-end IA, web app, étude utilisateurs…)` |
| Statut | Prototype fonctionnel de bout en bout, testé auprès du public cible |
| Domaines | HCI, IA générative embarquée, objets connectés, prototypage hardware, recherche utilisateur, silver economy |

**Résumé en une phrase :** Loom Collection est une gamme d'assistants vocaux IA cachés dans des objets vintage du quotidien pour les personnes âgées. Le premier prototype, The Teller, est un téléphone à cadran qui recueille les souvenirs de vie par la conversation et les transforme en frise chronologique consultable par la famille.

---

## 2. Le problème

- 25 % des personnes âgées sont socialement isolées (OMS).
- 50 % des Françaises de plus de 75 ans sont veuves (INED).
- L'isolement est un facteur majeur de mortalité prématurée (Holt-Lunstad, 2015).

**Pourquoi les solutions existantes échouent (état de l'art, en 3 temps) :**
1. **Problème** : smartphones et tablettes ne conviennent pas aux seniors. Interfaces complexes, trop de menus, manque de confiance, obstacles liés à la santé (Harris et al., 2022 ; Vaportzis et al., 2017).
2. **Solution partielle** : les assistants vocaux (type Alexa) lèvent la barrière physique, mais restent sujets aux malentendus, aux craintes sur la vie privée et collent mal aux habitudes quotidiennes (Dino et al., 2025 ; Kim, 2021).
3. **Insight** : des projets comme KOMP et Yayagram montrent que la technologie est adoptée quand elle se loge dans un objet simple et familier (« dé-optimiser pour gagner la confiance »).

**Synthèse / parti pris :** IA générative + objet familier + interaction minimale = meilleure voie d'adoption pour les seniors.

---

## 3. La solution : la gamme Loom Collection

| Objet | Base vintage | Fonction | Statut |
|---|---|---|---|
| **The Teller** | Téléphone GPO 746 | Recueille les récits de vie, construit une frise chronologique pour la famille | **Prototypé et fonctionnel** |
| The Tuner | Radio vintage | Actualités et stimulation cognitive | Concept |
| The Imprint | Machine à écrire vintage | Imprime les souvenirs sous forme d'histoires illustrées | Concept |

### Parcours utilisateur de The Teller (4 étapes)
1. **On décroche le combiné** : la conversation démarre automatiquement.
2. **L'IA pose des questions sur la vie** : souvenirs, anecdotes, grandes étapes.
3. **Les récits sont transcrits**, puis résumés et stockés par l'IA.
4. **La famille consulte « l'arbre de vie »**, une frise chronologique via une web app.

Point clé : aucune courbe d'apprentissage. Décrocher suffit.

---

## 4. Technique

### Hardware (dans le téléphone)
- Raspberry Pi 5
- Carte son USB (entrée micro / sortie audio)
- Commutateur de crochet (hook switch) branché sur les GPIO du Pi pour détecter le décroché/raccroché
- Combiné d'origine RJ9 (écouteur + micro) conservé comme interface
- Carte MicroSD, alimentation USB-C 5V

### Architecture logicielle (client / serveur, 100 % locale)
```
[Client : Raspberry Pi 5 dans le téléphone]
  - détecte le décroché (hook switch)
  - capture l'audio du micro du combiné
  - joue la réponse de l'IA dans l'écouteur
        │  WebSocket
        ▼
[Serveur : PC local]
  STT  → Faster-Whisper
  LLM  → Ollama + Mistral
  TTS  → Kokoro
  WEB  → frise chronologique + SQLite
```
Principes : local, rapide, simple d'utilisation. Tout le traitement reste en local (aucune donnée envoyée dans le cloud), ce qui protège la vie privée.

**Tags tech pour le portfolio :** Raspberry Pi 5, GPIO, Python `TODO: confirmer le langage`, WebSocket, Faster-Whisper, Ollama, Mistral, Kokoro TTS, SQLite, web app.

---

## 5. Validation et recherche

### Test avec le public cible
Le prototype a été testé avec des personnes âgées.
- **Retours positifs** : interaction avec le combiné jugée instinctive et pratique ; les questions de l'IA guident naturellement la conversation ; le principe d'un objet familier est bien reçu ; certains apprécient de pouvoir partager leurs souvenirs à distance avec leurs petits-enfants.
- **Réserves** : risque de remplacer les vraies interactions avec les petits-enfants ; design de la web app à améliorer ; usage quotidien à long terme non vérifié.

### Recherche appliquée : réplication d'étude
Réplication de **Pradhan et al., 2020** (personnes âgées et Alexa ; étude originale : 7 participants américains sur 3 semaines).
- **Notre version :** 5 seniors en France, sessions de 15 à 20 min. Protocole : discussion → démonstration → test guidé → test libre → retours.
- **Confirmé :** la voix paraît plus simple que les menus de smartphone ; la recherche d'information (météo, santé, culture générale) est l'usage le plus spontané ; les questions de santé sont particulièrement pertinentes.
- **Nouvelles observations :** difficulté à savoir quoi demander sans être guidé ; méfiance envers la voix de synthèse ; perception de ce type d'assistant comme un danger pour les jeunes générations.
- **Limite :** sessions courtes, donc aucune conclusion possible sur l'adoption à long terme.

---

## 6. Analyse critique (à garder, c'est un signe de maturité pour un recruteur)

**Forces :** prototype fonctionnel de bout en bout · interaction sans apprentissage · confidentialité (traitement local) · valeur sociale.

**Limites :** dépend d'un serveur (PC) à proximité, donc pas autonome · la latence du LLM peut casser le rythme de la conversation · voix encore un peu robotique · design de la web app perfectible.

---

## 7. Suites envisagées

- **Recherche 1, Embodied Reminiscence Phone :** un téléphone rétro produit-il des récits autobiographiques plus riches qu'une interface vocale standard ? Étude intra-sujets, 16 à 24 participants de 65 ans et plus, téléphone rétro vs enceinte. Objectif : workshop paper en HCI (réf. Zhai et al. 2024, Huang et al. 2025 CHI).
- **Recherche 2, Conversational Scaffolding :** quel style de relance (neutre / empathique / narratif guidé) équilibre le mieux la richesse des récits et le confort ? Même téléphone, comportement d'IA différent.
- **Recherche 3, impact cognitif et social :** étude longitudinale de 3 mois en EHPAD (MoCA, échelle de solitude UCLA, engagement familial).
- **Entrepreneuriat :** silver economy en France (130 Md€+ d'ici 2030). MVP : un Teller autonome (plug & play) + web app famille en freemium. Approche B2B2C avec un pilote prévu dans 3 EHPAD. Pistes d'incubation : DeVinci Startups, Silver Innov'.

---

## 8. Consignes pour la page portfolio

**Cible :** recruteurs (managers tech et RH). Ils doivent comprendre en 10 secondes *quoi*, *pour qui*, *mon rôle*, *ce que ça prouve*.

**Structure suggérée :**
1. Hero : nom, accroche, photo du téléphone, tags (Hardware · IA locale · HCI · Recherche utilisateur), contexte (ESILV, 2026, binôme).
2. Le problème : 3 chiffres clés en grand.
3. L'idée : la synthèse en une ligne + la gamme des 3 objets (Teller mis en avant, les deux autres marqués « concept »).
4. Comment ça marche : les 4 étapes du parcours, visuelles.
5. Sous le capot : schéma d'architecture + composants hardware.
6. Test et recherche : retours utilisateurs + réplication Pradhan.
7. Ce que j'en retiens : forces / limites / suites.
8. Mon rôle et compétences démontrées.

**Compétences à faire ressortir :** prototypage hardware/software de bout en bout, intégration d'un pipeline vocal IA local (STT → LLM → TTS), conception centrée utilisateur pour un public vulnérable, méthodologie de recherche (réplication d'étude HCI), regard critique, vision produit/marché.

**Ton :** concret, sobre, orienté impact. Pas de jargon marketing. Phrases courtes.

**Identité visuelle utilisée dans la soutenance (réutilisable) :** fond `#B8BCC2`, cartes `#A8ACB4`, accents orange `#D4873E`, bleu `#3D8BA6`, vert `#3A9E6B`.

**Visuels disponibles (à fournir dans `/assets/loom/`) :** `TODO` photo du téléphone GPO 746, intérieur du Teller, schéma de câblage, capture de la web app (frise), photo du test utilisateur, visuels concept Tuner/Imprint (images Pinterest : ne pas publier sans droits, préférer des visuels originaux).

**Langue du site :** `TODO : FR, EN ou bilingue`.

**À NE PAS faire :** inventer des métriques (latence, nombre d'utilisateurs, précision), présenter Tuner/Imprint comme fonctionnels, ou exagérer le statut entrepreneurial (le pilote EHPAD est *prévu*, pas réalisé).
