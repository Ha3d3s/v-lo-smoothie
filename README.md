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

## Réglages (dans l'appli, bouton « ⚙ Réglages »)

Toutes les infos de connexion (capteur, batterie, synchronisation) sont
regroupées en haut du panneau de réglages plutôt que d'encombrer l'écran
principal en permanence.

- Nom de l'événement et objectif en kilomètres (converti automatiquement en nombre de smoothies).
- Distance à parcourir pour un smoothie.
- Circonférence de roue et mètres parcourus par coup de pédale (calibrage du vélo).
- **Affichage & son (propre à cette tablette)** :
  - *Mode plein soleil* : fond noir, contraste renforcé, plus lisible en extérieur en plein jour.
  - *Taille du chiffre principal* : Normal / Grand / Très grand, pour une tablette vue à distance.
  - *Bip sonore* à la fin de chaque smoothie (désactivable).
  Ces trois réglages s'appliquent immédiatement et restent propres à cette tablette (jamais synchronisés).
- **Logo sur le gobelet** : ajoute une image PNG ou JPG (recadrée en rond automatiquement) qui s'affiche sur le verre à l'écran — reste stockée uniquement sur cette tablette, jamais envoyée sur Internet. Bouton « Retirer » pour l'enlever.
- **Mode démo** : simule un pédalage pour tester l'affichage sans capteur. Le bouton devient « Arrêter le mode démo » une fois activé.
- **Reprise sur une nouvelle tablette** : si la tablette en cours tombe en panne ou à plat batterie et qu'aucune synchronisation (Firebase) n'est configurée, ce champ permet d'ajouter manuellement, sur la tablette de remplacement, la distance déjà parcourue avant la coupure (en km). Elle s'additionne au total déjà affiché sur cette tablette — pense à réinitialiser l'événement d'abord si la nouvelle tablette a déjà ses propres chiffres, pour ne pas compter deux fois.
- Réinitialisation par smoothie ou pour tout l'événement.

Sur l'écran principal, un bouton discret sous la barre de progression
(« Quelqu'un s'arrête sans finir ? ») permet d'abandonner le smoothie en
cours à tout moment : la distance déjà parcourue reste comptée dans le
total de l'événement, seule la barre du smoothie en cours repart de zéro.

**Pédalage libre / distance bonus** : un second bouton (« 🚴 Pédalage
libre (sans smoothie) ») bascule le vélo dans un mode où pédaler ajoute
des kilomètres au total de l'événement sans viser un smoothie précis —
pratique pour quelqu'un qui veut juste pédaler, ou pour garder le compteur
qui tourne quand il n'y a plus de gobelets. Un compteur dédié (« Distance
bonus ») l'affiche séparément dans les statistiques du bas. Depuis l'écran
« Smoothie prêt ! », le bouton « 🚴 Continuer à pédaler (distance bonus) »
fait directement basculer dans ce mode plutôt que de relancer un nouveau
smoothie.

À l'écran « Smoothie prêt ! », l'appli affiche en plus le nombre de
smoothies réalisés par rapport à l'objectif de l'événement, ainsi qu'une
phrase encourageante sur le sport et l'alimentation, tirée au hasard parmi
plusieurs. Elle se relance automatiquement au bout de 30 secondes si
personne n'a touché à l'écran (un compte à rebours l'indique).

Si le Bluetooth se coupe pendant l'événement (capteur hors de portée un
instant, pile qui flanche), l'appli retente automatiquement la connexion
au même capteur en arrière-plan — pas besoin de recliquer sur « Connecter
le capteur ». Et si personne ne pédale depuis 15 secondes, un léger « mode
attraction » anime les fruits pour attirer l'œil des passants.

## Licence

MIT — voir [LICENSE](LICENSE).
