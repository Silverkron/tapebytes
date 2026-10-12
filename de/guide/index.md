<!-- Language: de -->

Source: https://tapebytes.lucasciacca.com/de/guide/

Daten auf Kassette: Kapazität und Anleitung — TapeBytes

Erfahre, wie viele Daten auf eine Kassette passen, welche Geräte du brauchst und wie du Dateien mit TapeBytes aufnimmst und wiederherstellst.

HANDBUCH / VOR DER AUFNAHME

# Daten auf Audiokassetten speichern

Deine erste vollständige Hin- und Rückwandlung

- Unter Codieren Dateien, Modulation und Redundanz wählen. Die rechte Referenz ist standardmäßig aktiv.
- Stereo-WAV erzeugen: Daten links, 3-kHz-Referenz rechts. Die Sprachansage ist optional.
- Im Studio beide Ausgänge mit dem Deck verbinden, Pegel einstellen, REC am Deck drücken und den Countdown starten.
- Zurückspulen und beide Kanäle unter Decodieren aufnehmen oder eine Stereo-WAV importieren. Referenzkorrektur aktiviert lassen und geprüfte Dateien herunterladen.

## TVBLK003 / FSK

TVBLK003 nutzt 1-KiB-Blöcke mit Synchronisation, 300-bit/s-Header und CRC. Profile: FSK 300/600/1200, 4-FSK 1200/2400. Die Folge wird 1/3/5-mal wiederholt, um gültige Blöcke verschiedener Kopien zu kombinieren. Archiv-CRC und Datei-SHA-256 müssen stimmen. TVFSK001/002 bleiben lesbar.

## Lokale Verarbeitung

Dateien und Audio bleiben in diesem Tab. Keine Konten oder Datei-Uploads. Die Website integriert Google Tag Manager. Berechtigungen für Audiogeräte werden erst angefordert, wenn du die entsprechenden Funktionen nutzt. Für Audioeingänge sind ein kompatibler Browser und HTTPS oder localhost erforderlich.

Bereits verfügbar

Die rechte Referenz verfolgt Geschwindigkeitsschwankungen vor der Decodierung. Stereoaufnahme und Wiederherstellung mit CRC- und SHA-256-Prüfung sind verfügbar. Für alte Monoaufnahmen Referenzkorrektur ausschalten.

## Praktische Grenzen

Die Referenz korrigiert das Timing, nicht fehlende Samples oder starke Verzerrungen. Höhere Datenraten erfordern ein saubereres Signal. Keine automatische Aufteilung auf Bandseiten. Ohne gültige Kopie eines Blocks scheitert die Wiederherstellung.

## Anschlüsse prüfen

Halte linken und rechten Kanal getrennt. Gleiche die Abtastraten von Ein- und Ausgang ab und vermeide eine Mischung aus Direktmonitoring und Wiedergabe. Stelle bei der Fast Track Pro während der Aufnahme Mix auf PB.

## Knacken oder fehlende Referenz?

Nach Formatänderungen den Eingang aus- und einschalten. Stereoanschlüsse, Pegel und Abtastraten prüfen. Zum Vergleich eine Stereo-WAV aus Audacity importieren. Die Referenz ersetzt kein fehlendes Audio.

## Animation und Barrierefreiheit

Animationen folgen dem tatsächlichen Fortschritt. Anzeigen verwenden das Audiosignal. Reduzierte Bewegung deaktiviert dekorative Animationen; ausgeblendete Tabs stoppen visuelle Aktualisierungen.

Die Ansage nennt die Website zur Wiederherstellung: tapebytes.lucasciacca.com. Sie hilft, die Aufnahme später zuzuordnen.

## Wie viele Daten passen auf eine Audiokassette?

Die Kapazität hängt von Laufzeit, Datenrate und Redundanz ab. Eine C60 bietet 30 Minuten pro Seite: Bei 300 bit/s liegt die theoretische Obergrenze vor Headern, Metadaten und Pausen bei 67.500 Bytes, bei 2400 bit/s bei 540.000 Bytes. Die nutzbare Kapazität ist geringer; drei oder fünf Kopien benötigen mehr Zeit. Kodieren berechnet die Schätzung anhand deiner Dateien und Einstellungen. Die Stereoreferenz verbessert die Zeitkorrektur, nicht die Kapazität.

## Welche Geräte brauche ich?

Einen Stereo-Kassettenrekorder mit Line-Eingang und -Ausgang, passende Kabel und einen Computer mit Stereo-Audioeingang und -ausgang. Eine USB-Audioschnittstelle kann diese Anschlüsse bereitstellen. Erzeuge zunächst eine WAV-Datei und prüfe sie direkt unter Dekodieren, bevor du eine Kassette aufnimmst.

## Kann ich jede Kassettenaufnahme dekodieren?

TapeBytes liest sein eigenes Datenformat einschließlich unterstützter älterer Versionen. Es ist kein allgemeiner Decoder für Commodore-, ZX-Spectrum- oder Kansas-City-Standard-Kassetten und kein Werkzeug zur Musikdigitalisierung. Beginne mit einer kleinen Datei und prüfe Aufnahme und Wiederherstellung mit deinen Geräten.

[Kapazität unter Kodieren schätzen](https://tapebytes.lucasciacca.com/de/encode/)
