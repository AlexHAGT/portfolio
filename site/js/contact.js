/* =========================================================================
   contact.js — bouton « Copier l'adresse » de la section Contact

   Le bouton est caché dans le HTML (attribut hidden). On ne l'affiche que si
   le navigateur sait écrire dans le presse-papiers (navigator.clipboard) :
   sans JavaScript, ou sur un navigateur trop ancien, il reste invisible et
   le lien e-mail fonctionne quand même.
   Les messages viennent de js/textes.js (français ou anglais).
   ========================================================================= */

const boutonCopier = document.querySelector("[data-copier]");
const messageCopie = document.querySelector("[data-copier-message]");

if (boutonCopier && messageCopie && navigator.clipboard) {
  boutonCopier.hidden = false;

  // Minuteur qui efface le message après quelques secondes
  let minuteur = null;

  boutonCopier.addEventListener("click", async () => {
    // async / await : la copie prend un court instant ; « await » attend
    // qu'elle soit terminée avant de passer à la ligne suivante.
    try {
      await navigator.clipboard.writeText(boutonCopier.dataset.copier);
      messageCopie.textContent = TEXTES.adresseCopiee;
    } catch {
      // Copie refusée par le navigateur (rare) : on indique quoi faire
      messageCopie.textContent = TEXTES.copieImpossible;
    }

    clearTimeout(minuteur);
    minuteur = setTimeout(() => {
      messageCopie.textContent = "";
    }, 3000);
  });
}
