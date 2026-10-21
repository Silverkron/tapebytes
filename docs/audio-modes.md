# Cassette data capacity, stereo modes and redundancy

[Documentation](README.md) · [Setup guide](getting-started.md) · [Format implementation](../src/assets/codec.js)

## Three channel modes

**Stereo + reference** uses left-channel data and a continuous 3 kHz tone on the right. The decoder validates the pilot and reconstructs timing from it. This is the default, and helps with tape-speed drift and variations. It cannot reconstruct missing samples or reverse clipping.

**Stereo data** uses both channels for blocks of one archive. Uncheck Reference tone while Stereo is selected. This does not create two independent user files: even a single file can be split across L and R and reconstructed on decode.

**Mono** writes one data channel. Decode uses the isolated left input, or the left channel of a stereo WAV, without averaging L and R. Reference correction is disabled. To recover a reference recording from an isolated left channel, disable the reference and accept losing continuous correction.

## Copies and block placement

Archives are divided into 1 KiB blocks. Each has an index and CRC. With one-copy stereo data, successive blocks occupy alternating channels. With two copies:

| Time slot | L | R |
| --- | --- | --- |
| 1 | Block A | Block B |
| 2 | Block B | Block A |

Copies cross channels at different times. Three and five copies continue this pattern. The decoder keeps valid blocks belonging to the same archive; redundancy is repeated data, not Reed–Solomon error correction.

An isolated channel of a complete dual-data recording with two or more copies can contain every block. One-copy multi-block recordings require both channels. **An L+R downmix is not an isolated channel** and cannot reliably separate the simultaneous signals.

## Modulation profiles

| Profile | Data rate per data channel | Tones |
| --- | ---: | --- |
| FSK | 300 bit/s | 1,200 / 2,400 Hz |
| FSK | 600 bit/s | 1,200 / 2,400 Hz |
| FSK | 1,200 bit/s | 1,200 / 2,400 Hz |
| 4-FSK | 1,200 bit/s | 1,200 / 1,800 / 2,400 / 3,000 Hz |
| 4-FSK | 2,400 bit/s | 1,200 / 2,400 / 3,600 / 4,800 Hz |

The reference is 3 kHz on a separate channel. Sample rate (48,000 samples/s in generated WAVs), carrier frequency (Hz) and data rate (bit/s) are different quantities. Neither the highest tone nor the sample rate is the file transfer rate.

## Capacity

The raw ceiling for one data channel is `seconds × bits per second / 8`. A C60 side at 300 bit/s has a 67,500-byte ceiling before overhead; at 2,400 bit/s it is 540,000 bytes. One KiB is 1,024 bytes.

Actual capacity includes metadata, block headers, synchronization, gaps, introductions and copies. Dual data approaches double capacity only for sufficiently large one-copy archives. Short files and an odd block count incur padding. Two copies use much of the gain for resilience. The UI calculates the usable estimate for your actual settings.

No preset file-count or file-size cap is imposed, but browser memory, available tape duration and the roughly 4 GiB RIFF limit still apply. There is no automatic splitting across cassette sides. Stereo WAVs take about twice the space of equal-duration mono WAVs.

## Compatibility and validation

Mono/data + reference use `TVBLK003`; stereo data uses `TVBLK004`. The decoder retains support for `TVFSK001` and `TVFSK002`. Older TapeBytes releases cannot read the new stereo format. Save a matching decoder with a long-lived experiment.

Dual-data mode estimates a constant speed offset per channel rather than applying the continuous reference correction. Its software tests cover different profiles, channel loss, dropout and timing offsets. Reliable performance on a specific deck still needs a physical round trip.
