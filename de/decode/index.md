<!-- Language: de -->

Source: https://tapebytes.lucasciacca.com/de/decode/

Dateien aus Kassettenaudio wiederherstellen — TapeBytes

Stelle TapeBytes-Dateien aus einer WAV-Aufnahme oder einem Stereoeingang wieder her, mit Bandgeschwindigkeitskorrektur sowie CRC32- und SHA-256-Prüfung.

03 / AUDIO ZU DATEIEN

# Dateien aus Kassettenaudio wiederherstellen.

Dateien aus einer TapeBytes-WAV oder vom Kassettendeck wiederherstellen. Alles läuft im Browser.

✓ Alles bleibt auf diesem Gerät CRC32 + SHA-256

STEREO Referenz des rechten Kanals verwenden

Links: Daten · Rechts: 3-kHz-Referenz

01 / BANDEINGANG

## Von deinem Kassettendeck

PCM

Die WAV-Aufnahme erhält beide Kanäle eines Stereoeingangs, auch ohne Referenzkorrektur. L mit Eingang 1 und R mit Eingang 2 verbinden. Monitor und Playback nutzen nur L.

Audioeingang

Live-Audioeingang −∞ dBFS

Frequenzspektrum PCM / CH 1

Eingang und Filter prüfen

Playback

Eingang auswählen und Monitor aktivieren. Die Aufnahme startet separat.

Über Playback

Über den Standardausgang hören. Anfangs aus; bei Mikrofonen Kopfhörer verwenden. Beim Verlassen wird es ausgeschaltet.

Audioberechtigung wird bei Bedarf angefordert. Die Aufnahme läuft bis zum Stopp und nutzt Browserspeicher.

ODER / WAV-DATEI

## Aus einer Audiodatei

Schon eine Aufnahme vorhanden? Öffne die TapeBytes-WAV, um Dateien wiederherzustellen.

WAV-Datei auswählen Automatische Profilerkennung · linker Kanal

Erzeuge unter Kodieren eine WAV und prüfe sie hier ohne Kassettenaufnahme.

Vor dem Download geprüft Wiederhergestellte Dateien erscheinen unten, sobald alle Integritätsprüfungen bestanden sind.

✓ CRC32 + SHA-256

Wiederherstellung und Formatdetails

Für Stereoaufnahmen standardmäßig aktiv. Nur für alte Aufnahmen ohne Referenz ausschalten. Das aufgenommene Audio bleibt erhalten; Playback gibt den linken Kanal wieder. Fehlendes Audio wird nicht rekonstruiert.

Halte linken und rechten Kanal getrennt. Gleiche die Abtastraten von Ein- und Ausgang ab und vermeide eine Mischung aus Direktmonitoring und Wiedergabe. Stelle bei der Fast Track Pro während der Aufnahme Mix auf PB.

Konstante Bandgeschwindigkeitsabweichung automatisch korrigieren

Nutzt den anfänglichen Pilotton; mit Abweichungen bis ±5% getestet. Keine kontinuierliche Nachführung von Gleichlaufschwankungen. Dateien werden nur bei gültigen Blöcken, Archiv-CRC und Datei-Hashes angeboten.

Zur Geschwindigkeitskorrektur muss der anfängliche Pilot in den ersten 60 Sekunden liegen. TVBLK003-Blöcke können später gefunden werden. TVFSK001/002 bleiben lesbar.

Wiederhergestellte Dateien GEPRÜFT
