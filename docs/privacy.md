# Local file processing, privacy and security

[Documentation](README.md)

TapeBytes encodes and decodes file contents in the browser. The application does not need an account, an upload endpoint or API credentials. Audio-input permission is requested when needed. Reloading clears session files, generated audio and recovery state; explicit downloads remain on your device.

The default site configuration includes Google Tag Manager container `GTM-WLRVCWSR`. Tags are controlled by the site owner outside this repository. Local audio processing should not be described as a guarantee of zero third-party requests or no analytics. Build with `GTM_CONTAINER_ID='' npm run build` to omit the supplied snippets for a local preview or offline-oriented build.

CRC32 and SHA-256 verify data consistency. They do not encrypt files or authenticate who recorded the tape. Anyone with the recording and a compatible decoder may recover its contents. Treat recovered files like any other untrusted download.

Do not put credentials, personal captures or private SEO account information in Git. The ignore rules cover local environment files and research directories; they cannot protect a secret pasted into a tracked document.
