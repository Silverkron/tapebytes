# Registrare e recuperare file da una musicassetta

[Panoramica italiana](README.md) · [Approfondimenti in inglese](../getting-started.md)

## Collegamenti e registrazione

Collega l'uscita stereo LINE OUT del computer o della scheda audio a LINE IN della piastra. Per la lettura, collega LINE OUT della piastra a LINE IN della scheda audio. Mantieni separati i canali. Un ingresso microfono mono non equivale a un ingresso linea stereo.

In Codifica scegli un piccolo file, la durata del lato, FSK 300 e le copie. Mantieni Stereo e Tono di riferimento per la modalità predefinita. Controlla la durata stimata e genera il WAV.

In Studio seleziona l'uscita, riproduci il tono di calibrazione e regola il livello sulla piastra senza saturare. Il cursore del browser parte al 100%, ma resta regolabile. Supera il tratto iniziale non magnetico, premi REC sulla piastra e avvia il conto alla rovescia. TapeBytes riproduce il segnale; non controlla i tasti del registratore.

![Studio TapeBytes con WAV pronto e controlli di calibrazione; interfaccia inglese](../assets/studio.jpg)

## Acquisizione e verifica

Riavvolgi, apri Decodifica e scegli l'ingresso corretto. Abilita il monitor e controlla L/R. L'autodetect legge il numero di canali dichiarati dal dispositivo, non riconosce automaticamente il tono. Imposta il riferimento in base alla registrazione, avvia l'acquisizione e premi PLAY sulla piastra. Ferma e decodifica, oppure attendi Auto stop.

Per una registrazione fatta in Audacity, importa il WAV non elaborato dalla sorgente file. Non convertire in MP3 e non sommare i canali. Scarica solo i file verificati e conserva gli originali.

## Auto stop e segnali consecutivi

Auto stop è attivo con attesa di un secondo. Per cinque segnali separati da due secondi, scegli cinque secondi oppure disattivalo: potrai acquisire tutta la sequenza. Il decoder recupera gli archivi completi nei formati a blocchi attuali. Non riparte automaticamente dopo uno stop e non garantisce l'inventario degli archivi danneggiati.

## Problemi frequenti

- **Scoppiettio:** controlla frequenza di campionamento e clock della scheda. Su macOS usa Configurazione MIDI Audio; prova ingresso e uscita entrambi a 48 kHz, poi riabilita l'ingresso. Se persiste, controlla driver, USB e saturazione. Non è sempre un problema di frequenza.
- **Nessun segnale:** verifica dispositivo, collegamenti, PLAY e livelli; confronta con il WAV originale.
- **Riferimento non valido:** deve essere sul destro, separato dai dati. Se hai registrato senza riferimento, togli la spunta.
- **Un solo canale:** controlla cosa espone la scheda al browser. Un segnale stereo dati con copia singola può richiedere entrambi i canali.
- **Playback diverso:** il monitor riproduce solo il sinistro; l'acquisizione stereo conserva entrambi.
- **Stop anticipato:** aumenta l'attesa. Fruscio elevato può invece impedire lo stop automatico.
- **CRC/SHA non validi:** non ignorare l'errore; prova una nuova acquisizione, livelli migliori, velocità inferiore o più copie.

L'acquisizione richiede HTTPS o localhost e permesso audio. Selezione dell'uscita e dispositivi dipendono dal browser. Per una segnalazione indica sistema, browser, piastra, scheda, frequenza, modalità, copie e se il WAV originale funziona. [Problemi tecnici completi, in inglese](../troubleshooting.md).
