<!-- Language: fr -->

Source: https://tapebytes.lucasciacca.com/fr/guide/

Données sur cassette : capacité et guide — TapeBytes

Découvrez combien de données contient une cassette, le matériel nécessaire et comment enregistrer et récupérer des fichiers avec TapeBytes.

MANUEL / AVANT D’ENREGISTRER

# Comment stocker des données sur cassette audio

Votre premier aller-retour complet

- Dans Encodage, choisissez fichiers, modulation et redondance. La référence droite est activée par défaut.
- Générez le WAV stéréo : données à gauche, référence 3 kHz à droite. L’introduction parlée est facultative.
- Dans Studio, reliez les deux sorties à la platine, réglez le niveau, appuyez sur REC puis lancez le compte à rebours.
- Rembobinez et capturez les deux canaux dans Décodage, ou importez un WAV stéréo. Gardez la correction activée et téléchargez les fichiers vérifiés.

## TVBLK003 / FSK

TVBLK003 utilise des blocs de 1 KiB avec synchronisation, en-tête à 300 bit/s et CRC. Profils : FSK 300/600/1200, 4-FSK 1200/2400. La séquence est répétée 1/3/5 fois pour combiner les blocs valides de copies différentes. CRC global et SHA-256 de chaque fichier sont vérifiés. TVFSK001/002 restent lisibles.

## Traitement local

Les fichiers et l’audio restent dans cet onglet. Aucun compte ni envoi de fichiers en ligne. Le site intègre Google Tag Manager. Les autorisations audio ne sont demandées que lorsque vous utilisez les commandes correspondantes. L’entrée audio nécessite un navigateur compatible et HTTPS ou localhost.

Disponible aujourd’hui

La référence droite suit les variations de vitesse avant le décodage. Enregistrement et récupération stéréo disponibles avec vérifications CRC et SHA-256. Désactivez la référence pour les anciens enregistrements mono.

## Limites pratiques

La référence corrige le temps, pas les échantillons manquants ni les fortes distorsions. Les débits élevés demandent un signal plus propre. Pas de division automatique entre faces. La récupération échoue si aucune copie valide d’un bloc ne subsiste.

## Vérifier les branchements

Gardez les canaux gauche et droit séparés. Alignez les fréquences d’échantillonnage d’entrée et de sortie et évitez de mélanger l’écoute directe à la lecture. Avec la Fast Track Pro, réglez Mix sur PB pendant l’enregistrement.

## Craquements ou référence absente ?

Désactivez puis réactivez l’entrée après un changement de format. Vérifiez les branchements stéréo, les niveaux et les fréquences. Importez un WAV stéréo d’Audacity pour comparer les captures. La référence ne restaure pas l’audio manquant.

## Animations et accessibilité

Les animations suivent la progression réelle. Les indicateurs utilisent le signal audio. Le mouvement réduit désactive les animations décoratives ; les onglets masqués arrêtent les mises à jour visuelles.

L’introduction indique le site de récupération : tapebytes.lucasciacca.com. Incluez-la pour identifier l’enregistrement à l’avenir.

## Combien de données peut contenir une cassette ?

La capacité dépend de la durée, du débit et de la redondance. Une C60 offre 30 minutes par face : à 300 bit/s, le plafond théorique est de 67 500 octets avant en-têtes, métadonnées et pauses ; à 2400 bit/s, de 540 000 octets. La capacité utile est inférieure ; trois ou cinq copies prennent plus de temps. Encoder calcule l’estimation selon vos fichiers et réglages. La référence stéréo améliore la correction temporelle, pas la capacité.

## Quel matériel faut-il ?

Un magnétophone stéréo avec entrée et sortie ligne, des câbles adaptés et un ordinateur avec entrée et sortie audio stéréo. Une interface audio USB peut fournir ces connexions. Pour vérifier le logiciel, générez un WAV et vérifiez-le dans Décoder avant d’enregistrer une cassette.

## Puis-je décoder n’importe quelle cassette ?

TapeBytes lit son propre format de données, y compris les anciennes versions prises en charge. Ce n’est pas un décodeur universel pour les cassettes Commodore, ZX Spectrum ou Kansas City Standard, ni un outil de numérisation musicale. Commencez par un petit fichier et vérifiez un cycle complet d’enregistrement et de récupération avec votre matériel.

[Estimer la capacité dans Encoder](https://tapebytes.lucasciacca.com/fr/encode/)
