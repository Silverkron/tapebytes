<!-- Language: it -->

Source: https://tapebytes.lucasciacca.com/it/guide/

Dati su musicassetta: capacità e guida — TapeBytes

Scopri quanti dati contiene una musicassetta, quale attrezzatura serve e come registrare e recuperare file con TapeBytes.

MANUALE / PRIMA DI REGISTRARE

# Come salvare dati su musicassetta

La tua prima conversione completa di andata e ritorno

- In Codifica scegli file, modulazione e ridondanza. Il riferimento sul canale destro è già attivo.
- Genera il WAV stereo: dati a sinistra, riferimento a 3 kHz a destra. L’introduzione vocale è facoltativa.
- In Studio collega entrambe le uscite alla piastra, calibra il livello, premi REC sulla piastra e avvia il conto alla rovescia.
- Riavvolgi e acquisisci entrambi i canali in Decodifica, oppure importa un WAV stereo. Lascia attiva la correzione tramite riferimento e scarica i file verificati.

## TVBLK003 / FSK

TVBLK003 trasporta blocchi di 1 KiB con sincronizzazione, CRC e 1/2/3/5 copie. TVBLK004 distribuisce i blocchi su due canali. Le copie alternano canale in intervalli temporali separati. CRC dell’archivio e SHA-256 dei file devono essere validi. TVFSK001/002 e TVBLK003 restano leggibili.

Riferimento attivo: dati a sinistra, riferimento a 3 kHz a destra. Disattivalo per usare entrambi i canali per i dati. Con due copie, i blocchi si incrociano tra i canali in momenti diversi; la capacità è simile a quella di un canale dati.

Ingresso mono: collega un singolo canale isolato, mai la somma S + D. Dati stereo ×1 richiede entrambi i canali; con ×2 ogni canale completo contiene tutti i blocchi. La correzione con riferimento richiede stereo. Senza, puoi leggere il canale dati sinistro disattivando la correzione. La nuova modalità dati stereo va ancora verificata sulla piastra.

## Elaborazione locale

File e audio restano in questa scheda. Nessun account o caricamento dei file su server. Il sito integra Google Tag Manager. I permessi per i dispositivi audio vengono richiesti solo quando usi i relativi controlli. Per l’ingresso audio servono un browser compatibile e HTTPS o localhost.

Disponibile oggi

Il riferimento sul canale destro segue le variazioni di velocità del nastro prima della decodifica. Registrazione e recupero stereo sono disponibili, con verifiche CRC e SHA-256. Per le vecchie registrazioni mono disattiva la correzione tramite riferimento.

## Limiti pratici

Il riferimento corregge il tempo, non i campioni mancanti o le distorsioni gravi. Le velocità maggiori richiedono un segnale più pulito. Non è prevista la divisione automatica tra lati. Il recupero fallisce se non resta una copia valida di un blocco.

## Controlla i collegamenti

Mantieni separati i canali sinistro e destro. Allinea le frequenze di ingresso e uscita nelle impostazioni audio ed evita di mescolare il monitoraggio diretto con la riproduzione. Con Fast Track Pro, imposta Mix su PB durante la registrazione.

## Scoppiettii o riferimento assente?

Lo scoppiettio può dipendere dalla frequenza di campionamento impostata per la scheda audio, soprattutto se ingresso, uscita e motore audio del browser non sono allineati. Su macOS apri Configurazione MIDI Audio, seleziona la scheda e imposta ingresso e uscita a 48.000 Hz (48 kHz), la frequenza usata da TapeBytes per i WAV. Poi disabilita e riabilita l’ingresso in TapeBytes per ricreare il collegamento audio. Questa impostazione è distinta dalla frequenza del tono di riferimento (3 kHz). Se il problema persiste, controlla livelli, collegamenti e driver e confronta un’acquisizione con Audacity. Il riferimento non può ripristinare campioni audio mancanti.

## Animazioni e accessibilità

Le animazioni delle operazioni seguono l’avanzamento reale. Gli indicatori usano il segnale audio. Il movimento ridotto disattiva le animazioni decorative; le schede nascoste fermano gli aggiornamenti visivi.

L’introduzione indica il sito per il recupero: tapebytes.lucasciacca.com. Includila per riconoscere il contenuto della registrazione anche in futuro.

## Quanti dati può contenere una musicassetta?

La capacità dipende da durata, velocità dei dati e ridondanza. Una C60 offre 30 minuti per lato: a 300 bit/s il massimo teorico è 67.500 byte prima di intestazioni, metadati e pause. A 2400 bit/s è 540.000 byte. La capacità utile è inferiore; tre o cinque copie richiedono più tempo. Codifica calcola la stima per i file e le impostazioni scelti. Il riferimento stereo migliora il recupero della temporizzazione, non aumenta la capacità.

## Quale attrezzatura serve?

Un registratore stereo con ingresso e uscita di linea, cavi adatti e un computer con ingresso e uscita audio stereo. Puoi usare un’interfaccia audio USB per i collegamenti. Per una prima verifica del software, genera un WAV e verificalo direttamente in Decodifica prima di registrare una cassetta.

## Posso decodificare qualsiasi registrazione su cassetta?

TapeBytes legge il proprio formato dati, incluse le versioni precedenti supportate. Non è un decoder generico per nastri Commodore, ZX Spectrum o Kansas City Standard, né uno strumento per digitalizzare registrazioni musicali. Inizia con un piccolo file e verifica registrazione e recupero completi sulla tua attrezzatura.

[Stima la capacità in Codifica](https://tapebytes.lucasciacca.com/it/encode/)
