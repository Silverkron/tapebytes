<!-- Language: de -->

Source: https://tapebytes.lucasciacca.com/de/decode/

Dateien aus Kassettenaudio wiederherstellen — TapeBytes

Stelle TapeBytes-Dateien aus einer WAV-Aufnahme oder einem Stereoeingang wieder her, mit Bandgeschwindigkeitskorrektur sowie CRC32- und SHA-256-Prüfung.

03 / AUDIO ZU DATEIEN

# Dateien aus Kassettenaudio wiederherstellen.

Dateien aus einer TapeBytes-WAV oder vom Kassettendeck wiederherstellen. Alles läuft im Browser.

✓ Alles bleibt auf diesem Gerät CRC32 + SHA-256

Audioeingang

Playback

Eingang auswählen und Monitor aktivieren. Die Aufnahme startet separat.

Audiokanäle Stereo

Mono

Stereo/Mono wird beim Aktivieren anhand der gemeldeten Eingangskanäle gewählt. Eine manuelle Auswahl ist möglich. Audioinhalt und Referenzton werden dabei nicht erkannt.

Referenzton

Referenz aktiv: Daten links, 3-kHz-Referenz rechts. Deaktivieren, um beide Kanäle für Daten zu nutzen. Bei zwei Kopien wechseln die Blöcke zeitversetzt den Kanal; die Kapazität entspricht ungefähr einem Datenkanal.

Anschlüsse und Funktionsweise

Mono-Eingang: einen isolierten Kanal anschließen, niemals L + R mischen. Stereodaten ×1 benötigen beide Kanäle; bei ×2 enthält jeder vollständige Kanal alle Blöcke. Referenzkorrektur erfordert Stereo. Der linke Datenkanal kann ohne Korrektur gelesen werden. Der neue Stereodatenmodus muss noch am Kassettendeck geprüft werden.

01 / BANDEINGANG

## Von deinem Kassettendeck

STEREO / PCM

L · Daten −∞ dBFS

Frequenzspektrum 0 — 8 kHz

R · Referenz −∞ dBFS

Frequenzspektrum 0 — 8 kHz

R · Referenz Gemessene Referenzfrequenz — Hz

Eingang aktivieren, um die Referenz zu messen.

Auto stop

ⓘ

Nach mindestens 0,25 s Signal über −36 dBFS wird gestoppt und decodiert, sobald alle aufgenommenen Kanäle für die gewählte Zeit (standardmäßig 1 s) unter −42 dBFS bleiben. Anfängliche Stille löst keinen Stopp aus. Starkes Rauschen kann den Stopp verhindern; dann manuell stoppen und decodieren.

Wartezeit ohne Signal

Audioberechtigung wird bei Bedarf angefordert. Die Aufnahme läuft bis zum Stopp und nutzt Browserspeicher.

ODER / WAV-DATEI

## Aus einer Audiodatei

Schon eine Aufnahme vorhanden? Öffne die TapeBytes-WAV, um Dateien wiederherzustellen.

WAV-Datei auswählen Automatische Profilerkennung · getrennte Audiokanäle

Erzeuge unter Kodieren eine WAV und prüfe sie hier ohne Kassettenaufnahme.

## Vor dem Download geprüft

Wiederhergestellte Dateien erscheinen unten, sobald alle Integritätsprüfungen bestanden sind.

✓ CRC32 + SHA-256

Wiederherstellung und Formatdetails

Die WAV-Aufnahme erhält beide Kanäle eines Stereoeingangs, auch ohne Referenzkorrektur. L mit Eingang 1 und R mit Eingang 2 verbinden. Die Anzeige zeigt beide Kanäle; Playback gibt nur L wieder.

Standardmäßig für Daten + Referenz aktiv. Für Stereodaten oder ältere Monoaufnahmen deaktivieren. Audio bleibt unverändert; Playback gibt nur links wieder.

Eingang und Filter prüfen

Über Playback

Über den Standardausgang hören. Anfangs aus; bei Mikrofonen Kopfhörer verwenden. Beim Verlassen wird es ausgeschaltet.

Halte linken und rechten Kanal getrennt. Gleiche die Abtastraten von Ein- und Ausgang ab und vermeide eine Mischung aus Direktmonitoring und Wiedergabe. Stelle bei der Fast Track Pro während der Aufnahme Mix auf PB.

Konstante Bandgeschwindigkeitsabweichung automatisch korrigieren

Nutzt den anfänglichen Pilotton; mit Abweichungen bis ±5% getestet. Keine kontinuierliche Nachführung von Gleichlaufschwankungen. Dateien werden nur bei gültigen Blöcken, Archiv-CRC und Datei-Hashes angeboten.

Zur Geschwindigkeitskorrektur muss der anfängliche Pilot in den ersten 60 Sekunden liegen. TVBLK003-Blöcke können später gefunden werden. TVFSK001/002 bleiben lesbar.

Wiederhergestellte Dateien GEPRÜFT
