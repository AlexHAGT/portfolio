/* =========================================================================
   projets.js — fabrique les cartes et les fenêtres de détail des projets
   à partir de data/projets.fr.js

   Principe : la liste PROJETS (définie dans le fichier de données, chargé
   juste avant ce script) est transformée en HTML, puis insérée dans la page.
   Il n'y a rien à modifier ici pour ajouter un projet.

   Plan du fichier :
   1. Outils communs (échappement, image, fiche, liens)
   2. Cartes des projets principaux
   2b. Cartes des projets secondaires
   3. Contenu de la fenêtre de détail (un rendu par type de bloc)
   4. Ouverture et fermeture de la fenêtre (clavier, bouton Retour, lien direct)
   5. Démarrage
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. Outils communs
   ------------------------------------------------------------------------- */

/* Neutralise les caractères spéciaux du HTML (<, >, &, ") dans un texte.
   Sans cela, un texte contenant « < » pourrait casser la page, car le
   navigateur le prendrait pour le début d'une balise. */
function echapper(texte) {
  return typographie(String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"));
}


/* Typographie française : remplace l'espace avant « : ; ! ? » et à
   l'intérieur des guillemets « » par une espace insécable (&nbsp;), qui
   empêche le retour à la ligne à cet endroit. Sinon, une ligne pourrait
   commencer par « : » ou un guillemet rester seul en fin de ligne. */
function typographie(texte) {
  return texte
    .replace(/ ([:;!?»])/g, "&nbsp;$1")
    .replace(/« /g, "«&nbsp;");
}


/* Visuel : une <figure> avec l'image et sa légende.
   srcset liste les tailles disponibles ; sizes indique la largeur affichée
   (environ 60 % de l'écran sur ordinateur, toute la largeur sur mobile) :
   le navigateur en déduit la taille à télécharger.
   Attention : avec srcset, le navigateur considère que l'image mesure la
   largeur donnée dans sizes. Pour une petite image posée sur fond blanc, on
   donne donc sa vraie largeur, sinon elle serait agrandie et floue.
   « tailles » permet de donner une autre valeur de sizes (cartes compactes,
   moins larges). */
function visuel(image, classe = "projet__visuel", tailles = "(min-width: 64em) 58vw, 100vw") {
  const srcset = image.largeurs
    .map((largeur) => `${image.fichier}-${largeur}.webp ${largeur}w`)
    .join(", ");
  const plusPetite = `${image.fichier}-${image.largeurs[0]}.webp`;
  const plusGrande = Math.max(...image.largeurs);
  const sizes = image.surFondBlanc ? `${plusGrande}px` : tailles;
  const [largeur, hauteur] = image.dimensions;
  const classeFond = image.surFondBlanc ? " visuel--fond-blanc" : "";
  const legende = image.legende
    ? `<figcaption class="visuel__legende libelle">${echapper(image.legende)}</figcaption>`
    : "";

  // loading="lazy" : l'image n'est téléchargée qu'à l'approche de l'écran
  return `
    <figure class="${classe}${classeFond}">
      <div class="visuel__cadre">
        <img src="${plusPetite}" srcset="${srcset}"
             sizes="${sizes}"
             width="${largeur}" height="${hauteur}"
             alt="${echapper(image.alt)}" loading="lazy" decoding="async">
      </div>
      ${legende}
    </figure>`;
}


/* Fiche « libellé / valeur » : mêmes classes que la fiche du profil */
function fiche(lignes, classe = "projet__fiche") {
  const contenu = lignes
    .map((ligne) => `
      <div class="fiche__ligne">
        <dt class="libelle">${echapper(ligne.libelle)}</dt>
        <dd>${echapper(ligne.valeur)}</dd>
      </div>`)
    .join("");
  return `<dl class="${classe}">${contenu}</dl>`;
}


/* Lien externe : s'ouvre dans un nouvel onglet ; le texte caché l'annonce
   aux lecteurs d'écran. rel="noopener" empêche la page ouverte d'agir sur
   le portfolio (bonne pratique de sécurité). */
function lienExterne(lien, classe = "bouton libelle") {
  return `
    <a class="${classe}" href="${echapper(lien.url)}" target="_blank" rel="noopener">
      ${echapper(lien.texte)} <span aria-hidden="true">↗</span>
      <span class="visuellement-cache">(nouvel onglet)</span>
    </a>`;
}


/* Numéro sur deux chiffres : 1 → « 01 » */
function numeroSurDeuxChiffres(numero) {
  return String(numero).padStart(2, "0");
}


/* -------------------------------------------------------------------------
   2. Cartes des projets principaux
   ------------------------------------------------------------------------- */

/* Boutons sous la fiche d'une carte : « Voir le projet » (si le projet a un
   contenu détaillé), puis les liens externes. */
function boutonsCarte(projet) {
  const boutons = [];

  if (projet.detail) {
    // C'est un vrai <button> : il ouvre une fenêtre, il ne mène pas ailleurs.
    // data-ouvrir indique quel projet afficher (voir la partie 4).
    boutons.push(`
      <button class="bouton bouton--plein libelle" type="button"
              data-ouvrir="${echapper(projet.id)}" aria-haspopup="dialog">
        Voir le projet <span aria-hidden="true">→</span>
      </button>`);
  }
  projet.liens.forEach((lien) => boutons.push(lienExterne(lien)));

  if (boutons.length === 0) return "";
  return `<ul class="projet__liens" role="list">${boutons.map((b) => `<li>${b}</li>`).join("")}</ul>`;
}


/* Grande carte d'un projet principal. « numero » commence à 1. */
function carteProjetPrincipal(projet, numero) {
  const idTitre = `projet-${projet.id}-titre`;
  const badge = projet.badge
    ? `<p class="badge libelle">${echapper(projet.badge)}</p>`
    : "";

  // Ordre du HTML = ordre de lecture sur mobile : en-tête, visuel, détails.
  // Sur ordinateur, le CSS place le visuel à côté du texte.
  return `
    <article class="projet grille" id="projet-${projet.id}" aria-labelledby="${idTitre}">
      <header class="projet__entete">
        <p class="projet__numero" aria-hidden="true">${numeroSurDeuxChiffres(numero)}</p>
        <h3 class="projet__titre" id="${idTitre}">${echapper(projet.titre)}</h3>
        ${badge}
      </header>
      ${visuel(projet.image)}
      <div class="projet__corps">
        <p class="projet__phrase">${echapper(projet.phrase)}</p>
        ${fiche(projet.fiche)}
        ${boutonsCarte(projet)}
      </div>
    </article>`;
}


/* Projets principaux visibles, dans l'ordre du fichier de données */
function projetsPrincipaux() {
  return PROJETS.filter(
    (projet) => projet.categorie === "principal" && projet.visible
  );
}


function afficherProjetsPrincipaux() {
  const zone = document.querySelector('[data-projets="principal"]');
  if (!zone) return;

  zone.innerHTML = projetsPrincipaux()
    .map((projet, index) => carteProjetPrincipal(projet, index + 1))
    .join("");
}


/* -------------------------------------------------------------------------
   2b. Cartes des projets secondaires
   Cartes blanches compactes : visuel en haut, badge, titre, phrase, contexte
   et bouton « Voir le projet ». Toute la carte est cliquable (voir .carte
   dans sections.css).
   ------------------------------------------------------------------------- */

/* Aperçu d'une démo en ligne, dessiné comme une fenêtre de navigateur.
   La démo elle-même n'est PAS chargée : elle utilise la carte graphique et
   télécharge des modèles, ce qui ralentirait la page. Le bouton l'ouvre
   dans un nouvel onglet. La barre d'adresse est décorative (aria-hidden). */
function apercuDemo(demo) {
  return `
    <div class="carte__visuel demo-apercu">
      <div class="demo-apercu__barre" aria-hidden="true">
        <span class="demo-apercu__points"></span>
        <span class="demo-apercu__adresse">${echapper(demo.adresse)}</span>
      </div>
      <div class="demo-apercu__ecran">
        <p class="libelle demo-apercu__etiquette">Démo en direct</p>
        <p class="demo-apercu__nom">${echapper(demo.titre)}</p>
        <p class="demo-apercu__texte">${echapper(demo.texte)}</p>
        <a class="bouton bouton--plein libelle demo-apercu__bouton"
           href="${echapper(demo.url)}" target="_blank" rel="noopener">
          <span aria-hidden="true">▶</span> Essayer la démo
          <span class="visuellement-cache">${echapper(demo.titre)} (nouvel onglet)</span>
        </a>
        <p class="demo-apercu__note">${echapper(demo.note)}</p>
      </div>
    </div>`;
}


/* Bloc gris neutre à la place d'un visuel pas encore fourni (règle du
   projet). Le nom du visuel attendu est écrit dessus. */
function visuelManquant(nom) {
  return `
    <div class="carte__visuel visuel-manquant">
      <p class="libelle">Visuel à fournir : ${echapper(nom)}</p>
    </div>`;
}


function carteProjetSecondaire(projet) {
  const idTitre = `projet-${projet.id}-titre`;
  const badge = projet.badge
    ? `<p class="badge libelle">${echapper(projet.badge)}</p>`
    : "";

  let illustration = "";
  if (projet.image) {
    // Sur tablette et ordinateur, la carte occupe environ la moitié de l'écran
    illustration = visuel(projet.image, "carte__visuel", "(min-width: 40em) 50vw, 100vw");
  } else if (projet.demo) {
    illustration = apercuDemo(projet.demo);
  } else if (projet.visuelManquant) {
    illustration = visuelManquant(projet.visuelManquant);
  }

  const bouton = projet.detail
    ? `
      <button class="bouton bouton--plein libelle carte__bouton" type="button"
              data-ouvrir="${echapper(projet.id)}" aria-haspopup="dialog">
        Voir le projet <span aria-hidden="true">→</span>
        <span class="visuellement-cache">${echapper(projet.titre)}</span>
      </button>`
    : "";

  // Visuel en premier : l'ordre du HTML suit l'ordre à l'écran, donc la
  // touche Tab passe du bouton de la démo au bouton « Voir le projet ».
  return `
    <article class="carte" id="projet-${projet.id}" aria-labelledby="${idTitre}">
      ${illustration}
      <div class="carte__corps">
        ${badge}
        <h3 class="carte__titre" id="${idTitre}">${echapper(projet.titre)}</h3>
        <p class="carte__phrase">${echapper(projet.phrase)}</p>
        <p class="carte__contexte libelle">${echapper(projet.contexte)}</p>
        ${bouton}
      </div>
    </article>`;
}


/* Projets secondaires visibles, dans l'ordre du fichier de données */
function projetsSecondaires() {
  return PROJETS.filter(
    (projet) => projet.categorie === "secondaire" && projet.visible
  );
}


function afficherProjetsSecondaires() {
  const zone = document.querySelector('[data-projets="secondaire"]');
  if (!zone) return;

  zone.innerHTML = projetsSecondaires().map(carteProjetSecondaire).join("");
}


/* -------------------------------------------------------------------------
   3. Contenu de la fenêtre de détail
   Une fonction par type de bloc (voir la liste des types en tête de
   data/projets.fr.js). BLOCS associe chaque type à sa fonction.
   ------------------------------------------------------------------------- */

const BLOCS = {
  paragraphe: (bloc) => `<p class="detail__paragraphe">${echapper(bloc.texte)}</p>`,

  liste: (bloc) => `
    <ul class="detail__liste">
      ${bloc.elements.map((element) => `<li>${echapper(element)}</li>`).join("")}
    </ul>`,

  // Chiffre en très grand, explication, puis source en petit
  chiffres: (bloc) => `
    <ul class="detail__chiffres" role="list">
      ${bloc.elements.map((chiffre) => `
        <li class="chiffre">
          <p class="chiffre__valeur">${echapper(chiffre.valeur)}</p>
          <p class="chiffre__texte">${echapper(chiffre.texte)}</p>
          ${chiffre.source ? `<p class="chiffre__source libelle">Source : ${echapper(chiffre.source)}</p>` : ""}
        </li>`).join("")}
    </ul>`,

  // <ol> : liste numérotée, les lecteurs d'écran annoncent le numéro.
  // Un élément est soit un texte, soit { titre, texte }.
  etapes: (bloc) => `
    <ol class="detail__etapes" role="list">
      ${bloc.elements.map((etape, index) => {
        const titre = typeof etape === "string" ? "" : `<p class="etape__titre libelle">${echapper(etape.titre)}</p>`;
        const texte = typeof etape === "string" ? etape : etape.texte;
        return `
          <li class="etape">
            <span class="etape__numero" aria-hidden="true">${numeroSurDeuxChiffres(index + 1)}</span>
            <div>${titre}<p>${echapper(texte)}</p></div>
          </li>`;
      }).join("")}
    </ol>`,

  // Encadrés côte à côte ; badge, texte et liste sont facultatifs
  cartes: (bloc) => `
    <ul class="detail__cartes" role="list">
      ${bloc.elements.map((carte) => `
        <li class="mini-carte">
          <p class="mini-carte__titre">${echapper(carte.titre)}</p>
          ${carte.badge ? `<p class="badge libelle">${echapper(carte.badge)}</p>` : ""}
          ${carte.texte ? `<p>${echapper(carte.texte)}</p>` : ""}
          ${carte.liste ? `<ul class="detail__liste">${carte.liste.map((element) => `<li>${echapper(element)}</li>`).join("")}</ul>` : ""}
        </li>`).join("")}
    </ul>`,

  // Blocs reliés par des flèches (schéma d'architecture). La flèche et son
  // libellé sont lus par les lecteurs d'écran sous la forme « relié par … ».
  schema: (bloc) => {
    const morceaux = bloc.blocs.map((element, index) => {
      const boite = `
        <div class="schema__bloc">
          <p class="schema__titre libelle">${echapper(element.titre)}</p>
          <p class="schema__sous-titre">${echapper(element.sousTitre)}</p>
          <ul class="detail__liste">${element.lignes.map((ligne) => `<li>${echapper(ligne)}</li>`).join("")}</ul>
        </div>`;
      const liaison = bloc.liaisons[index];
      const fleche = liaison
        ? `<p class="schema__liaison libelle"><span class="visuellement-cache">relié par</span> ${echapper(liaison)} <span aria-hidden="true">⇄</span></p>`
        : "";
      return boite + fleche;
    });
    return `<div class="detail__schema">${morceaux.join("")}</div>`;
  },

  image: (bloc) => visuel(bloc.image, "detail__visuel"),

  sources: (bloc) => `
    <div class="detail__sources">
      <p class="libelle">Sources</p>
      <ul class="detail__liste">
        ${bloc.elements.map((source) => `<li>${lienExterne(source, "detail__lien")}</li>`).join("")}
      </ul>
    </div>`,

  // Même encadré que la mention du résumé
  note: (bloc) => `<p class="detail__mention">${echapper(bloc.texte)}</p>`,

  liens: (bloc) => `
    <ul class="projet__liens" role="list">
      ${bloc.elements.map((lien) => `<li>${lienExterne(lien)}</li>`).join("")}
    </ul>`,
};


function rendreBloc(bloc) {
  const rendu = BLOCS[bloc.type];
  // Type inconnu (faute de frappe dans les données) : on le signale dans la
  // console du navigateur (F12) au lieu de casser toute la fenêtre.
  if (!rendu) {
    console.warn(`Type de bloc inconnu dans projets.fr.js : « ${bloc.type} »`);
    return "";
  }
  return rendu(bloc);
}


/* Identifiant de la section n° index d'un projet (sert au sommaire) */
function idSection(projet, index) {
  return `detail-${projet.id}-${index + 1}`;
}


/* Sommaire : liens vers chaque section de la fenêtre. Le clic est géré en
   JavaScript (partie 4) : un lien « #… » classique changerait l'adresse de
   la page, ce qui fermerait la fenêtre. */
function sommaire(projet) {
  const liens = projet.detail.sections
    .map((section, index) => `
      <li><a href="#${idSection(projet, index)}" data-sommaire>${echapper(section.titre)}</a></li>`)
    .join("");
  return `
    <nav class="detail__sommaire" aria-label="Sommaire du projet">
      <p class="libelle">Sommaire</p>
      <ol class="detail__sommaire-liste" role="list">${liens}</ol>
    </nav>`;
}


/* Contenu complet de la fenêtre : à gauche l'essentiel du projet (reste
   visible pendant la lecture sur ordinateur), à droite les sections.
   « numero » vaut null pour un projet secondaire : pas de grand numéro. */
function contenuDetail(projet, numero) {
  const grandNumero = numero
    ? `<p class="projet__numero" aria-hidden="true">${numeroSurDeuxChiffres(numero)}</p>`
    : "";
  const badge = projet.badge
    ? `<p class="badge libelle">${echapper(projet.badge)}</p>`
    : "";
  const mention = projet.detail.mention
    ? `<p class="detail__mention">${echapper(projet.detail.mention)}</p>`
    : "";
  const liensExternes = projet.liens.length
    ? `<ul class="projet__liens" role="list">${projet.liens.map((lien) => `<li>${lienExterne(lien)}</li>`).join("")}</ul>`
    : "";

  // tabindex="-1" : le titre peut recevoir le focus quand on clique sur le
  // sommaire (le clavier repart de là), sans entrer dans l'ordre de la touche Tab.
  const sections = projet.detail.sections
    .map((section, index) => `
      <section class="detail__section" id="${idSection(projet, index)}">
        <h3 class="section__titre libelle" tabindex="-1">${echapper(section.titre)}</h3>
        ${section.blocs.map(rendreBloc).join("")}
      </section>`)
    .join("");

  return `
    <div class="detail__resume">
      ${grandNumero}
      <h2 class="projet__titre" id="fenetre-titre">${echapper(projet.titre)}</h2>
      ${badge}
      <p class="projet__phrase">${echapper(projet.phrase)}</p>
      ${fiche(projet.fiche)}
      ${mention}
      ${liensExternes}
      ${projet.detail.sommaire ? sommaire(projet) : ""}
    </div>
    <div class="detail__sections">${sections}</div>`;
}


/* -------------------------------------------------------------------------
   4. Ouverture et fermeture de la fenêtre
   La fenêtre est un élément <dialog> présent dans index.html. Avec
   showModal(), le navigateur gère pour nous : la touche Échap qui ferme,
   le reste de la page rendu inactif, le focus clavier gardé dans la fenêtre.

   On ajoute l'adresse du projet dans la barre du navigateur (…/#loom) :
   - le lien peut être partagé et ouvre directement la fenêtre ;
   - le bouton « Retour » (très utilisé sur mobile) ferme la fenêtre au
     lieu de quitter le site.
   ------------------------------------------------------------------------- */

const fenetre = document.getElementById("fenetre-projet");
const fenetreContenu = fenetre.querySelector("[data-fenetre-contenu]");
const fenetreNumero = fenetre.querySelector("[data-fenetre-numero]");

// Élément qui avait le focus avant l'ouverture (le bouton « Voir le projet ») :
// on y ramène le clavier à la fermeture, pour ne pas perdre sa place.
let elementAvantOuverture = null;


/* Projet visible (principal ou secondaire) qui a une fenêtre de détail */
function trouverProjet(id) {
  return [...projetsPrincipaux(), ...projetsSecondaires()]
    .find((projet) => projet.id === id && projet.detail);
}


/* Ouvre la fenêtre d'un projet.
   ajouterHistorique : true quand on clique sur « Voir le projet » (on crée
   une entrée dans l'historique pour que « Retour » ferme la fenêtre) ;
   false quand on arrive par un lien direct ou par le bouton « Suivant ». */
function ouvrirProjet(id, ajouterHistorique) {
  const projet = trouverProjet(id);
  if (!projet) return;

  // Projets principaux numérotés (01, 02…) ; projets secondaires sans numéro
  let numero = null;
  if (projet.categorie === "principal") {
    numero = projetsPrincipaux().indexOf(projet) + 1;
    fenetreNumero.textContent = `Projet ${numeroSurDeuxChiffres(numero)} / ${projet.titre}`;
  } else {
    fenetreNumero.textContent = `Autres projets / ${projet.titre}`;
  }
  fenetreContenu.innerHTML = contenuDetail(projet, numero);

  elementAvantOuverture = document.activeElement;
  if (ajouterHistorique) {
    history.pushState({ projet: id }, "", `#${id}`);
  }
  if (!fenetre.open) fenetre.showModal();
  fenetre.scrollTop = 0;
}


/* Demande de fermeture (bouton « Fermer »). Si la fenêtre a ajouté une
   entrée dans l'historique, on recule d'un cran : l'événement « popstate »
   (plus bas) fermera alors la fenêtre. Sinon, on la ferme directement. */
function demanderFermeture() {
  if (history.state && history.state.projet) {
    history.back();
  } else {
    fenetre.close();
  }
}


// Clic sur un bouton « Voir le projet » (un seul écouteur pour toute la page)
document.addEventListener("click", (evenement) => {
  const bouton = evenement.target.closest("[data-ouvrir]");
  if (bouton) ouvrirProjet(bouton.dataset.ouvrir, true);
});

// Clic dans le sommaire : faire défiler la fenêtre jusqu'à la section, sans
// changer l'adresse, puis y placer le focus clavier.
fenetreContenu.addEventListener("click", (evenement) => {
  const lien = evenement.target.closest("[data-sommaire]");
  if (!lien) return;
  evenement.preventDefault();
  const section = document.getElementById(lien.hash.slice(1));
  if (!section) return;
  const sansAnimation = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: sansAnimation ? "auto" : "smooth" });
  section.querySelector("h3").focus({ preventScroll: true });
});

