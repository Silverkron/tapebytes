"""Generate the spoken introductions from the same text shown in the UI (macOS)."""
import json, pathlib, subprocess, tempfile
root = pathlib.Path(__file__).resolve().parents[1]
voices = {'en': 'Samantha', 'it': 'Alice', 'es': 'Mónica', 'de': 'Anna', 'fr': 'Thomas'}
with tempfile.TemporaryDirectory() as tmp:
    for lang, voice in voices.items():
        text = json.loads((root / f'src/locales/{lang}.json').read_text())['voice.text']
        source = pathlib.Path(tmp) / f'{lang}.txt'
        audio = pathlib.Path(tmp) / f'{lang}.aiff'
        source.write_text(text)
        subprocess.run(['say', '-v', voice, '-r', '155', '-f', str(source), '-o', str(audio)], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(audio), '-ar', '48000', '-ac', '1', '-c:a', 'pcm_s16le', str(root / f'src/assets/audio/{lang}.wav')], check=True)
        print(f'Generated {lang} introduction')
