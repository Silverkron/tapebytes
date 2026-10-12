<!-- Language: fr -->

Source: https://tapebytes.lucasciacca.com/fr/decode/

Récupérer des fichiers depuis une cassette — TapeBytes

Récupérez des fichiers TapeBytes depuis un WAV enregistré ou une entrée stéréo, avec correction de vitesse et vérifications CRC32 et SHA-256.

03 / DU SON AUX FICHIERS

# Récupérer des fichiers depuis une cassette.

Récupérez les fichiers d’un WAV TapeBytes ou de votre lecteur de cassettes. Tout se passe dans le navigateur.

✓ Tout reste sur cet appareil CRC32 + SHA-256

STEREO Utiliser la référence du canal droit

Gauche : données · Droite : référence 3 kHz

01 / ENTRÉE CASSETTE

## Depuis votre platine cassette

PCM

Le WAV conserve les deux canaux d’une entrée stéréo, même sans correction par référence. Reliez L à l’entrée 1 et R à l’entrée 2. Monitor et Playback utilisent uniquement L.

Entrée audio

Entrée audio en direct −∞ dBFS

Spectre des fréquences PCM / CH 1

Vérifier l’entrée et les filtres

Playback

Choisissez une entrée et activez le moniteur. La capture démarre séparément.

À propos de Playback

Écoutez sur la sortie par défaut. Désactivé au départ ; utilisez un casque avec un micro. S’arrête en quittant la page.

L’autorisation audio est demandée au besoin. La capture continue jusqu’à l’arrêt et utilise la mémoire du navigateur.

OU / FICHIER WAV

## Depuis un fichier audio

Déjà un enregistrement ? Ouvrez le WAV TapeBytes pour récupérer les fichiers.

Choisir un fichier WAV Détection automatique du profil · canal gauche

Générez un WAV dans Encoder pour le vérifier ici sans enregistrer de cassette.

Vérifiés avant le téléchargement Les fichiers récupérés apparaîtront ci-dessous après tous les contrôles d’intégrité.

✓ CRC32 + SHA-256

Réglages de récupération et détails du format

Activé par défaut pour les enregistrements stéréo. Désactivez uniquement pour les anciens enregistrements sans référence. L’audio capturé est conservé ; Playback écoute le canal gauche. L’audio manquant n’est pas reconstruit.

Gardez les canaux gauche et droit séparés. Alignez les fréquences d’échantillonnage d’entrée et de sortie et évitez de mélanger l’écoute directe à la lecture. Avec la Fast Track Pro, réglez Mix sur PB pendant l’enregistrement.

Corriger automatiquement l’écart constant de vitesse

Utilise le signal pilote initial ; testé jusqu’à ±5% d’écart. Ne suit pas en continu le pleurage et le scintillement. Les fichiers ne sont proposés que si tous les blocs, le CRC et les empreintes sont valides.

Pour corriger la vitesse, le pilote initial doit être dans les 60 premières secondes. Les blocs TVBLK003 peuvent être trouvés après. TVFSK001/002 restent lisibles.

Fichiers récupérés VÉRIFIÉ
