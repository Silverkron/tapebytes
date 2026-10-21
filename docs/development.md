# Developing and building TapeBytes

[Documentation](README.md) · [Deployment](deployment.md) · [Contributing](../CONTRIBUTING.md)

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


## Spoken introductions

Pre-generated WAV introductions are included in the source, so Linux CI can build the complete site without a speech engine.

To regenerate them on macOS after changing `voice.text` in the translation files:

```sh
python3 scripts/generate-voices.py
```

This optional step requires the configured macOS system voices and `ffmpeg`. Commit the updated WAV files together with the text changes.


## Documentation source

The root README is the English project entry point. `docs/` contains focused
manuals, four translated overview/guide pairs, screenshots and illustrations.
These repository Markdown files are not automatically added to the static-site
build. Website copy remains in `src/locales/` and templates in `build.mjs`.

Use relative links so documents work on GitHub and in local clones. Keep
captions accurate and verify image paths after moves. The [media notes](assets/README.md)
explain capture provenance. English technical documents are the source of truth;
translated overview pages explicitly link to them.

## License status

No project-wide LICENSE file is present as of 2026-10-21. This documentation does
not choose a license on the maintainer's behalf. Do not label the repository
MIT-licensed or generally open source without an explicit license decision.
Silkscreen's bundled font license is in
[src/assets/fonts/OFL.txt](../src/assets/fonts/OFL.txt); it does not license the
whole project.
