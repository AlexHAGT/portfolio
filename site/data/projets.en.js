/* =========================================================================
   projets.en.js — LES PROJETS DU PORTFOLIO (version anglaise)

   Traduction de data/projets.fr.js, chargée par en/index.html.
   - Même structure et mêmes champs que projets.fr.js : la description de
     chaque champ et de chaque type de bloc est en tête de ce fichier-là.
   - Seuls les textes sont traduits. Les « id » restent identiques (liens
     directs …/en/#loom).
   - Chemins des images : ils commencent par « ../ », car la page anglaise
     est dans le sous-dossier en/ (les images restent dans site/img/).
   - Toute modification d'un projet doit être faite dans LES DEUX fichiers.
   Source des textes : les fiches de docs/projets/ (en français).
   ========================================================================= */

const PROJETS = [

  // ===================================================================== Loom
  {
    id: "loom",
    categorie: "principal",
    visible: true,
    titre: "Loom Collection",
    badge: null,
    // Accroche d'origine en anglais (fiche du projet)
    phrase: "Making technology invisible through everyday objects for elderly users.",
    fiche: [
      { libelle: "Context", valeur: "Innovation project, flagship 4th-year project at ESILV · spring 2026 · team of two with Alexandre Le Port" },
      { libelle: "Role", valeur: "Prototyping and part of the code" },
      { libelle: "Tools", valeur: "Raspberry Pi 5, Python, Faster-Whisper, Ollama + Mistral, Kokoro, WebSocket, SQLite" },
      { libelle: "Result", valeur: "End-to-end working prototype, tested with elderly people" },
    ],
    image: {
      fichier: "../img/loom/loom-test-utilisateur",
      largeurs: [800, 1200],
      dimensions: [1200, 1600],
      alt: "An elderly person, of whom only the hand is visible, holds to their ear the handset of The Teller, a black vintage telephone on a table.",
      legende: "Testing The Teller with an elderly person",
      surFondBlanc: false,
    },
    liens: [
      { texte: "View the code", url: "https://github.com/Alexlp05/Loom" },
    ],
    detail: {
      mention: null,
      sections: [
        {
          titre: "The problem",
          blocs: [
            {
              type: "chiffres",
              elements: [
                { valeur: "25%", texte: "of older people are socially isolated", source: "WHO" },
                { valeur: "50%", texte: "of French women over 75 are widowed", source: "INED" },
              ],
            },
            { type: "paragraphe", texte: "Isolation is a major factor in premature mortality (Holt-Lunstad, 2015). Smartphones and tablets are poorly suited to older people: complex interfaces, too many menus, lack of confidence. Voice assistants remove the physical barrier, but still lead to misunderstandings and privacy concerns." },
          ],
        },
        {
          titre: "The idea",
          blocs: [
            { type: "paragraphe", texte: "Projects such as KOMP and Yayagram show that a technology is adopted when it is built into a simple, familiar object. Our approach: generative AI, a familiar object and minimal interaction." },
            {
              type: "cartes",
              elements: [
                { titre: "The Teller", badge: "Prototyped", texte: "GPO 746 telephone: collects life stories and builds a timeline for the family." },
                { titre: "The Tuner", badge: "Concept", texte: "Vintage radio: news and cognitive stimulation." },
                { titre: "The Imprint", badge: "Concept", texte: "Vintage typewriter: prints memories as illustrated stories." },
              ],
            },
          ],
        },
        {
          titre: "How it works",
          blocs: [
            {
              type: "etapes",
              elements: [
                "Pick up the handset: the conversation starts automatically.",
                "The AI asks questions about the person's life: memories, anecdotes, milestones.",
                "The stories are transcribed, then summarised and stored by the AI.",
                "The family browses the “tree of life”, a timeline in a web app.",
              ],
            },
            { type: "paragraphe", texte: "No learning curve: picking up the phone is all it takes." },
            {
              type: "image",
              image: {
                fichier: "../img/loom/loom-frise",
                largeurs: [680],
                dimensions: [680, 601],
                alt: "Screenshot of the web app: a vertical timeline of memories, each with a title, an approximate year and the beginning of the story.",
                legende: "The memory timeline viewed by the family",
                surFondBlanc: true,
              },
            },
          ],
        },
        {
          titre: "Under the hood",
          blocs: [
            {
              type: "schema",
              blocs: [
                {
                  titre: "Client",
                  sousTitre: "Raspberry Pi 5 inside the phone",
                  lignes: [
                    "Detects when the handset is lifted (hook switch on the GPIO pins)",
                    "Captures the voice through the handset microphone",
                    "Plays the AI's reply in the earpiece",
                  ],
                },
                {
                  titre: "Server",
                  sousTitre: "Local PC",
                  lignes: [
                    "Speech recognition: Faster-Whisper",
                    "Language model: Ollama + Mistral",
                    "Speech synthesis: Kokoro",
                    "Web app: timeline + SQLite",
                  ],
                },
              ],
              liaisons: ["WebSocket"],
            },
            { type: "paragraphe", texte: "All processing stays local: no data is sent to the cloud, which protects privacy." },
            {
              type: "image",
              image: {
                fichier: "../img/loom/loom-interieur",
                largeurs: [331],
                dimensions: [331, 589],
                alt: "The phone opened up: the Raspberry Pi 5 in its case, the handset cables and an orange mounting part.",
                legende: "Inside The Teller",
                surFondBlanc: true,
              },
            },
          ],
        },
        {
          titre: "Testing and research",
          blocs: [
            { type: "paragraphe", texte: "The prototype was tested with elderly people." },
            {
              type: "cartes",
              elements: [
                {
                  titre: "Positive feedback",
                  liste: [
                    "Using the handset felt intuitive and practical",
                    "The AI's questions guide the conversation naturally",
                    "The idea of a familiar object was well received",
                    "Sharing memories remotely with grandchildren was appreciated",
                  ],
                },
                {
                  titre: "Reservations",
                  liste: [
                    "Risk of replacing real interactions with grandchildren",
                    "The web app design needs improvement",
                    "Long-term daily use not verified",
                  ],
                },
              ],
            },
            { type: "paragraphe", texte: "We also replicated the study by Pradhan et al. (2020) on older adults and Alexa: 5 seniors in France, in 15 to 20-minute sessions (discussion, demonstration, guided test, free test, feedback)." },
            {
              type: "liste",
              elements: [
                "Confirmed: voice feels simpler than smartphone menus, and looking up information is the most spontaneous use.",
                "New: difficulty knowing what to ask without guidance, distrust of the synthetic voice.",
                "Limitation: short sessions, so no conclusion can be drawn about long-term adoption.",
              ],
            },
          ],
        },
        {
          titre: "Takeaways",
          blocs: [
            {
              type: "cartes",
              elements: [
                {
                  titre: "Strengths",
                  liste: [
                    "End-to-end working prototype",
                    "Interaction with nothing to learn",
                    "Privacy: local processing",
                    "Social value",
                  ],
                },
                {
                  titre: "Limitations",
                  liste: [
                    "Depends on a nearby PC: not yet standalone",
                    "Language model latency can break the rhythm of the conversation",
                    "The voice still sounds a little robotic",
                    "The web app design could be improved",
                  ],
                },
                {
                  titre: "Next steps",
                  liste: [
                    "Human-computer interaction studies: retro phone versus smart speaker, styles of AI follow-up questions",
                    "A 3-month study in nursing homes on cognitive and social impact",
                    "A standalone Teller, with a pilot planned in 3 nursing homes",
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
    badge: "In progress · until Jan. 2027",
    phrase: "A prototype that reads a patient's intraoral scan and shows, tooth by tooth, where to reduce and where to build up.",
    fiche: [
      { libelle: "Context", valeur: "5th-year innovation project, IFT / ESILV · Oct. 2026 – Jan. 2027 · with Pierre, a dental surgery student" },
      { libelle: "Role", valeur: "Design, state of the art, prototype development (3D, interface, machine learning), evaluation protocol" },
      { libelle: "Planned tools", valeur: "Python, PyVista / VTK, Open3D, NumPy / SciPy, PyTorch" },
      { libelle: "Status", valeur: "Minimal demo working (November 2026). The project ends in January 2027" },
    ],
    image: {
      fichier: "../img/occlumap/occlumap-maquette",
      largeurs: [800, 1600],
      dimensions: [1672, 941],
      alt: "Mock-up of the OccluMap interface: top view of a dental arch, teeth to reduce in red and teeth to build up in blue, settings on the left and a per-tooth table below.",
      // Règle du projet : toujours indiquer que la maquette est générée par IA
      legende: "AI-generated concept mock-up, fictitious values",
      surFondBlanc: false,
    },
    liens: [],
    detail: {
      mention: "Research prototype: it is not a medical device and is not used for clinical decisions.",
      sections: [
        {
          titre: "The problem",
          blocs: [
            { type: "paragraphe", texte: "When a patient has worn teeth, or teeth that have over-erupted because the opposing tooth is missing, the dentist has to restore a regular occlusal plane: the surface where the upper and lower teeth meet." },
            { type: "paragraphe", texte: "To decide which teeth to reduce and which to build up, they often order a model of the future teeth from the dental technician: the wax-up. This back-and-forth takes time, and the decision relies heavily on the practitioner's eye." },
          ],
        },
        {
          titre: "The solution",
          blocs: [
            {
              type: "etapes",
              elements: [
                "Input: two STL files exported by an intraoral scanner (upper and lower arches, in occlusion).",
                "Detection of the cusps, the tips of the teeth, by machine learning, with manual selection as a fallback.",
                "Robust fitting of a reference surface, the Monson sphere: teeth that are too high or too low are left out of the calculation instead of skewing it.",
                "Signed map: distance from each point of the tooth surface to the reference.",
                "Output: colour 3D view (red = reduce, blue = build up), per-tooth table and live settings.",
              ],
            },
            { type: "paragraphe", texte: "All processing is local: no scan ever leaves the computer, because this is health data." },
            {
              type: "image",
              image: {
                fichier: "../img/occlumap/occlumap-maquette",
                largeurs: [800, 1600],
                dimensions: [1672, 941],
                alt: "Mock-up of the OccluMap interface: top view of a dental arch, teeth to reduce in red and teeth to build up in blue, settings on the left and a per-tooth table below.",
                legende: "AI-generated concept mock-up, fictitious values",
                surFondBlanc: false,
              },
            },
            { type: "paragraphe", texte: "Long-term vision: display this analysis directly while the impression is being taken, just as intraoral cameras already display the contact map between the arches." },
            {
              type: "image",
              image: {
                fichier: "../img/occlumap/occlumap-carte-contacts",
                largeurs: [530],
                dimensions: [530, 295],
                alt: "Intraoral scanner software: a 3D dental arch, with areas coloured from blue to red where the upper and lower teeth touch.",
                legende: "Contact map between the arches in an intraoral scanner's software (screenshot by a dental surgeon)",
                surFondBlanc: true,
              },
            },
          ],
        },
        {
          titre: "What makes it original",
          blocs: [
            { type: "paragraphe", texte: "The building blocks exist separately in the literature and in commercial products. OccluMap combines them: from the STL file alone, before the wax-up, robust to worn teeth, with a decision for each tooth. The tool will then be compared with practitioners' judgement, and the agreement between practitioners will be measured, which no study we found has measured." },
            {
              type: "image",
              image: {
                fichier: "../img/occlumap/occlumap-etat-de-l-art",
                largeurs: [800, 1160],
                dimensions: [1160, 752],
                alt: "Miro board of the state of the art: 25 papers, patents and products grouped into 5 themes around the project.",
                legende: "State of the art: 25 works, papers and patents, mapped into 5 themes",
                surFondBlanc: false,
              },
            },
          ],
        },
        {
          titre: "Research",
          blocs: [
            { type: "paragraphe", texte: "Question: does the tool identify the teeth to reduce or build up as well as a practitioner does?" },
            { type: "paragraphe", texte: "Planned method: a pilot study on about twenty anonymised cases. The clinical partner and 2 or 3 practitioners classify each tooth without seeing the map; the practitioners are then compared with each other and with the tool (agreement rate, kappa coefficient). Goal: a paper co-authored with the clinical partner." },
            {
              type: "image",
              image: {
                fichier: "../img/occlumap/occlumap-scan-wen-2025",
                largeurs: [800, 968],
                dimensions: [968, 690],
                alt: "Digital model from an intraoral scan: both dental arches seen from above, from the front and from the side.",
                // Licence CC BY 4.0 : citer la source (règle du projet)
                legende: "Digital model from an intraoral scan. Figure from Wen et al., Clin Exp Dent Res 2025, CC BY 4.0 licence",
                surFondBlanc: false,
              },
            },
            {
              type: "sources",
              elements: [
                { texte: "Wen et al. 2025, Clin Exp Dent Res: Monson sphere computed from intraoral scans", url: "https://doi.org/10.1002/cre2.70063" },
                { texte: "Ma et al. 2026, AJODO: automatic detection of dental landmarks using deep learning", url: "https://doi.org/10.1016/j.ajodo.2025.09.009" },
              ],
            },
          ],
        },
        {
          titre: "Schedule",
          blocs: [
            {
              type: "etapes",
              elements: [
                { titre: "October 2026", texte: "Environment, data, STL display, manual cusp selection, sphere fitting" },
                { titre: "20 November 2026", texte: "Milestone reached: minimal demo working (signed map and per-tooth table)" },
                { titre: "December 2026", texte: "Interactive settings, “imposed reference” mode, automatic cusp detection" },
                { titre: "January 2027", texte: "Evaluation with practitioners, analysis, final presentation" },
              ],
            },
          ],
        },
        {
          titre: "My role",
          blocs: [
            { type: "paragraphe", texte: "Project design, state of the art, prototype development (3D geometry, interface, machine learning), evaluation protocol and project management. I build on my internship at SEGULA Technologies: a Python desktop application, approved by the client, under strict data confidentiality constraints." },
            { type: "paragraphe", texte: "The project is carried out with Pierre, a final-year dental surgery student at Sorbonne Université, in clinical training at Charles-Foix hospital. We had wanted to work on a project together since our health studies: I did a year of PASS (first-year health studies) before engineering school." },
            {
              type: "liste",
              elements: [
                "3D data processing",
                "Machine learning applied to healthcare",
                "Desktop application development",
                "Research approach: state of the art, protocol, evaluation",
                "Collaboration with a clinical partner",
                "Health data protection",
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
    badge: "Kickstarter · 337% funded",
    phrase: "A modular acrylic lampshade, designed as a team and funded on Kickstarter.",
    contexte: "Quickstarter course · 2026 · team of 4",
    fiche: [
      { libelle: "Context", valeur: "“Quickstarter” course · 2026 · team of 4 students" },
      { libelle: "Role", valeur: "Contributed to every task: product design, campaign visuals, copywriting, backer management, logistics" },
      { libelle: "Skills", valeur: "CAD, laser cutting, product design, communication, project management, pricing, shipping logistics" },
      { libelle: "Result", valeur: "Campaign 337% funded: €506 raised from 16 backers" },
    ],
    image: {
      fichier: "../img/petale/petale-lampe",
      largeurs: [800, 1600],
      dimensions: [5202, 3464],
      alt: "The Pétale lamp switched on, on a wooden worktop: five orange acrylic petals arranged in a star around a warm-light bulb.",
      legende: null,
      surFondBlanc: false,
    },
    liens: [
      { texte: "See the Kickstarter campaign", url: "https://www.kickstarter.com/projects/petale/quickstarter-petale" },
    ],
    detail: {
      mention: null,
      sections: [
        {
          titre: "The product",
          blocs: [
            { type: "paragraphe", texte: "A lampshade made of acrylic modules that you assemble as you like to give the lamp the shape you want." },
            {
              type: "liste",
              elements: [
                "Compatible with standard E14 sockets fitted with a screw ring, and with sockets less than 29 mm in diameter.",
                "Designed for an LED bulb, ideally warm white (about 2000 K): halogen or incandescent bulbs get too hot for acrylic.",
                "Can be wall-mounted (screws not included).",
              ],
            },
            {
              type: "image",
              image: {
                fichier: "../img/petale/petale-pieces",
                largeurs: [800, 856],
                dimensions: [856, 445],
                alt: "The lampshade parts laid flat: five orange acrylic petals, clear mounting parts, screws, and two bulbs drawn in dotted lines, pointed out by red arrows.",
                legende: "The parts of the acrylic lampshade",
                surFondBlanc: false,
              },
            },
            {
              type: "image",
              image: {
                fichier: "../img/petale/petale-lampe-2",
                largeurs: [800, 1600],
                dimensions: [5202, 3464],
                alt: "The Pétale lamp switched on in a dimly lit living room, on a cabinet next to a hi-fi amplifier.",
                legende: "The lamp in a real setting",
                surFondBlanc: false,
              },
            },
          ],
        },
        {
          titre: "The Kickstarter campaign",
          blocs: [
            { type: "paragraphe", texte: "Launched in the Quickstarter format: a product made quickly, a short 20-day campaign and a small goal. Category: Product Design." },
            {
              type: "chiffres",
              elements: [
                { valeur: "€506", texte: "raised against a €150 goal", source: "Kickstarter" },
                { valeur: "337%", texte: "of the goal reached", source: "Kickstarter" },
                { valeur: "16", texte: "backers", source: "Kickstarter" },
                { valeur: "20", texte: "days of campaign, from 26 March to 15 April 2026", source: "Kickstarter" },
              ],
            },
            { type: "paragraphe", texte: "Main reward: the lamp at €19, excluding shipping. Delivery planned from late November to December 2026, with after-sales support (replacement parts, or a complete lamp if needed)." },
          ],
        },
        {
          titre: "My role",
          blocs: [
            { type: "paragraphe", texte: "Within a team of 4 students, I contributed to every task:" },
            {
              type: "liste",
              elements: [
                "Product design",
                "Campaign visuals",
                "Copywriting",
                "Backer management",
                "Shipping logistics",
              ],
            },
          ],
        },
      ],
    },
  },

  // ===================================================================== AICG
  {
    id: "aicg",
    categorie: "secondaire",
    visible: true,
    titre: "AICG projects",
    badge: "3 projects",
    phrase: "Three AI and computer graphics applications that run entirely in the browser.",
    contexte: "Artificial Intelligence and Computer Graphics course · Nov. 2025 – Jan. 2026",
    fiche: [
      { libelle: "Course", valeur: "Artificial Intelligence and Computer Graphics (AICG), Creative Technologies major at ESILV" },
      { libelle: "Period", valeur: "November 2025 – January 2026" },
      { libelle: "Technologies", valeur: "Python, TinyGrad, WebGPU, WGSL, JavaScript, PDF.js, Transformers.js, WebLLM" },
    ],
    // Pas d'image (règle du projet) : la démo sert d'illustration
    image: null,
    demo: {
      titre: "ClassDiGit",
      adresse: "alexhagt.github.io/ClassDiGit",
      url: "https://alexhagt.github.io/ClassDiGit/",
      code: "https://github.com/AlexHAGT/ClassDiGit",
      consigne: null,
      texte: "Draw a digit: two neural networks recognise it.",
      note: "WebGPU demo: works on a recent version of Chrome or Edge, on a computer.",
    },
    liens: [],
    detail: {
      mention: "WebGPU demo: works on a recent version of Chrome or Edge, on a computer.",
      sommaire: true,
      sections: [
        {
          titre: "ClassDiGit",
          sousTitre: "November 2025",
          blocs: [
            { type: "paragraphe", texte: "You draw a digit with the mouse, and two neural networks recognise it instantly, right in the browser." },
            {
              type: "chiffres",
              elements: [
                { valeur: "96.78%", texte: "accuracy on the test set for the multilayer perceptron (MLP)" },
                { valeur: "99.09%", texte: "accuracy on the test set for the convolutional neural network (CNN)" },
              ],
            },
            {
              type: "liste",
              elements: [
                "Trained both models on the MNIST dataset with the TinyGrad library.",
                "Hyperparameter tuning (learning rate, batch size, data augmentation…): 8 runs for the MLP, 9 for the CNN.",
                "Exported the models and ran them on the visitor's graphics card via WebGPU.",
                "Web interface: drawing area, eraser, switch between the two models, probability for each digit.",
              ],
            },
            { type: "paragraphe", texte: "A complete machine learning pipeline, from training the model to using it in an application, with no server. Technologies: Python, TinyGrad, WebGPU, JavaScript, HTML, Tailwind CSS." },
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
          sousTitre: "December 2025",
          blocs: [
            { type: "paragraphe", texte: "A small 3D scene (checkerboard floor, sphere and cube) computed in real time by the graphics card, whose objects you adjust with sliders." },
            {
              type: "liste",
              elements: [
                "Ray marching rendering with signed distance functions (SDF), written in a WGSL shader.",
                "Diffuse lighting, shadows, fog and gamma correction.",
                "Real-time adjustment of the position, size and colour of the objects, without recompiling the shader.",
                "Mouse-controlled camera: rotate with the left button, zoom with the scroll wheel.",
              ],
            },
            { type: "paragraphe", texte: "Foundations in 3D computer graphics and GPU programming. Technologies: WebGPU, WGSL, JavaScript, HTML." },
            {
              type: "demo",
              titre: "Ray marching WebGPU",
              url: "https://alexhagt.github.io/Projet-CG-WebGPU-AH-/",
              code: "https://github.com/AlexHAGT/Projet-CG-WebGPU-AH-",
              consigne: "To start the demo: select the “Ray Marching – Basic” shader, then click “Compile” once.",
            },
          ],
        },
        {
          titre: "RAG Lit Reviewer",
          sousTitre: "January 2026",
          blocs: [
            { type: "paragraphe", texte: "You drop scientific papers in PDF format, and a local language model turns them into a structured literature review, without any data leaving the browser." },
            {
              type: "liste",
              elements: [
                "RAG pipeline (retrieval-augmented generation) entirely in the browser, with no server.",
                "PDF import by drag and drop, text extraction with PDF.js, splitting into passages.",
                "Semantic search: embeddings computed with Transformers.js (all-MiniLM-L6-v2), cosine similarity.",
                "Generation with a language model running locally via WebLLM, in a “literature review” mode (introduction, themes, limitations, conclusion), restricted to the retrieved passages.",
              ],
            },
            { type: "paragraphe", texte: "A current generative AI architecture, running locally for privacy. Technologies: JavaScript, PDF.js, Transformers.js, WebLLM, WebGPU." },
            {
              type: "demo",
              titre: "RAG Lit Reviewer",
              url: "https://alexhagt.github.io/rag-lit-reviewer/",
              code: "https://github.com/AlexHAGT/rag-lit-reviewer",
              consigne: "The first launch is slow: the language model is downloaded into the browser.",
            },
          ],
        },
      ],
    },
  },

  // ===================================================================== Stage SEGULA
  // Caché (visible: false), comme dans projets.fr.js
  {
    id: "stage-segula",
    categorie: "secondaire",
    visible: false,
    titre: "Project knowledge-management application",
    badge: "Internship · SEGULA Technologies",
    phrase: "A desktop, then web, application for a validation team working on connected embedded systems, on assignment at Stellantis.",
    contexte: "4th-year internship · May – Aug. 2026",
    fiche: [
      { libelle: "Context", valeur: "Software development engineering internship, SEGULA Technologies, assignment at Stellantis · May – Aug. 2026 · Trappes / Poissy" },
      { libelle: "Tools", valeur: "Python, Flask, PySide6 (Qt), REST APIs, HTML / CSS, Git" },
      { libelle: "Result", valeur: "Desktop application approved by the client, then ported to a web application" },
    ],
    image: null,
    visuelManquant: "SEGULA internship image (confidential project)",
    liens: [],
    detail: {
      mention: null,
      sections: [
        {
          titre: "The assignment",
          blocs: [
            { type: "paragraphe", texte: "Design and development of a project knowledge-management application for a team validating connected embedded systems (remote firmware updates, connected applications)." },
            {
              type: "liste",
              elements: [
                "Integration of the internal tools Teresa and JIRA via REST APIs, under strict confidentiality constraints.",
                "PySide6 desktop application approved by the client, then ported to a Flask web application thanks to an architecture separating business logic from display.",
                "Incremental development, progress reports, documentation and handover.",
              ],
            },
          ],
        },
      ],
    },
  },

];
