# 🥤 Vélo smoothie

Compteur de distance pour un vélo presse-fruit, piloté par un capteur de
cadence Bluetooth (profil standard **Cycling Speed and Cadence**, compatible
MoveFit et la plupart des capteurs vendus pour Wahoo/Zwift/Garmin). Affiche
en direct : un verre qui se remplit, « votre smoothie est prêt dans X m »,
la cadence, la vitesse estimée, et la progression totale sur l'objectif de
l'événement (ex. *Relais Pour La Vie de Verviers*).

## Installer / publier ce dépôt

Aucune compilation nécessaire, c'est une page web autonome.

1. Crée un dépôt GitHub et mets-y ces fichiers (`index.html`, `manifest.webmanifest`, `service-worker.js`, `icons/`).
2. Dans les paramètres du dépôt, active **Settings → Pages → Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. GitHub te donne une adresse du type `https://<ton-compte>.github.io/<ton-depot>/`. C'est ton lien d'événement — celui à ouvrir sur chaque tablette.

## Installer l'appli sur une tablette (icône + plein écran)

- **Android / Chrome ou Edge** : ouvre le lien, menu ⋮ → *Ajouter à l'écran d'accueil* (ou une bannière d'installation apparaît automatiquement). L'icône du verre + roue de vélo s'ajoute, et l'app s'ouvre en plein écran, sans barre d'adresse.
- **Windows / macOS / Linux (Chrome, Edge)** : une icône d'installation ⊕ apparaît dans la barre d'adresse.
- **iPad (Safari)** : possible en tant qu'écran d'affichage (Partager → *Sur l'écran d'accueil*), mais **le Bluetooth ne fonctionnera pas** — Safari n'implémente pas le Bluetooth Web. Réserve l'iPad à l'écran spectateurs, pas au pilotage du capteur.

## Capteur

- Nécessite Chrome ou Edge (Bluetooth Web) : Android, Windows, macOS ou Linux. Pas de Safari/iOS.
- Une seule tablette à la fois peut être connectée en Bluetooth au capteur (limitation matérielle des capteurs bon marché). Les autres tablettes affichent les mêmes chiffres sans Bluetooth — voir ci-dessous.

## Synchroniser plusieurs tablettes (écran cycliste + écran spectateurs)

La version publiée sur **claude.ai** (via l'outil Artifact) synchronise
automatiquement plusieurs tablettes grâce au stockage partagé de la
plateforme — rien à configurer là-bas.

**Cette version GitHub inclut Firebase en repli**, pour retrouver la même
synchronisation une fois auto-hébergé. Tant que tu ne configures rien,
chaque tablette fonctionne simplement seule (`localStorage`) — rien ne
casse. Pour activer le partage entre tablettes :

1. Va sur [console.firebase.google.com](https://console.firebase.google.com), crée un projet (gratuit).
2. Dans le projet : **Firestore Database → Créer une base**, mode *production*, région Europe.
3. **Paramètres du projet → Général → Vos applications → Ajouter une application → Web (`</>`)**. Pas besoin de Firebase Hosting. Firebase affiche un objet `firebaseConfig` : copie ses valeurs.
4. Ouvre `firebase-config.js` dans ce dépôt et colle-les à la place des `"REMPLACE_MOI"`. Choisis aussi un `FIREBASE_EVENT_CODE` (un identifiant court pour ton événement).
5. **Firestore Database → onglet Règles** : colle le contenu de `firestore.rules.txt` (fourni dans ce dépôt), puis **Publier**.
6. Commit + push ces deux fichiers modifiés sur GitHub. Recharge la page sur chaque tablette : le badge passe à « Synchronisé avec les autres tablettes (Firebase) ».

C'est gratuit pour ce volume d'usage (le palier gratuit *Spark* de Firebase
autorise largement plus d'écritures qu'un week-end d'animation n'en
génère). Les règles fournies ouvrent en lecture/écriture uniquement le
document de ton événement — pas le reste de la base — mais restent sans
authentification : n'importe qui connaissant ton `FIREBASE_EVENT_CODE`
pourrait modifier le compteur. Adapté à une animation associative, pas à
des données sensibles.

> `firebase-config.js` peut rester dans le dépôt public sans problème :
> ces valeurs identifient le projet, elles ne donnent pas d'accès en
> elles-mêmes — c'est le fichier de règles qui protège les données.

## Réglages (dans l'appli, bouton « Réglages »)

- Nom de l'événement et objectif en kilomètres (converti automatiquement en nombre de smoothies).
- Distance à parcourir pour un smoothie.
- Circonférence de roue et mètres parcourus par coup de pédale (calibrage du vélo).
- Mode démo (simule un pédalage, pour tester sans capteur).
- Réinitialisation par smoothie ou pour tout l'événement.

## Licence

MIT — voir [LICENSE](LICENSE).
