<!-- Language: en -->

Source: https://tapebytes.lucasciacca.com/guide/

Cassette data storage: capacity and setup — TapeBytes

Learn how cassette data storage works, how much data fits on a tape, which equipment you need and how to record and recover files with TapeBytes.

MANUAL / BEFORE YOU RECORD

# How to store data on cassette tapes

Your first complete round trip

- Choose files, modulation and redundancy in Encode. The right-channel reference is enabled by default.
- Generate the stereo WAV. Left carries data; right carries the 3 kHz reference. The spoken introduction is optional.
- In Studio, connect both outputs to the deck, calibrate the level, press REC on the deck and start the countdown.
- Rewind and capture both channels in Decode, or import a stereo WAV. Leave reference correction on and download the verified files.

## TVBLK003 / FSK

TVBLK003 carries 1 KiB data blocks with synchronization, CRC and 1/2/3/5 copies. TVBLK004 distributes blocks over two channels. Copies alternate channels in separate time slots. Archive CRC and file SHA-256 must pass. TVFSK001/002 and TVBLK003 remain readable.

Reference enabled: data on the left, 3 kHz reference on the right. Disable it to store data on both channels. With two copies, blocks cross channels at different times; capacity is similar to one data channel.

Mono input: connect one isolated channel, never a sum of L + R. Stereo data with ×1 needs both channels; with ×2, either complete channel contains all blocks. Reference correction requires stereo. Without it, the left data channel can be read with correction disabled. Hardware validation is still required for the new stereo-data mode.

## Local processing

Files and audio stay in this tab. No accounts or file uploads. The site integrates Google Tag Manager. Audio-device permissions are requested only when you use those controls. A compatible browser and HTTPS or localhost are needed for audio input.

Available today

The right-channel reference tracks tape speed variations before decoding. Stereo recording and recovery are available, with CRC and SHA-256 integrity checks. Disable reference correction for legacy mono recordings.

## Practical limits

The reference corrects timing, not missing samples or severe distortion. Higher data rates need a cleaner signal. There is no automatic splitting across tape sides. Recovery fails if no valid copy of a block remains.

## Connection checklist

Keep left and right channels separate. Match input and output sample rates in your audio settings and avoid mixing direct monitoring into playback. With a Fast Track Pro, set Mix to PB while recording.

## Crackles or missing reference?

Crackling can be caused by the sample rate configured for the audio interface, especially when input, output and the browser audio engine are not aligned. On macOS, open Audio MIDI Setup, select the interface and set input and output to 48,000 Hz (48 kHz), the sample rate TapeBytes uses for WAV files. Then disable and re-enable the input in TapeBytes to recreate the audio connection. This setting is separate from the reference tone frequency (3 kHz). If crackling persists, check levels, connections and drivers and compare a capture made with Audacity. The reference cannot restore missing audio samples.

## Motion and accessibility

Operation animations follow actual progress. Audio meters use the live signal. Reduced motion disables decorative animation; hidden tabs stop visual updates.

The introduction identifies the recovery website: tapebytes.lucasciacca.com. Include it so the recording remains understandable later.

## How much data can a cassette tape hold?

Capacity depends on recording time, data rate and redundancy. A C60 has 30 minutes per side: at 300 bit/s, the theoretical ceiling is 67,500 bytes before headers, metadata and pauses. At 2400 bit/s it is 540,000 bytes. Usable capacity is lower; three or five copies take more time. Encode calculates the estimate for your selected files and settings. The stereo reference improves timing recovery, not capacity.

## What equipment do I need?

A stereo cassette recorder with line input and output, suitable cables, and a computer with stereo audio input and output. A USB audio interface can provide these connections. For a first software check, generate a WAV and verify it directly in Decode before recording a cassette.

## Can I decode any cassette recording?

TapeBytes reads its own data format, including supported earlier versions. It is not a general decoder for Commodore, ZX Spectrum or Kansas City Standard tapes, nor a tool for converting music recordings into digital files. Start with a small file and verify a complete recording and recovery on your own equipment.

[Estimate capacity in Encode](https://tapebytes.lucasciacca.com/encode/)
