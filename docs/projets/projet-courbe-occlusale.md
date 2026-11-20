# Projet : outil d'aide à la décision en prothèse dentaire (courbe occlusale)

> Fiche projet destinée au portfolio. Elle décrit le projet tel qu'il est défini dans la proposition A5 (octobre 2026).
> **Statut : en cours** (12 octobre 2026 → 22 janvier 2027). Aucun résultat d'évaluation n'existe encore : ne pas en inventer.

## En une phrase

Un prototype de logiciel de bureau qui lit le scan intra-oral d'un patient et montre, dent par dent, où réduire et où rehausser pour rétablir un plan d'occlusion régulier, avant de commander un wax-up au prothésiste.

## Contexte

- **Cadre :** projet d'innovation de 5e année (A5), Institute for Future Technologies (IFT) / ESILV, Pôle Léonard de Vinci, majeure Creative Technology.
- **Équipe :** Alexandre Haguet (ingénierie, développement, apprentissage automatique) et Pierre, étudiant en dernière année de chirurgie dentaire à Sorbonne Université, en clinique à l'hôpital Charles-Foix (AP-HP). Partenaire clinique.
- **Référente :** Xiao Xiao (IFT / ESILV).
- **Axe de valorisation :** recherche (étude pilote, article visé co-signé avec le partenaire clinique).
- **Origine personnelle :** Alexandre vient du domaine de la santé (année de PASS) ; Pierre et lui avaient l'idée de monter un projet commun depuis leurs études de santé.

## Le problème

Quand un patient a des dents usées ou des dents qui ont « poussé » faute de dent en face, le dentiste doit rétablir un plan d'occlusion régulier (la surface où les dents du haut et du bas se rencontrent). Pour décider quelles dents réduire et lesquelles rehausser, il commande souvent une maquette des futures dents au prothésiste (le wax-up) : un aller-retour qui prend du temps, avec une décision qui repose beaucoup sur l'œil du praticien.

## La solution

1. **Entrée :** deux fichiers STL exportés par un scanner intra-oral (arcade du haut et arcade du bas, en occlusion).
2. **Détection des cuspides** (les sommets des dents) par un modèle d'apprentissage automatique, avec sélection manuelle en secours.
3. **Ajustement robuste d'une surface de référence**, la sphère de Monson (modèle classique de la courbure des arcades) : les dents trop hautes ou trop basses sont écartées du calcul au lieu de le fausser.
4. **Carte signée** : distance de chaque point de la surface dentaire à la référence.
5. **Sortie :** vue 3D en couleurs (rouge = à réduire, bleu = à rehausser), tableau par dent (« réduire / rehausser / conforme », écart en mm), réglages en direct (rayon de la sphère, hauteur du plan, dents exclues ou imposées).

Vision à long terme : afficher cette analyse directement pendant la prise d'empreinte, comme les caméras intra-orales affichent déjà la carte des contacts entre arcades.

## Ce qui rend le projet original

Les briques existent séparément dans la littérature (calcul de la sphère de Monson sur dentures saines, détection de repères dentaires par apprentissage, cartes de réduction produites après un wax-up, Occlucurve de Modjaw qui exige un enregistrement des mouvements de la mâchoire). Le projet les combine : **STL seul, avant le wax-up, robuste aux dents usées, avec une décision par dent**, puis une comparaison au jugement de praticiens et une mesure de l'accord entre praticiens, qu'aucune étude trouvée ne mesure.

## Volet recherche

- **Question :** l'outil désigne-t-il les dents à réduire ou à rehausser aussi bien qu'un praticien ?
- **Méthode :** étude pilote sur une vingtaine de cas anonymisés ; le partenaire et 2 ou 3 praticiens classent chaque dent sans voir la carte ; comparaison entre praticiens et avec l'outil (taux d'accord, coefficient kappa).
- **Articles modèles :** Wen et al. 2025, *Clin Exp Dent Res* (sphère de Monson calculée à partir de scans intra-oraux, doi.org/10.1002/cre2.70063) ; Ma et al. 2026, *AJODO* (détection automatique des repères dentaires par apprentissage profond, doi.org/10.1016/j.ajodo.2025.09.009).
- **État de l'art :** 25 travaux, articles et brevets, cartographiés en 5 thèmes (tableau Miro).

## Stack technique (prévue)

- Python, application de bureau
- PyVista / VTK (visualisation 3D), trimesh / Open3D (maillages)
- NumPy / SciPy (ajustement de sphère, moindres carrés puis méthode robuste type RANSAC)
- scikit-learn, PyTorch (détection des cuspides)
- Jeux de données publics : Teeth3DS+ (1 800 scans) et 3DTeethLand (340 scans, MICCAI 2024)
- Traitement 100 % local : aucun scan ne quitte l'ordinateur (données de santé)

## Planning (15 semaines)

| Période | Objectif |
| --- | --- |
| Oct. 2026 | Environnement, données, affichage des STL, sélection manuelle des cuspides, ajustement de la sphère |
| 20 nov. 2026 | Jalon : démo minimale complète (carte signée + tableau par dent). **Atteint** : démo minimale fonctionnelle (confirmé le 20/11/2026) |
| Déc. 2026 | Réglages interactifs, mode « référence imposée », détection automatique des cuspides |
| Janv. 2027 | Évaluation avec les praticiens, analyse, soutenance |

## Rôle d'Alexandre

Conception du projet, état de l'art, développement du prototype (géométrie 3D, interface, apprentissage automatique), protocole d'évaluation et pilotage. S'appuie sur son stage chez SEGULA Technologies (application de bureau Python validée par le client, sous contrainte stricte de confidentialité des données).

## Compétences mises en avant

Traitement de données 3D · apprentissage automatique appliqué à la santé · développement d'application de bureau · démarche de recherche (état de l'art, protocole, évaluation) · collaboration avec un partenaire clinique · protection des données de santé.

## Visuels disponibles

- Maquette d'écran **générée par IA**, valeurs fictives (carte couleur de l'arcade, réglages, tableau par dent). Légende obligatoire : « Maquette conceptuelle générée par IA, valeurs fictives »
- Tableau Miro de l'état de l'art (5 thèmes, 25 éléments)
- Figure d'un scan intra-oral issue de Wen et al. 2025 (licence CC BY 4.0, à citer)
- Capture de la carte des contacts entre arcades dans le logiciel d'un scanner intra-oral, faite par un ami chirurgien-dentiste (conservée sur le site, décision d'Alexandre du 20/11/2026)

## À ne pas affirmer dans le portfolio

- Ce n'est **pas** un dispositif médical et il n'est pas utilisé pour des décisions cliniques réelles.
- Pas de chiffres de performance ou de précision tant que l'évaluation (janvier 2027) n'est pas faite.
- Pas de nom de famille pour Pierre.
- Ne pas présenter le projet comme une startup ou un produit commercial.
