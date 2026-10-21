# TapeBytes — digitale Dateien auf Audiokassetten speichern

[English](../../README.md) · [Italiano](../it/README.md) · [Español](../es/README.md) · **Deutsch** · [Français](../fr/README.md)

**Kleine Dateien in Audio umwandeln, auf Kassette aufnehmen und im Browser wiederherstellen.** TapeBytes ist eine kostenlose Browser-Anwendung für Retrocomputing, Maker und Experimente mit Datenübertragung per Ton. FSK/4-FSK erzeugt das WAV-Signal; CRC32 und SHA-256 prüfen die wiederhergestellten Dateien vor dem Download.

[TapeBytes auf Deutsch öffnen](https://tapebytes.lucasciacca.com/de/) · [Anleitung und Fehlerbehebung](anleitung.md) · [Technische Dokumentation auf Englisch](../README.md)

![Animierte TapeBytes-Kassette mit violetten Akzenten und blauen Anzeigen](../assets/cassette-preview.gif)

*Dekorative Animation der Oberfläche, keine tatsächliche Bandaufnahme. [Standbild](../assets/cassette-preview.jpg).*

## Ohne Kassettendeck ausprobieren

Wähle beim Kodieren die kleine Beispieldatei. Lass Stereo und Referenzton aktiviert; die gesprochene Einleitung kannst du abschalten. Erzeuge das WAV und prüfe es unter Dekodieren über die Dateiquelle. Nach erfolgreicher Integritätsprüfung kannst du die Datei herunterladen. Das prüft den Softwareweg, nicht die physische Aufnahme.

## Audiomodi

| Modus | Links | Rechts |
| --- | --- | --- |
| Stereo mit Referenz, Standard | Daten | 3-kHz-Ton zur Zeitkorrektur |
| Stereo ohne Referenz | Datenblöcke | Weitere Datenblöcke |
| Mono | Daten | Unbenutzt |

FSK bietet 300/600/1.200 bit/s, 4-FSK 1.200/2.400 bit/s, jeweils mit 1/2/3/5 Kopien. Zwei Kopien wiederholen die Blöcke später auf dem jeweils anderen Kanal. L und R nicht zu Mono zusammenmischen.

Eine C60 hat 30 Minuten pro Seite. Bei 300 bit/s sind theoretisch 67.500 Byte pro Datenkanal möglich, bei 2.400 bit/s 540.000 Byte — jeweils vor Verwaltungsdaten, Pausen und Kopien. Maßgeblich ist die Schätzung beim Kodieren.

## Voraussetzungen und Grenzen

Für den Standardmodus brauchst du ein Stereo-Deck mit LINE IN/OUT und einen Stereo-Eingang am Rechner oder Audiointerface. Browser-Aufnahme benötigt HTTPS oder localhost und eine Audiofreigabe. Der Referenzton hilft bei Gleichlaufschwankungen, ersetzt aber keine verlorenen Samples und beseitigt keine Übersteuerung. Originaldateien behalten. TapeBytes ist kein universeller Dekodierenr alter Heimcomputer-Kassetten und kein MP3-Konverter.

```sh
git clone https://github.com/Silverkron/tapebytes.git
cd tapebytes
npm run build
npm test
npm run dev
```

Node.js 22+ und Python 3 sind erforderlich; keine npm-Pakete müssen installiert werden. Öffne [localhost:8765/de/](http://127.0.0.1:8765/de/).

Dateien werden lokal verarbeitet. Die Website-Konfiguration enthält dennoch Google Tag Manager. [Datenschutz auf Englisch](../privacy.md). Übersicht und Anleitung sind deutsch; die vollständige technische Referenz bleibt englisch. Eine allgemeine Projektlizenz liegt derzeit nicht vor; öffentlicher Quellcode ist nicht automatisch Open Source im lizenzrechtlichen Sinn.
