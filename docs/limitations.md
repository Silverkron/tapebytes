# TapeBytes limitations and validation status

[Documentation](README.md) · [Troubleshooting](troubleshooting.md)

TapeBytes is a working browser tool for experimenting with digital files on audio cassette. It is not a certified archival storage system.

| Area | Implemented | Practical boundary |
| --- | --- | --- |
| Encoding | Five FSK/4-FSK profiles; local WAV generation | Higher bit rates need a cleaner physical signal |
| Reference | Right-channel 3 kHz pilot timing correction | Cannot restore clipped audio or missing samples |
| Stereo data | Indexed blocks across both channels | One-copy multi-block recovery needs both channels |
| Redundancy | 1/2/3/5 repeated copies; CRC-valid block recovery | Copies can all be damaged; no general FEC guarantee |
| Multiple archives | Consecutive TVBLK003/004 recovery | Not a complete inventory of unrecoverable transmissions |
| Auto stop | Signal-level detection and configurable quiet wait | Hiss, pauses and low levels affect triggering |
| Integrity | Block/archive CRC and per-file SHA-256 | Integrity checks are not encryption or sender authentication |
| Capacity | Estimate includes format overhead and copies | No automatic tape-side splitting; browser RAM and RIFF limit |
| Devices | Browser audio capture and optional output choice | Depends on permissions, browser, drivers and OS routing |

The repository's tests verify synthetic signals, controlled impairments and application paths. The documented no-hardware demo verifies a real generated WAV in the browser. Neither establishes a universal hardware success rate. Hardware results should name the deck, tape, interface, mode, sample rate, file size and number of successful round trips.

The app reads TapeBytes formats, including historical identifiers containing TapeVault names. It does not read arbitrary vintage-computer tapes or enterprise LTO media. The project is for small files; music-cassette digitization and MP3 conversion are separate workflows.
