<!-- Language: fr -->

Source: https://tapebytes.lucasciacca.com/fr/decode/

Récupérer des fichiers depuis une cassette — TapeBytes

Récupérez des fichiers TapeBytes depuis un WAV enregistré ou une entrée stéréo, avec correction de vitesse et vérifications CRC32 et SHA-256.

03 / DU SON AUX FICHIERS

# Récupérer des fichiers depuis une cassette.

Récupérez les fichiers d’un WAV TapeBytes ou de votre lecteur de cassettes. Tout se passe dans le navigateur.

✓ Tout reste sur cet appareil CRC32 + SHA-256

Entrée audio

Playback

Choisissez une entrée et activez le moniteur. La capture démarre séparément.

Canaux audio Stéréo

Mono

Stéréo/Mono suit le nombre de canaux déclaré lors de l’activation de l’entrée. Vous pouvez le modifier manuellement. Le contenu audio et la présence du signal de référence ne sont pas détectés.

Signal de référence

Référence activée : données à gauche, référence à 3 kHz à droite. Désactivez-la pour utiliser les deux canaux pour les données. Avec deux copies, les blocs changent de canal à des moments différents ; la capacité est proche de celle d’un canal de données.

Branchements et fonctionnement

Entrée mono : connectez un canal isolé, jamais la somme G + D. Les données stéréo ×1 nécessitent les deux canaux ; avec ×2 chaque canal complet contient tous les blocs. La correction par référence nécessite la stéréo. Le canal gauche peut être lu sans correction. Le nouveau mode de données stéréo doit encore être testé sur la platine.

01 / ENTRÉE CASSETTE

## Depuis votre platine cassette

STEREO / PCM

L · Données −∞ dBFS

Spectre des fréquences 0 — 8 kHz

R · Référence −∞ dBFS

Spectre des fréquences 0 — 8 kHz

R · Référence Fréquence de référence mesurée — Hz

Activez l’entrée pour mesurer la référence.

Auto stop

ⓘ

Après au moins 0,25 s au-dessus de −36 dBFS, arrête et décode lorsque tous les canaux capturés restent sous −42 dBFS pendant le délai choisi (1 s par défaut). Le silence initial ne le déclenche pas. Un bruit élevé peut empêcher l’arrêt ; utilisez Arrêter et décoder.

Délai sans signal

L’autorisation audio est demandée au besoin. La capture continue jusqu’à l’arrêt et utilise la mémoire du navigateur.

OU / FICHIER WAV

## Depuis un fichier audio

Déjà un enregistrement ? Ouvrez le WAV TapeBytes pour récupérer les fichiers.

Choisir un fichier WAV Détection automatique du profil · canaux audio séparés

Générez un WAV dans Encoder pour le vérifier ici sans enregistrer de cassette.

## Vérifiés avant le téléchargement

Les fichiers récupérés apparaîtront ci-dessous après tous les contrôles d’intégrité.

✓ CRC32 + SHA-256

Réglages de récupération et détails du format

Le WAV conserve les deux canaux d’une entrée stéréo, même sans correction par référence. Reliez L à l’entrée 1 et R à l’entrée 2. Le visualiseur affiche les deux canaux ; Playback écoute uniquement L.

Activée par défaut pour données + référence. Désactivez-la pour les données stéréo ou les anciennes bandes mono. Le son est conservé ; Playback écoute uniquement le canal gauche.

Vérifier l’entrée et les filtres

À propos de Playback

Écoutez sur la sortie par défaut. Désactivé au départ ; utilisez un casque avec un micro. S’arrête en quittant la page.

Gardez les canaux gauche et droit séparés. Alignez les fréquences d’échantillonnage d’entrée et de sortie et évitez de mélanger l’écoute directe à la lecture. Avec la Fast Track Pro, réglez Mix sur PB pendant l’enregistrement.

Corriger automatiquement l’écart constant de vitesse

Utilise le signal pilote initial ; testé jusqu’à ±5% d’écart. Ne suit pas en continu le pleurage et le scintillement. Les fichiers ne sont proposés que si tous les blocs, le CRC et les empreintes sont valides.

Pour corriger la vitesse, le pilote initial doit être dans les 60 premières secondes. Les blocs TVBLK003 peuvent être trouvés après. TVFSK001/002 restent lisibles.

Fichiers récupérés VÉRIFIÉ
