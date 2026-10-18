<!-- Language: es -->

Source: https://tapebytes.lucasciacca.com/es/guide/

Datos en casete: capacidad y guía — TapeBytes

Descubre cuántos datos caben en un casete, qué equipo necesitas y cómo grabar y recuperar archivos con TapeBytes.

MANUAL / ANTES DE GRABAR

# Cómo guardar datos en cintas de casete

Tu primera conversión completa de ida y vuelta

- Elige archivos, modulación y redundancia en Codificar. La referencia derecha está activada por defecto.
- Genera el WAV estéreo: datos a la izquierda, referencia de 3 kHz a la derecha. La introducción hablada es opcional.
- En Estudio conecta ambas salidas a la pletina, calibra el nivel, pulsa REC en la pletina e inicia la cuenta atrás.
- Rebobina y captura ambos canales en Decodificar, o importa un WAV estéreo. Mantén la corrección activada y descarga los archivos verificados.

## TVBLK003 / FSK

TVBLK003 transporta bloques de 1 KiB con sincronización, CRC y 1/2/3/5 copias. TVBLK004 distribuye los bloques entre dos canales. Las copias alternan canales en intervalos distintos. El CRC del archivo y SHA-256 de cada fichero deben ser válidos. TVFSK001/002 y TVBLK003 siguen siendo legibles.

Referencia activada: datos a la izquierda, referencia de 3 kHz a la derecha. Desactívala para usar ambos canales para datos. Con dos copias, los bloques se cruzan entre canales en momentos distintos; la capacidad es similar a un canal de datos.

Entrada mono: conecta un canal aislado, nunca la suma I + D. Los datos estéreo ×1 necesitan ambos canales; con ×2 cada canal completo contiene todos los bloques. La corrección por referencia requiere estéreo. Puedes leer el canal izquierdo desactivando la corrección. El nuevo modo de datos estéreo aún requiere pruebas en la pletina.

## Procesamiento local

Los archivos y el audio se quedan en esta pestaña. Sin cuentas ni subidas de archivos a servidores. El sitio integra Google Tag Manager. Los permisos de los dispositivos de audio solo se solicitan al usar esos controles. La entrada de audio requiere un navegador compatible y HTTPS o localhost.

Disponible hoy

La referencia derecha sigue las variaciones de velocidad antes de decodificar. Grabación y recuperación estéreo disponibles con verificaciones CRC y SHA-256. Desactiva la referencia para grabaciones mono antiguas.

## Limitaciones prácticas

La referencia corrige el tiempo, no los datos perdidos ni la distorsión grave. Las velocidades altas requieren una señal más limpia. No hay división automática entre caras. La recuperación falla si no queda una copia válida de un bloque.

## Revisa las conexiones

Mantén separados los canales izquierdo y derecho. Iguala las frecuencias de muestreo de entrada y salida y evita mezclar la monitorización directa con la reproducción. En Fast Track Pro, ajusta Mix a PB al grabar.

## ¿Chasquidos o falta de referencia?

Los chasquidos pueden deberse a la frecuencia de muestreo configurada en la interfaz de audio, especialmente si la entrada, la salida y el motor de audio del navegador no coinciden. En macOS, abre Configuración de Audio MIDI, selecciona la interfaz y configura entrada y salida a 48.000 Hz (48 kHz), la frecuencia que TapeBytes usa para los WAV. Después desactiva y activa la entrada en TapeBytes para recrear la conexión. Este ajuste es distinto de la frecuencia del tono de referencia (3 kHz). Si persiste, revisa niveles, conexiones y controladores y compara una captura con Audacity. La referencia no puede restaurar muestras de audio perdidas.

## Movimiento y accesibilidad

Las animaciones siguen el progreso real. Los medidores usan la señal de audio. El movimiento reducido desactiva la animación decorativa; las pestañas ocultas detienen las actualizaciones visuales.

La introducción indica el sitio de recuperación: tapebytes.lucasciacca.com. Inclúyela para poder identificar la grabación en el futuro.

## ¿Cuántos datos caben en un casete?

La capacidad depende de la duración, la velocidad de datos y la redundancia. Un C60 tiene 30 minutos por cara: a 300 bit/s, el máximo teórico es de 67.500 bytes antes de cabeceras, metadatos y pausas; a 2400 bit/s, 540.000 bytes. La capacidad útil es menor y tres o cinco copias requieren más tiempo. Codificar calcula una estimación con tus archivos y ajustes. La referencia estéreo mejora la recuperación de la temporización, no la capacidad.

## ¿Qué equipo necesito?

Un grabador de casete estéreo con entrada y salida de línea, cables adecuados y un ordenador con entrada y salida de audio estéreo. Puedes utilizar una interfaz USB. Para comprobar el software, genera un WAV y verifícalo en Decodificar antes de grabar una cinta.

## ¿Puedo decodificar cualquier grabación en casete?

TapeBytes lee su propio formato de datos y las versiones anteriores compatibles. No es un decodificador genérico para cintas Commodore, ZX Spectrum o Kansas City Standard, ni una herramienta para digitalizar música. Empieza con un archivo pequeño y comprueba la grabación y recuperación completas con tu equipo.

[Estimar capacidad en Codificar](https://tapebytes.lucasciacca.com/es/encode/)
