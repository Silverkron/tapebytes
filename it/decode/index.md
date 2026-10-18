<!-- Language: it -->

Source: https://tapebytes.lucasciacca.com/it/decode/

Recupera file dall’audio della cassetta — TapeBytes

Recupera file TapeBytes da un WAV registrato o dall’ingresso stereo, con correzione della velocità del nastro e controlli CRC32 e SHA-256.

03 / DALL’AUDIO AI FILE

# Recupera file dall’audio della cassetta.

Recupera i file da un WAV di TapeBytes o dal tuo registratore. Tutto avviene nel browser.

✓ Tutto sul tuo dispositivo CRC32 + SHA-256

Ingresso audio

Playback

Scegli un ingresso e abilita il monitor. L’acquisizione si avvia separatamente.

Canali audio Stereo

Mono

Stereo/Mono viene selezionato dai canali dichiarati dall’ingresso quando lo abiliti. Puoi modificarlo manualmente. Il rilevamento non identifica il contenuto audio né la presenza del tono di riferimento.

Tono di riferimento

Riferimento attivo: dati a sinistra, riferimento a 3 kHz a destra. Disattivalo per usare entrambi i canali per i dati. Con due copie, i blocchi si incrociano tra i canali in momenti diversi; la capacità è simile a quella di un canale dati.

Collegamenti e funzionamento

Ingresso mono: collega un singolo canale isolato, mai la somma S + D. Dati stereo ×1 richiede entrambi i canali; con ×2 ogni canale completo contiene tutti i blocchi. La correzione con riferimento richiede stereo. Senza, puoi leggere il canale dati sinistro disattivando la correzione. La nuova modalità dati stereo va ancora verificata sulla piastra.

01 / INGRESSO CASSETTA

## Dal registratore a cassette

STEREO / PCM

L · Dati −∞ dBFS

Spettro delle frequenze 0 — 8 kHz

R · Riferimento −∞ dBFS

Spettro delle frequenze 0 — 8 kHz

R · Riferimento Frequenza del riferimento misurata — Hz

Abilita l’ingresso per misurare il riferimento.

Auto stop

ⓘ

Dopo almeno 0,25 s di segnale sopra −36 dBFS, arresta e decodifica quando tutti i canali acquisiti restano sotto −42 dBFS per il tempo scelto (1 s di default). Non si attiva durante l’attesa iniziale. Rumore elevato può impedirne l’arresto; usa Interrompi e decodifica.

Attesa senza segnale

Il permesso audio viene richiesto quando serve. L’acquisizione continua finché la interrompi e usa la memoria del browser.

OPPURE / FILE WAV

## Da un file audio

Hai già una registrazione? Apri il WAV di TapeBytes per recuperare i file.

Scegli un file WAV Rilevamento automatico del profilo · canali audio separati

Genera un WAV in Codifica per verificarlo qui senza registrare una cassetta.

## Verificati prima del download

I file recuperati compariranno qui sotto, solo dopo aver superato tutti i controlli di integrità.

✓ CRC32 + SHA-256

Impostazioni di recupero e dettagli del formato

Il WAV acquisito conserva automaticamente i due canali se l’ingresso è stereo, anche con la correzione disattivata. Collega L all’ingresso 1 e R all’ingresso 2. Il visualizzatore mostra entrambi i canali; Playback ascolta solo L.

Attivo di default per registrazioni dati + riferimento. Disattivalo per registrazioni dati stereo o vecchie registrazioni mono. L’audio viene conservato; Playback ascolta solo il sinistro.

Verifica ingresso e filtri

Come funziona Playback

Ascolta dall’uscita predefinita. Spento di default; usa cuffie con un microfono. Si spegne uscendo dalla pagina.

Mantieni separati i canali sinistro e destro. Allinea le frequenze di ingresso e uscita nelle impostazioni audio ed evita di mescolare il monitoraggio diretto con la riproduzione. Con Fast Track Pro, imposta Mix su PB durante la registrazione.

Correggi automaticamente lo scostamento costante di velocità

Usa il tono pilota iniziale; verificato con scostamenti entro ±5%. Non segue continuamente le oscillazioni di velocità (wow/flutter). I file sono disponibili solo quando tutti i blocchi, il CRC dell’archivio e gli hash dei file sono validi.

Per correggere la velocità, il tono pilota iniziale deve trovarsi nei primi 60 secondi. I blocchi TVBLK003 possono essere trovati anche dopo. I file TVFSK001/002 restano leggibili.

File recuperati VERIFICATO
