/* =========================================================================
   textes.js — textes des boutons et messages créés par JavaScript,
   en français et en anglais

   Les textes fixes de la page sont écrits dans index.html (français) et
   en/index.html (anglais). Mais certains textes sont fabriqués par les
   scripts (« Voir le projet », « Fermer »…) : ils sont rassemblés ici, une
   fois par langue, pour que js/projets.js et js/contact.js restent les
   mêmes dans les deux versions du site.

   La langue est lue dans l'attribut lang de la balise <html> :
   <html lang="fr"> ou <html lang="en">.
   Ce fichier doit être chargé AVANT js/projets.js et js/contact.js.
   ========================================================================= */

const LANGUE = document.documentElement.lang === "en" ? "en" : "fr";

const TEXTES_PAR_LANGUE = {
  fr: {
    nouvelOnglet: "(nouvel onglet)",
    essayerDemo: "Essayer la démo",
    voirProjet: "Voir le projet",
    demoEnDirect: "Démo en direct",
    visuelAFournir: "Visuel à fournir : ",
    source: "Source : ",
    reliePar: "relié par",
    sources: "Sources",
    voirCode: "Voir le code sur GitHub",
    sommaire: "Sommaire",
    sommaireDuProjet: "Sommaire du projet",
    projet: "Projet",
    autresProjets: "Autres projets",
    demo: "Démo",
    noteWebGPU: "Démo WebGPU : fonctionne sur Chrome ou Edge récent, sur ordinateur.",
    sansWebGPU: "Votre navigateur ne semble pas prendre en charge WebGPU : la démo risque de ne pas fonctionner. Essayez Chrome ou Edge récent, ou ouvrez-la dans un nouvel onglet.",
    chargementDemo: "Chargement de la démo…",
    adresseCopiee: "Adresse copiée ✓",
    copieImpossible: "Copie impossible : sélectionnez l'adresse ci-dessus.",
  },
  en: {
    nouvelOnglet: "(opens in a new tab)",
    essayerDemo: "Try the demo",
    voirProjet: "View project",
    demoEnDirect: "Live demo",
    visuelAFournir: "Image to come: ",
    source: "Source: ",
    reliePar: "connected by",
    sources: "Sources",
    voirCode: "View the code on GitHub",
    sommaire: "Contents",
    sommaireDuProjet: "Project contents",
    projet: "Project",
    autresProjets: "Other projects",
    demo: "Demo",
    noteWebGPU: "WebGPU demo: works on a recent version of Chrome or Edge, on a computer.",
    sansWebGPU: "Your browser does not seem to support WebGPU: the demo may not work. Try a recent version of Chrome or Edge, or open it in a new tab.",
    chargementDemo: "Loading the demo…",
    adresseCopiee: "Address copied ✓",
    copieImpossible: "Copy failed: please select the address above.",
  },
};

// Les textes de la langue de la page : TEXTES.voirProjet, TEXTES.fermer…
const TEXTES = TEXTES_PAR_LANGUE[LANGUE];
