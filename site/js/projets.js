/* =========================================================================
   projets.js — fabrique les cartes de projets à partir de data/projets.fr.js

   Principe : la liste PROJETS (définie dans le fichier de données, chargé
   juste avant ce script) est transformée en HTML, puis insérée dans la page
   à l'endroit marqué data-projets="principal".
   Il n'y a rien à modifier ici pour ajouter un projet.
   ========================================================================= */


/* Neutralise les caractères spéciaux du HTML (<, >, &, ") dans un texte.
   Sans cela, un texte contenant « < » pourrait casser la page, car le
   navigateur le prendrait pour le début d'une balise. */
function echapper(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}


/* Visuel d'un projet : une <figure> avec l'image et sa légende.
   srcset liste les tailles disponibles ; sizes indique la largeur affichée
   (environ 60 % de l'écran sur ordinateur, toute la largeur sur mobile) :
   le navigateur en déduit la taille à télécharger.
   Attention : avec srcset, le navigateur considère que l'image mesure la
   largeur donnée dans sizes. Pour une petite image posée sur fond blanc, on
   donne donc sa vraie largeur, sinon elle serait agrandie et floue. */
function visuel(image) {
  const srcset = image.largeurs
    .map((largeur) => `${image.fichier}-${largeur}.webp ${largeur}w`)
    .join(", ");
  const plusPetite = `${image.fichier}-${image.largeurs[0]}.webp`;
  const plusGrande = Math.max(...image.largeurs);
  const sizes = image.surFondBlanc
    ? `${plusGrande}px`
    : "(min-width: 64em) 58vw, 100vw";
  const [largeur, hauteur] = image.dimensions;
  const classeFond = image.surFondBlanc ? " projet__visuel--fond-blanc" : "";
  const legende = image.legende
    ? `<figcaption class="projet__legende libelle">${echapper(image.legende)}</figcaption>`
    : "";

  // loading="lazy" : l'image n'est téléchargée qu'à l'approche de l'écran
  return `
    <figure class="projet__visuel${classeFond}">
      <div class="projet__cadre">
        <img src="${plusPetite}" srcset="${srcset}"
             sizes="${sizes}"
             width="${largeur}" height="${hauteur}"
             alt="${echapper(image.alt)}" loading="lazy" decoding="async">
      </div>
      ${legende}
    </figure>`;
}


/* Fiche « libellé / valeur » : mêmes classes que la fiche du profil */
function fiche(lignes) {
  const contenu = lignes
    .map((ligne) => `
      <div class="fiche__ligne">
        <dt class="libelle">${echapper(ligne.libelle)}</dt>
        <dd>${echapper(ligne.valeur)}</dd>
      </div>`)
    .join("");
  return `<dl class="projet__fiche">${contenu}</dl>`;
}


/* Boutons de liens externes. Ils s'ouvrent dans un nouvel onglet ; le texte
   caché l'annonce aux lecteurs d'écran. rel="noopener" empêche la page
   ouverte d'agir sur le portfolio (bonne pratique de sécurité). */
function liens(listeLiens) {
  if (listeLiens.length === 0) return "";
  const boutons = listeLiens
    .map((lien) => `
      <li>
        <a class="bouton libelle" href="${echapper(lien.url)}" target="_blank" rel="noopener">
          ${echapper(lien.texte)} <span aria-hidden="true">↗</span>
          <span class="visuellement-cache">(nouvel onglet)</span>
        </a>
      </li>`)
    .join("");
  return `<ul class="projet__liens" role="list">${boutons}</ul>`;
}


/* Grande carte d'un projet principal. « numero » commence à 1. */
function carteProjetPrincipal(projet, numero) {
  const idTitre = `projet-${projet.id}-titre`;
  // Numéro sur deux chiffres : 1 → « 01 »
  const numeroTexte = String(numero).padStart(2, "0");
  const badge = projet.badge
    ? `<p class="badge libelle">${echapper(projet.badge)}</p>`
    : "";

  // Ordre du HTML = ordre de lecture sur mobile : en-tête, visuel, détails.
  // Sur ordinateur, le CSS place le visuel à côté du texte.
  return `
    <article class="projet grille" id="projet-${projet.id}" aria-labelledby="${idTitre}">
      <header class="projet__entete">
        <p class="projet__numero" aria-hidden="true">${numeroTexte}</p>
        <h3 class="projet__titre" id="${idTitre}">${echapper(projet.titre)}</h3>
        ${badge}
      </header>
      ${visuel(projet.image)}
      <div class="projet__corps">
        <p class="projet__phrase">${echapper(projet.phrase)}</p>
        ${fiche(projet.fiche)}
        ${liens(projet.liens)}
      </div>
    </article>`;
}


/* Point de départ : remplit la zone des projets principaux */
function afficherProjetsPrincipaux() {
  const zone = document.querySelector('[data-projets="principal"]');
  if (!zone) return;

  const projets = PROJETS.filter(
    (projet) => projet.categorie === "principal" && projet.visible
  );
  zone.innerHTML = projets
    .map((projet, index) => carteProjetPrincipal(projet, index + 1))
    .join("");
}

afficherProjetsPrincipaux();
