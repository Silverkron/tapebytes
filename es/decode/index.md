<!-- Language: es -->

Source: https://tapebytes.lucasciacca.com/es/decode/

Recuperar archivos del audio de casete — TapeBytes

Recupera archivos TapeBytes desde un WAV grabado o una entrada estéreo, con corrección de velocidad y verificación CRC32 y SHA-256.

03 / DE AUDIO A ARCHIVOS

# Recupera archivos del audio de casete.

Recupera archivos de un WAV de TapeBytes o de tu grabadora. Todo sucede en el navegador.

✓ Todo en tu dispositivo CRC32 + SHA-256

STEREO Usar la referencia del canal derecho

Izquierda: datos · Derecha: referencia de 3 kHz

01 / ENTRADA DE CINTA

## Desde tu pletina

PCM

El WAV conserva ambos canales de una entrada estéreo, aunque la corrección esté desactivada. Conecta L a la entrada 1 y R a la entrada 2. Monitor y Playback reproducen solo L.

Entrada de audio

Audio de entrada en directo −∞ dBFS

Espectro de frecuencias PCM / CH 1

Verificar entrada y filtros

Playback

Elige una entrada y activa el monitor. La captura se inicia por separado.

Acerca de Playback

Escucha por la salida predeterminada. Desactivado por defecto; usa auriculares con un micrófono. Se apaga al salir.

El permiso de audio se solicita cuando hace falta. La captura continúa hasta detenerla y usa memoria del navegador.

O / ARCHIVO WAV

## Desde un archivo de audio

¿Ya tienes una grabación? Abre el WAV de TapeBytes para recuperar los archivos.

Elige un archivo WAV Detección automática del perfil · canal izquierdo

Genera un WAV en Codificar para verificarlo aquí sin grabar una cinta.

Verificados antes de descargar Los archivos recuperados aparecerán debajo tras superar todos los controles de integridad.

✓ CRC32 + SHA-256

Ajustes de recuperación y detalles del formato

Activado por defecto para grabaciones estéreo. Desactívalo solo en grabaciones antiguas sin referencia. Se conserva el audio capturado; Playback escucha el canal izquierdo. No reconstruye audio perdido.

Mantén separados los canales izquierdo y derecho. Iguala las frecuencias de muestreo de entrada y salida y evita mezclar la monitorización directa con la reproducción. En Fast Track Pro, ajusta Mix a PB al grabar.

Corregir automáticamente la desviación constante de velocidad

Usa el tono piloto inicial; probado hasta ±5% de desviación. No sigue continuamente las fluctuaciones wow/flutter. Los archivos solo se ofrecen si todos los bloques, el CRC del archivo y los hashes son válidos.

Para corregir la velocidad, el piloto inicial debe estar en los primeros 60 segundos. Los bloques TVBLK003 pueden encontrarse después. TVFSK001/002 siguen siendo legibles.

Archivos recuperados VERIFICADO
