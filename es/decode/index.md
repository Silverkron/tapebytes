<!-- Language: es -->

Source: https://tapebytes.lucasciacca.com/es/decode/

Recuperar archivos del audio de casete — TapeBytes

Recupera archivos TapeBytes desde un WAV grabado o una entrada estéreo, con corrección de velocidad y verificación CRC32 y SHA-256.

03 / DE AUDIO A ARCHIVOS

# Recupera archivos del audio de casete.

Recupera archivos de un WAV de TapeBytes o de tu grabadora. Todo sucede en el navegador.

✓ Todo en tu dispositivo CRC32 + SHA-256

Entrada de audio

Playback

Elige una entrada y activa el monitor. La captura se inicia por separado.

Canales de audio Estéreo

Mono

Estéreo/Mono se selecciona según los canales declarados al activar la entrada. Puedes cambiarlo manualmente. No identifica el contenido ni la presencia del tono de referencia.

Tono de referencia

Referencia activada: datos a la izquierda, referencia de 3 kHz a la derecha. Desactívala para usar ambos canales para datos. Con dos copias, los bloques se cruzan entre canales en momentos distintos; la capacidad es similar a un canal de datos.

Conexiones y funcionamiento

Entrada mono: conecta un canal aislado, nunca la suma I + D. Los datos estéreo ×1 necesitan ambos canales; con ×2 cada canal completo contiene todos los bloques. La corrección por referencia requiere estéreo. Puedes leer el canal izquierdo desactivando la corrección. El nuevo modo de datos estéreo aún requiere pruebas en la pletina.

01 / ENTRADA DE CINTA

## Desde tu pletina

STEREO / PCM

L · Datos −∞ dBFS

Espectro de frecuencias 0 — 8 kHz

R · Referencia −∞ dBFS

Espectro de frecuencias 0 — 8 kHz

R · Referencia Frecuencia de referencia medida — Hz

Activa la entrada para medir la referencia.

Auto stop

ⓘ

Tras al menos 0,25 s por encima de −36 dBFS, detiene y decodifica cuando todos los canales quedan por debajo de −42 dBFS durante el tiempo elegido (1 s por defecto). No se activa en el silencio inicial. El ruido alto puede impedir la parada; usa Detener y decodificar.

Espera sin señal

El permiso de audio se solicita cuando hace falta. La captura continúa hasta detenerla y usa memoria del navegador.

O / ARCHIVO WAV

## Desde un archivo de audio

¿Ya tienes una grabación? Abre el WAV de TapeBytes para recuperar los archivos.

Elige un archivo WAV Detección automática del perfil · canales de audio separados

Genera un WAV en Codificar para verificarlo aquí sin grabar una cinta.

## Verificados antes de descargar

Los archivos recuperados aparecerán debajo tras superar todos los controles de integridad.

✓ CRC32 + SHA-256

Ajustes de recuperación y detalles del formato

El WAV conserva ambos canales de una entrada estéreo, aunque la corrección esté desactivada. Conecta L a la entrada 1 y R a la entrada 2. El visualizador muestra ambos canales; Playback reproduce solo L.

Activada por defecto para datos + referencia. Desactívala para datos estéreo o grabaciones mono antiguas. El audio se conserva; Playback escucha solo el canal izquierdo.

Verificar entrada y filtros

Acerca de Playback

Escucha por la salida predeterminada. Desactivado por defecto; usa auriculares con un micrófono. Se apaga al salir.

Mantén separados los canales izquierdo y derecho. Iguala las frecuencias de muestreo de entrada y salida y evita mezclar la monitorización directa con la reproducción. En Fast Track Pro, ajusta Mix a PB al grabar.

Corregir automáticamente la desviación constante de velocidad

Usa el tono piloto inicial; probado hasta ±5% de desviación. No sigue continuamente las fluctuaciones wow/flutter. Los archivos solo se ofrecen si todos los bloques, el CRC del archivo y los hashes son válidos.

Para corregir la velocidad, el piloto inicial debe estar en los primeros 60 segundos. Los bloques TVBLK003 pueden encontrarse después. TVFSK001/002 siguen siendo legibles.

Archivos recuperados VERIFICADO
