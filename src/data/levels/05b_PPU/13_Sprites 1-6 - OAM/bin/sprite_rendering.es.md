# Renderizado de sprites

- Una 🛸📖 tabla OAM es un array de `64` 🛸 entradas OAM.
- Cada 🛸 entrada OAM representa un sprite y ocupa `4` bytes.
- La 🐏 OAM RAM contiene la tabla OAM completa (`256` bytes).
  - (solo puede ser accedida via 🏠 OAMAddr / 📝 OAMData / ⚡ OAMDMA)
- Si el bit `5` de 🎛️ PPUCtrl (_altura de sprites_) está encendido, los sprites se renderizan en modo `8x16` en lugar de `8x8`.

## Formato de una entrada OAM

- Byte `0`: Coordenada **Y** del sprite (menos `1`).
- Byte `1`: 🕊️ _tile index_ del sprite.
  - En modo `8x8`:
    - Este byte es el _tile index_ final.
    - La pattern table se obtiene del bit `3` de 🎛️ PPUCtrl (_selección de pattern table para sprites_).
  - En modo `8x16`:
    - El _tile index_ del _tile superior_ es este byte con su primer bit apagado (`byte1 & 0b11111110`).
    - El _tile index_ del _tile inferior_ es el _índice del tile superior_ más `1`.
    - La pattern table se obtiene del primer bit (`byte1 & 0b00000001`).
- Byte `2`: Atributos del sprite.
  - Bits `0-1`: Id de paleta.
  - Bit `5`: Prioridad (`0`: arriba del fondo, `1`: detrás del fondo).
  - Bit `6`: Voltear horizontalmente.
  - Bit `7`: Voltear verticalmente.
- Byte `3`: Coordenada **X** del sprite.
