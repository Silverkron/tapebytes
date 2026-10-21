# Dateien auf Kassette aufnehmen und wiederherstellen

[Übersicht](README.md) · [Ausführliche englische Anleitung](../getting-started.md)

## Aufnahme vorbereiten

Verbinde Stereo-LINE-OUT des Computers/Interfaces mit LINE IN des Decks. Zur Wiedergabe führt LINE OUT des Decks zum LINE IN des Interfaces. Links und rechts müssen getrennt bleiben. Ein Mono-Mikrofoneingang ersetzt keinen Stereo-Line-Eingang.

Beginne mit einer kleinen Datei, FSK 300, passender Seitenlänge und Kopienzahl. Erzeuge das WAV. Wähle im Studio den Ausgang und stelle mit dem Kalibrierton den Aufnahmepegel am Deck ohne Übersteuerung ein. Der Wiedergaberegler startet bei 100%, bleibt aber verstellbar. Spule über das Vorspannband, drücke REC am Gerät und starte den Countdown. TapeBytes gibt Audio aus; es steuert nicht die Tasten des Decks.

![Studio mit erzeugtem WAV und Kalibrierung, englische Oberfläche](../assets/studio.jpg)

## Wiederherstellung

Spule zurück. Wähle unter Dekodieren den Eingang und aktiviere die Überwachung. Prüfe Stereo/Mono und Referenzton passend zur Aufnahme. Die automatische Erkennung liest die gemeldete Kanalzahl, nicht den Audioinhalt. Starte die Erfassung und drücke PLAY. Beende sie manuell oder mit Auto stop.

Eine unbearbeitete Audacity-WAV kann über die Dateiquelle importiert werden. Vermeide MP3, Rauschfilter und Mono-Mischung. Erst nach erfolgreicher Prüfung herunterladen; Originaldateien weiter aufbewahren.

## Mehrere Signale

Auto stop wartet standardmäßig eine Sekunde nach Signalende. Bei fünf Signalen mit jeweils zwei Sekunden Pause wähle fünf Sekunden oder schalte Auto stop aus. Vollständige Archive der aktuellen Blockformate werden gemeinsam wiederhergestellt. Die Aufnahme startet nach dem Stoppen nicht automatisch neu. Beschädigte Archive können fehlen.

## Häufige Probleme

- **Knacken/Aussetzer:** Abtastraten und Takt prüfen. Unter macOS Audio-MIDI-Setup öffnen, Ein- und Ausgang zunächst auf 48 kHz setzen und den Eingang erneut aktivieren. Auch Treiber, USB und Übersteuerung kommen infrage.
- **Kein Signal:** Eingang, Kabel, PLAY und Pegel prüfen; das Original-WAV direkt testen.
- **Ungültige Referenz:** Der getrennte Referenzton muss rechts liegen. Bei Aufnahmen ohne Pilot die Option deaktivieren.
- **Nur ein Kanal:** Prüfen, was Browser und Interface tatsächlich bereitstellen. Stereo-Daten mit einer Kopie können beide Kanäle benötigen.
- **Anderer Playback-Klang:** Die Überwachung spielt nur links ab; Stereo-Erfassung bewahrt beide Kanäle.
- **Zu früher Stop:** Wartezeit erhöhen. Dauerndes Rauschen kann das automatische Stoppen verhindern.
- **CRC-/SHA-Fehler:** Nicht ignorieren; erneut erfassen oder langsamer, mit besseren Pegeln und mehr Kopien aufnehmen.

Für eine Fehlermeldung Browser, OS, Deck, Interface, Abtastrate, Modus und Kopien nennen. [Vollständige Fehlerbehebung auf Englisch](../troubleshooting.md).
