# TapeBytes

**Digital files on cassette tape.**

TapeBytes is a free browser application that turns small files into audio you can record onto a music cassette—and recovers those files when you play the tape back. It brings a familiar idea from early home computing into a modern, entirely client-side workflow.

Built for retrocomputing enthusiasts, makers and people curious about analog data storage, TapeBytes combines an animated pixel-art cassette interface with real audio encoding, stereo recording support and file integrity checks.

The configured website address is **tapebytes.lucasciacca.com**. This repository contains the source and static-site build; configuring that address does not publish the site.

## How it works

```text
Files → Encode → Stereo WAV → Cassette recorder
                                      ↓
Verified files ← Decode ← Stereo audio playback
```

1. **Encode:** choose files or a folder, cassette duration, modulation and redundancy. The capacity estimate updates with your settings. Generate a WAV, optionally including a spoken introduction with the recovery website address.
2. **Studio:** connect your computer to the recorder, select an audio output where supported, calibrate the recording level, press REC on the physical deck and start the countdown. TapeBytes plays the audio; the deck records it.
3. **Decode:** rewind the cassette and capture its stereo output, or import an existing WAV recording. TapeBytes corrects timing using the reference channel and checks recovered data before offering downloads.

You can also try the software without a cassette recorder: generate a WAV in Encode, then verify it directly in Decode.

### Why stereo?

By default, the **left channel carries data** and the **right channel carries a continuous 3 kHz reference tone**. The reference lets the decoder compensate for tape-speed variations. Keep both channels separate throughout recording and capture.

Reference correction is enabled by default in Encode and Decode. In Encode, disabling it selects dual-channel data transport. In Decode, disable it for dual-data or older mono recordings. Captured WAV files preserve both channels when the input is stereo; optional input Playback monitors only the left channel and is off by default.

## Features

- Local file and folder encoding, with no preset file-size or file-count cap.
- FSK at 300, 600 and 1200 bit/s; 4-FSK at 1200 and 2400 bit/s.
- One, two, three or five copies of the transmission, with recovery of valid blocks across copies.
- Tape capacity and recording-duration estimates that include format overhead and redundancy.
- Stereo reference-based speed correction, live audio meters and downloadable captured WAV files.
- Block and archive CRC checks, plus SHA-256 verification for each recovered file.
- English, Italian, Spanish, German and French interfaces and spoken introductions.
- Light, dark and system themes, with reduced-motion support.
- Independently generated static pages, localized metadata and no backend, accounts or file uploads.

## Equipment and browser requirements

For a physical tape recording you need:

- A stereo cassette recorder with line input and output.
- A computer with stereo audio output and input; a USB audio interface can provide these connections.
- Suitable cables that preserve the left and right channels.
- A browser supporting Web Audio, AudioWorklet and microphone/audio-input access. Input capture requires **HTTPS or localhost** and permission from the user.

Audio-output device selection depends on browser support. When unavailable, select the output in your operating system. Match input and output sample rates, disable the deck's Dolby/noise reduction, and set recording levels below clipping. Studio playback starts at 100% and remains adjustable.

## Capacity and limitations

TapeBytes is intended for **small files and hands-on experiments with data on tape**. Higher data rates require a cleaner signal; successful recovery depends on the recorder, tape, connections and recording levels.

A C60 cassette provides 30 minutes per side. At 300 bit/s, the theoretical ceiling is 67,500 bytes per side before headers, metadata and pauses. At 2400 bit/s it is 540,000 bytes. Actual file capacity is lower, and repeated copies consume additional time. Use the estimate in Encode for your chosen files and settings.

- The stereo reference corrects timing; it cannot restore missing samples or severely distorted audio.
- Files are made available only after the required integrity checks pass. Keep the original files until you have verified a complete recording and recovery.
- There is no automatic splitting across cassette sides.
- WAV generation and capture use browser memory. Standard RIFF/WAV output is limited to roughly 4 GiB.
- TapeBytes reads its own format. It is not a general decoder for Commodore, ZX Spectrum or Kansas City Standard tapes, or a music-digitization application.
- Data + reference uses `TVBLK003`; dual-channel data uses `TVBLK004`. Supported `TVFSK001`, `TVFSK002` and `TVBLK003` recordings remain readable. These identifiers retain their original names for compatibility.

