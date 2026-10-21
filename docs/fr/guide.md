# Enregistrer et récupérer des fichiers sur cassette

[Présentation](README.md) · [Guide détaillé en anglais](../getting-started.md)

## Enregistrer

Reliez LINE OUT stéréo de l'ordinateur ou de l'interface à LINE IN de la platine. Pour relire la cassette, reliez LINE OUT de la platine à LINE IN de l'interface. Préservez les deux canaux. Une entrée micro mono ne remplace pas une entrée ligne stéréo.

Commencez par un petit fichier, FSK 300, la bonne durée par face et le nombre de copies souhaité. Générez le WAV. Dans Studio, choisissez la sortie et réglez le niveau sur la platine avec la tonalité de calibration, sans écrêtage. Le niveau logiciel démarre à 100 % mais reste réglable. Passez l'amorce non magnétique, appuyez sur REC et lancez le compte à rebours. TapeBytes émet l'audio, il ne commande pas les touches de la platine.

![Studio avec WAV prêt et calibration, interface anglaise](../assets/studio.jpg)

## Récupérer

Rembobinez, sélectionnez l'entrée dans Décoder et activez le moniteur. Vérifiez Stereo/Mono et Signal de référence selon l'enregistrement. La détection automatique utilise le nombre de canaux déclaré, pas le contenu sonore. Démarrez la capture puis PLAY. Arrêtez et décodez, ou utilisez Auto stop.

Vous pouvez aussi importer un WAV non traité enregistré dans Audacity. Évitez MP3, réduction de bruit et mélange mono. Téléchargez les fichiers validés tout en conservant les originaux.

## Enregistrements successifs

Auto stop attend une seconde par défaut après disparition du signal. Pour cinq signaux séparés par deux secondes, choisissez cinq secondes ou désactivez-le. Les archives complètes des formats à blocs actuels seront récupérées ensemble. La capture ne redémarre pas automatiquement et les archives endommagées peuvent manquer.

## Problèmes courants

- **Craquements :** vérifiez fréquence d'échantillonnage et horloge. Sur macOS, utilisez Configuration audio et MIDI ; essayez entrée et sortie à 48 kHz puis réactivez l'entrée. Pilotes, USB et écrêtage peuvent aussi intervenir.
- **Aucun signal :** vérifiez entrée, câbles, PLAY et niveaux ; testez le WAV original.
- **Référence invalide :** le pilote doit être séparé à droite. Désactivez l'option pour un enregistrement sans référence.
- **Un seul canal :** vérifiez ce que l'interface expose au navigateur. Les données stéréo en copie unique peuvent nécessiter les deux canaux.
- **Playback différent :** le moniteur reproduit seulement la gauche, tandis que la capture stéréo conserve L/R.
- **Arrêt prématuré :** augmentez le délai. Le souffle peut au contraire empêcher l'arrêt automatique.
- **Erreur CRC/SHA :** ne l'ignorez pas ; réessayez la capture ou enregistrez plus lentement, avec de meilleurs niveaux ou davantage de copies.

Pour signaler un problème, indiquez navigateur, système, platine, interface, fréquence, mode et copies. [Dépannage complet en anglais](../troubleshooting.md).