// Bouton « Fermer » de la fenêtre
fenetre.querySelector("[data-fermer]").addEventListener("click", demanderFermeture);

// Touche Échap : on intercepte la fermeture automatique pour passer par
// demanderFermeture et garder l'historique cohérent.
fenetre.addEventListener("cancel", (evenement) => {
  evenement.preventDefault();
  demanderFermeture();
});

// Après chaque fermeture : retirer #projet de l'adresse s'il y est encore,
// vider la fenêtre et rendre le focus à l'élément d'origine.
fenetre.addEventListener("close", () => {
  if (location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  fenetreContenu.innerHTML = "";
  if (elementAvantOuverture && document.contains(elementAvantOuverture)) {
    elementAvantOuverture.focus();
  }
});

// Boutons « Retour » / « Suivant » du navigateur
window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  if (trouverProjet(id)) {
    ouvrirProjet(id, false);
  } else if (fenetre.open) {
    fenetre.close();
  }
});


/* -------------------------------------------------------------------------
   5. Démarrage
   ------------------------------------------------------------------------- */

afficherProjetsPrincipaux();
afficherProjetsSecondaires();

// Lien direct vers un projet (…/portfolio/#occlumap) : ouvrir sa fenêtre
const projetDemande = location.hash.slice(1);
if (trouverProjet(projetDemande)) {
  ouvrirProjet(projetDemande, false);
}
