# Tile rendering

- A 🕊️📖 pattern table is a list of `256` consecutive 🕊️ tiles.
- Each 🕊️ tile occupies `16` bytes...
- ...so each pattern table is `4096` bytes.
- The 👾 CHR-ROM inside the 💾 cartridge contains `2` 🕊️📖 pattern tables.
  - (that's available at PPU addresses `$0000-$1FFF`)

<div class="embed-image"><img alt="Pattern table memory" src="assets/graphics/tile_bitplanes.png" style="width: 100%" /></div>

#### Pattern table example

<div class="embed-image"><img alt="Pattern table" src="assets/graphics/tiles_grayscale.png" style="width: 30%" /></div>

#### Rendering

- A 🕊️ tile is an `8x8` _grayscale_ pixel grid.
- Those pixels can be `0`, `1`, `2` or `3` depending on their color.
  - (in binary: `00`, `01`, `10` or `11`)

To encode the pixels, the `16` bytes of the tile data are divided in **two** `8-byte` **bitplanes** (<strong style="color: #7723ec">low plane</strong> and <strong style="color: #4eeebf">high plane</strong>).

Here's an example of how a tile for **½** (one-half fraction) is encoded:

```
$41 $C2 $44 $48 $10 $20 $40 $80 $01 $02 $04 $08 $16 $21 $42 $87
```

<div class="embed-image"><img alt="Encoded tile" src="assets/graphics/one_half_fraction2.png" style="width: 75%" /></div>

Each bit in the first plane controls <strong style="color: #7723ec">bit 0</strong> of a pixel's color; the corresponding bit in the second plane controls <strong style="color: #4eeebf">bit 1</strong>.
