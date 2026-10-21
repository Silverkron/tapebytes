# TapeBytes — guardar archivos digitales en una cinta de casete

[English](../../README.md) · [Italiano](../it/README.md) · **Español** · [Deutsch](../de/README.md) · [Français](../fr/README.md)

**Convierte archivos pequeños en audio, grábalos en un casete y recupéralos desde el navegador.** TapeBytes es una aplicación gratuita para aficionados a la retroinformática y a la transmisión de datos mediante sonido. Genera señales FSK/4-FSK en WAV y verifica CRC32 y SHA-256 antes de ofrecer los archivos recuperados.

[Abrir TapeBytes en español](https://tapebytes.lucasciacca.com/es/) · [Guía práctica y problemas comunes](guia.md) · [Documentación técnica en inglés](../README.md)

![Casete animado de TapeBytes con detalles violetas e indicadores azules](../assets/cassette-preview.gif)

*Animación decorativa de la interfaz, no una captura real de cinta. [Imagen fija](../assets/cassette-preview.jpg).*

## Prueba sin grabadora

En Codificar, usa el archivo de ejemplo. Mantén Stereo y Tono de referencia activados; puedes quitar la introducción hablada. Genera el WAV, abre Decodificar, elige la fuente de archivo y verifica el WAV generado. Descarga el archivo cuando pase los controles de integridad. Esta prueba valida el software, no la grabación física.

## Modos de audio

| Modo | Izquierdo | Derecho |
| --- | --- | --- |
| Estéreo con referencia, predeterminado | Datos | Tono de 3 kHz para corregir variaciones de velocidad |
| Estéreo sin referencia | Bloques de datos | Otros bloques de datos |
| Mono | Datos | Sin uso |

FSK ofrece 300/600/1.200 bit/s y 4-FSK 1.200/2.400 bit/s, con 1/2/3/5 copias. Con dos copias estéreo, cada bloque se repite en el canal opuesto en otro momento. No mezcles ambos canales para obtener mono.

Una C60 tiene 30 minutos por cara. A 300 bit/s, el máximo teórico de un canal es 67.500 bytes antes de cabeceras, metadatos y copias. A 2.400 bit/s son 540.000 bytes. Consulta siempre la estimación de Codificar.

## Requisitos y límites

Usa una pletina con LINE IN/OUT y una interfaz estéreo para el modo de referencia. La captura necesita HTTPS o localhost y permiso de audio. El piloto ayuda con la velocidad, pero no repara muestras perdidas ni saturación. Conserva los originales. TapeBytes no es un conversor de música a MP3 ni un decodificador universal de cintas de ordenadores antiguos.

```sh
git clone https://github.com/Silverkron/tapebytes.git
cd tapebytes
npm run build
npm test
npm run dev
```

Requiere Node.js 22+ y Python 3; no necesita instalar paquetes npm. Abre [localhost:8765/es/](http://127.0.0.1:8765/es/).

El procesamiento de archivos es local, pero la configuración del sitio incluye Google Tag Manager. [Privacidad, en inglés](../privacy.md). Esta introducción y la guía están traducidas; la referencia técnica completa está en inglés. No hay actualmente una licencia general del proyecto: un repositorio público no concede por sí solo una licencia de código abierto.