## Run locally

Requirements: **Node.js 22+** and **Python 3** for the local development server. There are no npm dependencies to install.

```sh
npm run build
npm test
npm run dev
```

Open [localhost:8765](http://127.0.0.1:8765/). English is served at `/`; other languages use `/it/`, `/es/`, `/de/` and `/fr/`. Each page can be opened directly, such as `/it/decode/`.

The development server serves `dist/`. Run `npm run build` again after editing source files, then reload the browser.

### Portable HTML

To create a single-file companion with embedded routes, fonts, scripts and spoken introductions:

```sh
BASE_PATH='' npm run build
npm run portable
```

The result is `outputs/TapeBytes.html`. The build also writes `outputs/TapeVault.html` for compatibility with existing local preview URLs. For browser audio features, serve the file over localhost or HTTPS. GitHub Pages uses the normal static build, not this portable export.

## Source layout

```text
src/
  assets/
    app.js                 Application interactions and audio controls
    codec.js               Data format, modulation and integrity checks
    reference.js           Stereo-reference timing correction
    capture.js             AudioWorklet capture processor
    worker.js              Background encoding and decoding
    style.css              Theme tokens, layout and animation
    audio/                 Five pre-generated spoken introductions
    fonts/                 Bundled font and license
    social.png             Social sharing image
  locales/                 UI copy, page titles and descriptions
  cassette.svg             Animated pixel-art cassette artwork
build.mjs                  HTML templates and static-site generator
build-standalone.mjs        Portable HTML generator
site.config.json           Domain, languages, routes and indexing settings
tests/                     Codec, capture, reference and site checks
scripts/
  publish-static.sh        Writes generated output to gh-pages
  generate-voices.py       Optional macOS voice regeneration
.github/workflows/
  static-pages.yml         Build, test and manual deployment workflow
```

HTML source templates live in the `render(lang, page)` function in `build.mjs`. The build combines those templates with `src/locales/*.json` and the assets to generate **25 localized pages** in `dist/`.

`dist/` is generated output. `outputs/` and `work/` contain local exports and research. These directories are excluded from Git and are not required to build the site.

## GitHub Actions and GitHub Pages

Commit the source files, including `.github/workflows/static-pages.yml`, and push them to the repository's `main` branch.

On each push to `main`, the workflow:

1. Builds the static site and runs the tests.
2. Updates a separate **`gh-pages`** branch containing only the generated site.
3. Uploads the static site as a workflow artifact.

Deployment is a separate, explicit action. Routine pushes do not deploy the site. The workflow uses the repository's `GITHUB_TOKEN`; no personal access token is needed. Repository rules must allow the workflow to write to `gh-pages`. Treat that branch as generated output rather than editing it manually.

### Publish when ready

1. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
2. Configure the custom domain and its DNS records, and enable HTTPS when available.
3. Indexing is enabled by default. If an existing repository variable `INDEXABLE` is `0`, remove it or set it to `1` for the public site.
4. In **Actions → Build static site → Run workflow**, select `main` and enable **Publish the generated site to GitHub Pages**.

The deployment job publishes the same artifact saved to `gh-pages`. It uses an explicit Pages deployment rather than relying on a branch push to trigger publication. See [GitHub's custom Pages workflows documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Domain and SEO configuration

The default origin is `https://tapebytes.lucasciacca.com`, with no path prefix, as defined in `site.config.json`. The build generates a `CNAME` file for this domain. DNS and GitHub Pages domain settings must still be configured separately.

Optional repository variables are set under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Purpose |
| --- | --- |
| `SITE_ORIGIN` | HTTPS origin without a path; overrides the configured domain. |
| `BASE_PATH` | Deployment prefix, such as `/tape-vault`; use `/` for the domain root. |
| `INDEXABLE` | Defaults to `1` (indexing enabled). Set to `0` only for non-public preview builds. |

For a repository hosted under a GitHub Pages path instead of the custom domain:

```sh
SITE_ORIGIN=https://OWNER.github.io BASE_PATH=/REPOSITORY INDEXABLE=1 npm run build
npm test
```

Localized page titles and descriptions are stored under the `seo.*` and `desc.*` keys in the translation files. The generator embeds canonical links, reciprocal `hreflang` links, Open Graph and Twitter metadata, and structured data directly in each HTML page. It also creates `sitemap.xml` and `robots.txt`.

Indexing is enabled by default; the 404 page remains excluded. No client-side rendering is required for search engines to read the page content or metadata.

Every localized page also has a static Markdown version at `index.md` alongside its `index.html` (for example `/it/guide/index.md`). HTML pages link to these versions using `rel="alternate"` and `type="text/markdown"`. The Markdown content comes from the rendered page, including the guide and its limitations, with absolute links that respect the configured domain and base path.

`llms.txt` lists all 25 Markdown pages grouped by language, and `llms-full.txt` includes their complete content. These are discovery aids for AI bots. `robots.txt` allows all crawlers by default and points to the XML sitemap, which lists the canonical HTML pages and their language alternatives.

## Spoken introductions

Pre-generated WAV introductions are included in the source, so Linux CI can build the complete site without a speech engine.

To regenerate them on macOS after changing `voice.text` in the translation files:

```sh
python3 scripts/generate-voices.py
```

This optional step requires the configured macOS system voices and `ffmpeg`. Commit the updated WAV files together with the text changes.

## Privacy

File and audio processing happens in the browser. No backend or external API credentials are required to run or build TapeBytes. Audio-device permission is requested when needed. Selected files and generated audio are held in the current tab and are cleared on reload.

The HTML pages include the supplied standard Google Tag Manager snippets for container `GTM-WLRVCWSR`: the asynchronous loader in the head and the `noscript` iframe immediately after the opening body tag. Tags and their triggers are managed in that container. Set `GTM_CONTAINER_ID=` when building to omit both snippets, including for previews or offline use; otherwise the ID in `site.config.json` is used.

Keep credentials and private research out of source files. The `.gitignore` excludes local environment files and research directories, but cannot protect a secret pasted into an otherwise tracked file.

## Dual-channel data and mono capture

Data + 3 kHz reference remains the default. The Stereo/Mono radio selection defaults to Stereo, with Reference tone checked.
Mono generates a single-channel WAV and disables the reference. In Decode, Mono
uses the isolated left input (or the left channel of a stereo file), without mixing.
Switching back to Stereo enables the reference again. Turning reference off while
Stereo is selected in Encode uses both stereo channels for independent data blocks. The archive, including a single
file, is split into numbered 1 KiB blocks. Each block includes its own header and
CRC; the full archive CRC and each file's SHA-256 must pass before download.

With one copy, alternating blocks go to L and R. With two copies, each block is
repeated on the opposite channel in the next time slot. For a pair of blocks:

| Slot | Left | Right |
| --- | --- | --- |
| 1 | A | B |
| 2 | B | A |

Three and five copies continue alternating channels. Capacity estimates include
both channels, repeated headers, slot padding, the introduction and all copies.
Large archives with one copy approach twice the one-channel capacity. Two copies
trade that gain for recovery; small files and odd block counts incur padding.

A mono input must receive **one isolated channel**, never an L+R downmix. With two
or more copies, either complete isolated channel contains every block. With one
copy, a multi-block archive requires both channels and incomplete recovery fails
explicitly. A downmix cannot reliably separate the simultaneous data streams.
For data + reference tapes, an isolated left channel can be decoded with reference
correction disabled, losing the continuous speed correction.

Dual-data decoding estimates a constant speed offset per channel using the
existing preamble. It does not provide continuous wow/flutter correction. The
new mode is covered by software round-trip, dropout, channel-loss, capacity and
integrity tests, but still needs validation on physical tape and the user's deck.
Older releases cannot decode `TVBLK004`; retain an updated decoder with the archive.

### Consecutive archives

Decode scans the complete acquisition or imported WAV for consecutive block-format
archives (`TVBLK003` / `TVBLK004`) and lists their recovered files together. Each
archive is checked with CRC and each file with SHA-256 before downloads appear.
With five single-file transmissions separated by two seconds, choose an Auto stop
wait longer than two seconds (for example, five seconds), or disable Auto stop.
The default one-second wait would stop at the first gap. Reference-mode recordings
are corrected independently across sustained quiet gaps in the pilot channel.
Concatenated playback has automated PCM coverage; physical tape validation is
still dependent on signal quality and recording hardware.
