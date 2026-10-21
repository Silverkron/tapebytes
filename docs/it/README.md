# TapeBytes — archiviare file digitali su musicassetta

[English](../../README.md) · **Italiano** · [Español](../es/README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md)

**Trasforma piccoli file in audio, registrali su una cassetta e recuperali nel browser.** TapeBytes è un'app gratuita per appassionati di retrocomputing, maker e chi vuole sperimentare la memorizzazione di dati su nastro. Usa FSK e 4-FSK per generare un WAV; il decoder verifica CRC32 e SHA-256 prima di offrire i file da scaricare.

[Apri TapeBytes in italiano](https://tapebytes.lucasciacca.com/it/) · [Guida pratica e problemi comuni](guida.md) · [Documentazione tecnica in inglese](../README.md)

![Animazione della cassetta TapeBytes, con dettagli viola e indicatori azzurri](../assets/cassette-preview.gif)

*Animazione decorativa dell'interfaccia: non rappresenta un'acquisizione dal nastro. [Immagine statica](../assets/cassette-preview.jpg).*

## Provalo senza registratore

1. In **Codifica**, usa il piccolo file di esempio.
2. Mantieni **Stereo** e **Tono di riferimento** selezionati; puoi disattivare l'introduzione vocale.
3. Genera il WAV.
4. In **Decodifica**, scegli la sorgente file e verifica il WAV generato.
5. Scarica il file dopo la verifica d'integrità.

La prova verifica il software. Per verificare il nastro devi registrare e riacquisire il segnale dalla piastra.

## Tre modalità

| Modalità | Sinistra | Destra |
| --- | --- | --- |
| Stereo con riferimento, predefinita | Dati | Tono a 3 kHz per correggere la velocità |
| Stereo senza riferimento | Blocchi dati | Altri blocchi dati |
| Mono | Dati | Non usata |

Sono disponibili 300, 600 e 1.200 bit/s in FSK, 1.200 e 2.400 bit/s in 4-FSK, con 1/2/3/5 copie. Con due copie stereo, i blocchi si ripetono sul canale opposto in un momento successivo. Non sommare L e R per ottenere mono.

## Capacità e limiti

Una C60 ha 30 minuti per lato. A 300 bit/s il limite teorico di un canale dati è 67.500 byte prima dell'overhead; a 2.400 bit/s è 540.000 byte. Usa la stima di Codifica: intestazioni, copie e introduzione occupano spazio. Non è prevista la suddivisione automatica fra lati.

Il riferimento aiuta a correggere le variazioni di velocità, ma non ripara campioni mancanti o audio saturato. L'affidabilità dipende da nastro, piastra e scheda audio. Conserva gli originali. TapeBytes non è un decoder universale per cassette di computer storici né un convertitore di musica in MP3.

## Avvio locale

Servono Node.js 22+ e Python 3, senza dipendenze npm da installare:

```sh
git clone https://github.com/Silverkron/tapebytes.git
cd tapebytes
npm run build
npm test
npm run dev
```

Apri [localhost:8765/it/](http://127.0.0.1:8765/it/). I file vengono elaborati localmente; il sito può comunque caricare Google Tag Manager. [Privacy, in inglese](../privacy.md).

Questa panoramica e la guida sono in italiano. Architettura e sviluppo hanno un riferimento completo in inglese. Non è attualmente presente una licenza generale del progetto; sorgente pubblico non significa automaticamente licenza open source.
