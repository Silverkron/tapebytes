# TapeBytes architecture: browser FSK encoding and recovery

[Documentation](README.md) · [Audio modes](audio-modes.md) · [Development](development.md)

## Processing path

`File objects → manifest + bytes → indexed blocks → FSK samples → PCM WAV`

`Captured/imported PCM → optional pilot correction → block detection → archive CRC → file SHA-256 → downloads`

The manifest stores file metadata and SHA-256 hashes. Block-format archives divide the payload into 1,024-byte blocks with robust headers and CRC checks. The current formats are `TVBLK003` for mono/data + reference and `TVBLK004` for dual-channel data. Legacy `TVFSK001` and `TVFSK002` remain readable. These identifiers are compatibility names, not user-facing branding.

## Main components

| Source | Responsibility |
| --- | --- |
| [codec.js](../src/assets/codec.js) | Profiles, capacity, packing, modulation, CRC and block recovery |
| [reference.js](../src/assets/reference.js) | Stereo WAVs, reference validation/correction and consecutive-recording handling |
| [worker.js](../src/assets/worker.js) | Background encoding, decoding and verification jobs |
| [capture.js](../src/assets/capture.js) | AudioWorklet PCM capture and flush handshake |
| [app.js](../src/assets/app.js) | Audio graph, controls, visualizers, capture lifecycle and results |
| [build.mjs](../build.mjs) | Static HTML templates, locale composition and metadata |

Generated WAVs use 48 kHz PCM. Live capture creates the audio context from the device's reported sample rate where available. Acquisition, playback monitoring and decoder processing are separate stages; display colors do not change the audio.

## Reference correction

The dedicated right-channel signal supplies timing information. The correction checks sustained pilot cycles and waveform quality, then resamples the data along that timing reference. Consecutive recordings separated by sustained quiet pilot gaps are processed separately. Corrupted pilots can still fail validation.

Without the reference, decoding can estimate a constant speed offset from the preamble. This is not equivalent to continuous wow/flutter correction.

## Multiple archives and integrity

`decodeAllChannels` scans beyond the first complete block-format archive and shares matching block groups across channels. Matching repetitions can contribute valid blocks. Completed groups avoid repeating the same block archive within that scan; repetitions separated into independent reference segments can still appear separately. Do not rely on global deduplication.

The worker unpacks recovered archives and verifies their files before returning downloads. Archive count is not a count of every attempted or damaged recording. Summary timing/profile information is based on the first recovered archive; the UI is not a per-archive diagnostic report. CRC and SHA-256 detect corruption but do not provide confidentiality or authenticated provenance.

## Static website

Five routes in five languages produce 25 HTML pages. The browser enhances navigation and tools; primary text and metadata are present in HTML. The portable export embeds routes, scripts, fonts and spoken WAV introductions. There is no application server for file conversion.
