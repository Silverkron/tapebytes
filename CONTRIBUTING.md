# Contributing to TapeBytes

Thank you for helping make browser-based cassette data storage easier to understand and reproduce.

## Before changing code

Read the [architecture](docs/architecture.md) and [limitations](docs/limitations.md). Preserve existing tape formats; a visual change must not silently alter audio routing or encoding. Discuss new formats before implementation, especially changes affecting older recordings.

Use Node.js 22+; there are no npm packages to install. Run `npm run build` and `npm test`. For UI changes, inspect light/dark themes, narrow layouts, keyboard navigation and all five languages. The local server uses `npm run dev`.

## Report a bug

Open an [issue](https://github.com/Silverkron/tapebytes/issues) with expected/actual behavior, steps, browser/OS, deck/interface, sample rate, modulation, copies and channel mode. Distinguish generated-WAV tests from physical tape tests. A small non-sensitive test file and unprocessed WAV are more useful than a long recording with unknown settings.

## Documentation and translations

English is the technical reference. Update linked docs when behavior changes. Localized entry points and practical guides live under `docs/it`, `docs/es`, `docs/de` and `docs/fr`; UI translations remain in `src/locales`. Preserve code identifiers, units and links. Mark English-only deep links rather than implying full translation coverage.

Keep screenshots honest: use built-in or synthetic data and distinguish idle monitors, generated-WAV verification and physical captures. Update [media notes](docs/assets/README.md) with capture date and source revision. Prefer useful headings and descriptive alt text over repeated SEO keywords.

Use Conventional Commits, for example `docs: explain stereo cassette capture`. Do not commit generated output, credentials or private recordings. No project-wide license is currently specified; clarify reuse/contribution terms with the maintainer where needed.
