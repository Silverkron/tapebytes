<!-- Language: en -->

Source: https://tapebytes.lucasciacca.com/decode/

Recover files from cassette audio — TapeBytes

Recover TapeBytes files from a recorded WAV or stereo audio input, with tape-speed correction and CRC32 and SHA-256 integrity checks.

03 / AUDIO TO FILES

# Recover files from cassette audio.

Recover files from a TapeBytes WAV or your cassette deck. Everything happens in your browser.

✓ All processing stays on this device CRC32 + SHA-256

STEREO Use the right-channel reference

Left: data · Right: 3 kHz reference

01 / TAPE INPUT

## From your tape deck

PCM

Captured WAV automatically preserves both channels from a stereo input, even when reference correction is off. Connect L to input 1 and R to input 2. Monitoring and Playback use L only.

Audio input

Live audio input −∞ dBFS

Frequency spectrum PCM / CH 1

Input and processing check

Playback

Choose an input, then enable the monitor. Capture starts separately.

About Playback

Listen through the default output. Off by default; use headphones with a microphone. Leaving this page turns it off.

Audio permission is requested when needed. Capture continues until you stop it and uses browser memory.

OR / WAV FILE

## From an audio file

Already have a recording? Open your TapeBytes WAV to recover its files.

Choose a WAV file Automatic profile detection · left channel

Generate a WAV in Encode to verify it here without recording a tape.

Verified before download Recovered files appear below, only after every integrity check passes.

✓ CRC32 + SHA-256

Recovery settings & format details

Enabled by default for stereo recordings. Turn off only for older recordings without the reference. Captured audio is preserved; Playback monitors the left channel. Missing audio cannot be reconstructed.

Keep left and right channels separate. Match input and output sample rates in your audio settings and avoid mixing direct monitoring into playback. With a Fast Track Pro, set Mix to PB while recording.

Correct constant tape-speed offset automatically

Uses the initial pilot tone, within ±5% tested speed offset. This does not continuously track wow/flutter. Files are available only when every block, the archive CRC and all file hashes pass.

The initial pilot should start within the first 60 seconds for speed correction. TVBLK003 blocks can be found later. TVFSK001/002 files remain readable.

Recovered files VERIFIED
