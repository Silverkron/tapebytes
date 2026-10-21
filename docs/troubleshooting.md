# Troubleshooting cassette capture and file recovery

[Documentation](README.md) · [Quick start](getting-started.md) · [Known limits](limitations.md)

Start by verifying the generated WAV directly. If that works but tape playback fails, compare an unprocessed recording from another application with the browser capture. Change one setting at a time and retain the original capture.

## Crackling, clicks or gaps

Check the audio interface's configured sample rate. On macOS, open **Audio MIDI Setup** and inspect the selected interface's input and output formats. Matching them at **48 kHz** is a useful starting point for this project. Disable and re-enable input in TapeBytes after changing interface settings.

A rate/clock mismatch can contribute to crackling; it is not the only possible cause. If it persists, check driver stability, USB connections, clipping and CPU load. Compare captures of the same passage in Audacity and TapeBytes. A clean Audacity file but damaged browser capture points toward the browser capture path or its device configuration, rather than proving a codec problem.

TapeBytes requests echo cancellation, noise suppression and automatic gain control to be disabled. Browser/device support varies: inspect the reported audio diagnostics rather than assuming the request guarantees a completely untouched hardware path. Timing correction cannot repair missing samples.

## No signal or no TapeBytes signal found

- Confirm that the selected device is the deck's actual LINE IN capture path.
- Enable monitoring, press PLAY, and check whether either waveform moves.
- Check cables, deck output level and interface line/mic selection.
- Match the channel mode and Reference tone option to the recording.
- Capture the full signal, including its beginning; test a lower rate and a smaller file.
- Try **From file** with the original generated WAV to isolate hardware from software.

The legacy decoder has a limited header-search window. Current block-format scanning is different; an error mentioning the first 60 seconds should not be interpreted as a universal recording-length limit.

## Reference tone missing, mixed or invalid

Reference mode needs data on L and a separate continuous 3 kHz signal on R. If the recording was created without the reference, uncheck Reference tone in Decode. If the WAV has only one channel, use Mono or re-capture stereo.

Check that the OS/interface is not summing channels, that cabling preserves stereo, and that the deck really recorded the channels separately. A correct original WAV does not prove the physical recording path stayed stereo. The frequency readout is an estimate for the pilot, not proof that the file will decode.

## Only one channel is recorded

Stereo/Mono autodetection uses the channel count reported by the device. Some browser or interface paths expose one channel even when the hardware has several physical inputs. Select the appropriate input and inspect diagnostics. Autodetection cannot infer how cables are connected.

With one-copy dual-data stereo, one isolated channel can be insufficient for a multi-block archive. Two or more copies may allow recovery from one complete isolated channel. Do not downmix both signals. See [channel modes](audio-modes.md).

## Auto stop ends too soon—or never ends

The default is one second below the detector's quiet threshold after signal has been detected. Increase it or switch it off when recordings contain pauses. Five seconds works for the example of two-second inter-archive gaps. Persistent tape hiss or other audio may prevent a stop; use **Stop and decode** manually.

Auto stop does not check archive completeness before stopping and does not restart recording automatically. A quiet intro or an unexpectedly weak data signal can affect level-based detection.

## Playback sounds different from a stereo recording

Input Playback monitors only the left channel. With data/reference recordings this means hearing the data without the right-hand pilot. Stereo capture itself uses the separate source channels. This difference alone does not prove filtering. Avoid monitoring through a loop that feeds output back into input.

## CRC, SHA-256 or incomplete-block errors

The decoder does not offer files whose required checks fail. Re-capture at a lower recording level if clipped; try a lower data rate or more copies for a new recording. Clean and maintain the deck according to its manual. Neither redundancy nor pilot correction guarantees recovery from severely damaged audio.

Several archives can be recovered from one capture, but the result is not an inventory of every transmission that existed on the cassette. Incomplete archives may not be recovered. Compare recovered filenames with your own recording log.

## Browser permission or output selection problems

Use HTTPS or localhost. Grant input permission to the intended site, select the right device, and check whether another application is holding it exclusively. If output selection is unavailable in the browser, choose the device in OS settings. Browser support is feature-dependent; this project does not claim an exhaustive browser compatibility matrix.

## Slow operation or large recordings

WAV generation, capture and recovery consume memory. Avoid very long unattended capture sessions, close other heavy tabs, and start with small files. Export the WAV before reloading: selected files, generated audio and recovery results are session state.

## Report a useful issue

Use the [GitHub issue tracker](https://github.com/Silverkron/tapebytes/issues). Include browser/version, OS, deck, audio interface, driver, sample rate, channel mode, profile, copies, error text and the smallest reproducible steps. Say whether the original WAV and an Audacity capture decode. Use synthetic files and recordings; do not attach private conversations or personal data.
