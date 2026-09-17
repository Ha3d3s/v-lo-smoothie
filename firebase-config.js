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
  apiKey: "REMPLACE_MOI",
  authDomain: "REMPLACE_MOI.firebaseapp.com",
  projectId: "REMPLACE_MOI",
  storageBucket: "REMPLACE_MOI.appspot.com",
  messagingSenderId: "REMPLACE_MOI",
  appId: "REMPLACE_MOI"
};

// Identifiant de CET événement dans la base. Change-le si tu réutilises
// un jour le même projet Firebase pour une autre animation, pour ne pas
// mélanger les totaux des deux événements. Lettres, chiffres, tirets.
window.FIREBASE_EVENT_CODE = "relais-verviers-2026";
