<!-- Language: en -->

Source: https://tapebytes.lucasciacca.com/decode/

Recover files from cassette audio — TapeBytes

Recover TapeBytes files from a recorded WAV or stereo audio input, with tape-speed correction and CRC32 and SHA-256 integrity checks.

03 / AUDIO TO FILES

# Recover files from cassette audio.

Recover files from a TapeBytes WAV or your cassette deck. Everything happens in your browser.

✓ All processing stays on this device CRC32 + SHA-256

Audio input

Playback

Choose an input, then enable the monitor. Capture starts separately.

Audio channels Stereo

Mono

Stereo/Mono follows the channel count reported by the input when enabled. You can override it manually. Detection does not identify audio content or the presence of a reference tone.

Reference tone

Reference enabled: data on the left, 3 kHz reference on the right. Disable it to store data on both channels. With two copies, blocks cross channels at different times; capacity is similar to one data channel.

Connections and operation

Mono input: connect one isolated channel, never a sum of L + R. Stereo data with ×1 needs both channels; with ×2, either complete channel contains all blocks. Reference correction requires stereo. Without it, the left data channel can be read with correction disabled. Hardware validation is still required for the new stereo-data mode.

01 / TAPE INPUT

## From your tape deck

STEREO / PCM

L · Data −∞ dBFS

Frequency spectrum 0 — 8 kHz

R · Reference −∞ dBFS

Frequency spectrum 0 — 8 kHz

R · Reference Measured reference frequency — Hz

Enable input to measure the reference.

Auto stop

ⓘ

After at least 0.25 s of signal above −36 dBFS, stop and decode when all captured channels remain below −42 dBFS for the selected time (1 s by default). Initial silence does not trigger it. High noise may prevent stopping; use Stop and decode.

Wait without signal

Audio permission is requested when needed. Capture continues until you stop it and uses browser memory.

OR / WAV FILE

## From an audio file

Already have a recording? Open your TapeBytes WAV to recover its files.

Choose a WAV file Automatic profile detection · separate audio channels

Generate a WAV in Encode to verify it here without recording a tape.

## Verified before download

Recovered files appear below, only after every integrity check passes.

✓ CRC32 + SHA-256

Recovery settings & format details

Captured WAV automatically preserves both channels from a stereo input, even when reference correction is off. Connect L to input 1 and R to input 2. The visual monitor shows both channels; Playback listens to L only.

Enabled by default for data + reference recordings. Disable for stereo-data recordings or older mono recordings. Audio is preserved; Playback monitors L only.

Input and processing check

About Playback

Listen through the default output. Off by default; use headphones with a microphone. Leaving this page turns it off.

Keep left and right channels separate. Match input and output sample rates in your audio settings and avoid mixing direct monitoring into playback. With a Fast Track Pro, set Mix to PB while recording.

Correct constant tape-speed offset automatically

Uses the initial pilot tone, within ±5% tested speed offset. This does not continuously track wow/flutter. Files are available only when every block, the archive CRC and all file hashes pass.

The initial pilot should start within the first 60 seconds for speed correction. TVBLK003 blocks can be found later. TVFSK001/002 files remain readable.

Recovered files VERIFIED
