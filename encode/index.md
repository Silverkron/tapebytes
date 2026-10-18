<!-- Language: en -->

Source: https://tapebytes.lucasciacca.com/encode/

Files to cassette audio: WAV encoder — TapeBytes

Convert files and folders into cassette data audio. Choose modulation and redundancy, estimate tape capacity and generate a WAV in your browser.

01 / FILES TO AUDIO

# Encode files for cassette tape.

Your files are processed in this browser. They are never uploaded.

01 Encode 02 Studio 03 Decode

01

## Choose files

Drop files here or click to choose files

Choose a folder

SELECT FILES TO ESTIMATE DURATION

02

## Set up the tape

Cassette length

Modulation

Redundancy

Choosing speed and redundancy

Higher rates require a cleaner signal. Each 1 KiB block has synchronization and CRC. With 2, 3 or 5 copies, Decode uses valid copies; in stereo-data mode copies cross channels. Headers, padding and all copies are included in the estimate.

Audio channels Stereo

Mono

Reference tone Stereo · data on the left, reference on the right

Connections and operation

Enabled by default. Left carries data; right carries a continuous 3 kHz reference to correct tape speed variations. Record both channels separately. File capacity is unchanged; the WAV is twice as large.

Mono input: connect one isolated channel, never a sum of L + R. Stereo data with ×1 needs both channels; with ×2, either complete channel contains all blocks. Reference correction requires stereo. Without it, the left data channel can be read with correction disabled. Hardware validation is still required for the new stereo-data mode.

Reference enabled: data on the left, 3 kHz reference on the right. Disable it to store data on both channels. With two copies, blocks cross channels at different times; capacity is similar to one data channel.

Spoken introduction Include a spoken introduction in this language

Read the recorded introduction

“This cassette contains digital files. To recover them, visit tapebytes dot lucasciacca dot com.”

The introduction identifies the recovery website: tapebytes.lucasciacca.com. Include it so the recording remains understandable later.

Capacity and format limits

Capacity is per side and includes the introduction, headers, metadata and redundancy. Adding files changes metadata overhead. No automatic splitting across sides. WAV generation uses browser memory; the RIFF format is limited to about 4 GiB.

Your working session stays in this tab as you navigate. Reloading clears selected files and generated audio.

03

## Your tape

RECORDING DURATION 00:00 Mono data

Selected files 0 B

Time per side 30:00

SELECT FILES TO ESTIMATE DURATION

Audio details and WAV size

✓ Audio ready

[Open Recording Studio](https://tapebytes.lucasciacca.com/studio/) [Verify this WAV](https://tapebytes.lucasciacca.com/decode/)

✓ All processing stays on this device
