// ─────────────────────────────────────────────────────────────────
// Configuration Firebase — à remplir avec TON propre projet gratuit
// pour que plusieurs tablettes partagent les mêmes totaux.
//
// Comment obtenir ces valeurs (5 minutes, gratuit) :
//   1. https://console.firebase.google.com → « Ajouter un projet »
//   2. Dans le projet : Firestore Database → Créer une base
//      → mode production → région Europe (europe-west, par ex.)
//   3. Paramètres du projet (roue crantée) → Général → Vos applications
//      → Ajouter une application → Web (</>) → donne-lui un nom
//      → PAS besoin de Firebase Hosting → Firebase te montre un objet
//        firebaseConfig : copie chaque valeur ci-dessous.
//   4. Firestore Database → onglet Règles → colle le contenu de
//      firestore.rules.txt fourni dans ce dépôt → Publier.
//
// Tant que apiKey vaut "REMPLACE_MOI", l'appli reste en mode local
// (chaque tablette fonctionne seule) — rien ne casse si tu ne remplis
// pas ce fichier.
// ─────────────────────────────────────────────────────────────────

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDMBmRqeCjhFvk5KLU3ToAIr0UxAOah79s",
  authDomain: "velo-smoothie.firebaseapp.com",
  projectId: "velo-smoothie",
  storageBucket: "velo-smoothie.firebasestorage.app",
  messagingSenderId: "615891701926",
  appId: "1:615891701926:web:dcc8c6d6853c37e4d1e467"
};

// Identifiant de CET événement dans la base. Change-le si tu réutilises
// un jour le même projet Firebase pour une autre animation, pour ne pas
// mélanger les totaux des deux événements. Lettres, chiffres, tirets.
window.FIREBASE_EVENT_CODE = "CMS-verviers-2026";
