# Cómo grabar y recuperar archivos en casete

[Introducción](README.md) · [Guía técnica en inglés](../getting-started.md)

## Grabar

Conecta LINE OUT estéreo del ordenador o interfaz a LINE IN de la pletina. Para recuperar, conecta LINE OUT de la pletina a LINE IN de la interfaz. Mantén L/R separados; una entrada de micrófono mono no sustituye una entrada de línea estéreo.

Elige un archivo pequeño, FSK 300, duración y copias. Genera el WAV. En Estudio selecciona la salida y usa el tono de calibración para ajustar el nivel de la pletina sin saturación. El volumen de reproducción empieza al 100% y es ajustable. Avanza más allá de la cinta guía, pulsa REC físicamente e inicia la cuenta atrás. TapeBytes reproduce audio, pero no maneja los botones de la pletina.

![Estudio preparado para grabar; interfaz en inglés](../assets/studio.jpg)

## Recuperar

Rebobina, selecciona la entrada en Decodificar y activa el monitor. Comprueba Stereo/Mono y Tono de referencia según la grabación. La detección automática usa el número de canales informado por el dispositivo; no reconoce el contenido. Inicia la captura y pulsa PLAY. Después usa Stop and decode o Auto stop.

También puedes importar un WAV sin procesar grabado en Audacity desde la fuente de archivo. Evita MP3, reducción de ruido y mezclas mono. Descarga los archivos después de la verificación; conserva los originales.

## Varias transmisiones

Auto stop está activado con un segundo de espera. Para cinco señales separadas por dos segundos, selecciona cinco segundos o desactívalo. El decodificador recupera los archivos completos de los formatos de bloques actuales. No reinicia automáticamente la captura ni garantiza recuperar transmisiones dañadas.

## Problemas frecuentes

- **Chasquidos:** revisa la frecuencia de muestreo y el reloj. En macOS, comprueba Configuración de Audio MIDI; prueba entrada y salida a 48 kHz y vuelve a activar la entrada. También pueden influir drivers, USB y saturación.
- **Sin señal:** comprueba entrada, cableado, PLAY y niveles; prueba el WAV original.
- **Referencia inválida:** el tono debe estar separado en R. Desmarca la opción si grabaste sin él.
- **Un solo canal:** verifica qué canales expone la interfaz al navegador. El modo estéreo de datos con una copia puede necesitar ambos.
- **Playback diferente:** el monitor reproduce solo L; la captura estéreo conserva L/R.
- **Parada temprana:** aumenta la espera; el ruido continuo puede impedir Auto stop.
- **Error CRC/SHA:** no lo ignores. Repite la captura o graba a menor velocidad, con mejores niveles o más copias.

La captura requiere HTTPS/localhost y permiso de audio. Al informar un fallo, indica navegador, sistema, pletina, interfaz, frecuencia, modo y copias. [Resolución de problemas completa en inglés](../troubleshooting.md).
