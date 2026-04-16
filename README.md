# pixel-art

Generate pixel art PNG images from JSON input. Designed as a tool for LLMs to create and understand pixel art.

## Installation

```bash
npm install
npm run build
```

## Usage

The CLI now has three main commands:

### `encode` - Generate PNG from JSON
```bash
node dist/cli.js encode input.json -o output.png --scale 4
```

### `decode` - Convert image to JSON (for LLMs without vision)
```bash
node dist/cli.js decode image.png -o output.json --simplify --max-pixels 1024
```

### `convert` - Convert any image to pixel art PNG
```bash
node dist/cli.js convert image.png -o pixel.png --max-pixels 256 --scale 4
```

## Commands

### `encode` - Generate PNG from JSON pixel data

```bash
node dist/cli.js encode [input] [options]
```

| Option | Description |
|--------|-------------|
| `-o, --output <file>` | Output PNG file path (default: "output.png") |
| `-s, --scale <number>` | Scale factor for pixels (default: "1") |

From stdin:
```bash
echo '{"width":2,"height":2,"pixels":[...]}' | node dist/cli.js encode -o output.png
```

### `decode` - Decode image to JSON format

Perfect for LLMs without vision capabilities - converts any image into structured JSON pixel data.

```bash
node dist/cli.js decode <input> [options]
```

| Option | Description |
|--------|-------------|
| `-o, --output <file>` | Output JSON file (prints to stdout if not set) |
| `-m, --max-pixels <n>` | Maximum pixels (auto-resize if exceeded) |
| `-t, --threshold <n>` | Alpha threshold (0-255), exclude transparent pixels |
| `--simplify` | Remove most common color as background |
| `--detect-color-key` | Auto-detect color key transparency (magenta, cyan, etc.) |
| `--color-key <hex>` | Manually specify color key (e.g., `#FF00FF`) |
| `--compact` | Output compact JSON without whitespace |

Examples:
```bash
# Decode at full resolution (default)
node dist/cli.js decode sprite.png -o sprite.json

# Auto-detect color key (magenta/cyan transparency)
node dist/cli.js decode sprite.png --detect-color-key -o sprite.json

# Manual color key specification
node dist/cli.js decode sprite.png --color-key "#FF00FF" -o sprite.json

# Decode with size limit (for large images)
node dist/cli.js decode photo.jpg --max-pixels 1024 --simplify --compact

# Output directly to stdout for LLM processing
node dist/cli.js decode icon.png --detect-color-key --compact
```

### `convert` - Convert image to pixel art PNG

```bash
node dist/cli.js convert <input> [options]
```

| Option | Description |
|--------|-------------|
| `-o, --output <file>` | Output PNG file path |
| `-m, --max-pixels <n>` | Maximum pixel count |
| `-s, --scale <number>` | Scale factor (default: "1") |
| `--simplify` | Remove most common color as background |
| `--detect-color-key` | Auto-detect color key transparency |
| `--color-key <hex>` | Manually specify color key (e.g., `#FF00FF`) |

## JSON Format

```json
{
  "width": 16,
  "height": 16,
  "background": "#00000000",
  "pixels": [
    {"x": 0, "y": 0, "color": "#FF0000"},
    {"x": 1, "y": 1, "color": "#00FF0080"}
  ]
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `width` | number | yes | Canvas width in pixels |
| `height` | number | yes | Canvas height in pixels |
| `background` | string | no | Background color (default: transparent) |
| `pixels` | array | yes | Array of pixel objects |

### Pixel Object

| Field | Type | Description |
|-------|------|-------------|
| `x` | number | X coordinate (0-indexed, left to right) |
| `y` | number | Y coordinate (0-indexed, top to bottom) |
| `color` | string | Hex color: `#RRGGBB` or `#RRGGBBAA` |

### Color Formats

- `#RRGGBB` - RGB color with full opacity
- `#RRGGBBAA` - RGBA color with alpha channel

Examples:
- `#FF0000` - Red
- `#00FF00` - Green  
- `#0000FF` - Blue
- `#FF000080` - Semi-transparent red

## Examples

### Basic Example
See `examples/heart.json` for a simple pixel art definition.

### RPG Character Sprites
The `examples/sprites/` directory contains classic D&D-style RPG sprites:

| Sprite | Description |
|--------|-------------|
| `warrior.json` | Armored knight with sword (blue & silver) |
| `wizard.json` | Robed mage with golden trim (purple) |
| `rogue.json` | Hooded thief with daggers (dark grey) |
| `cleric.json` | Holy priest in white robes with gold accents |
| `dragon.json` | Green dragon with golden eyes |
| `demon.json` | Red demon with glowing eyes |
| `skeleton.json` | Undead warrior with red eyes |
| `warrior-32.json` | 32x32 warrior with improved shading |
| `wizard-32.json` | 32x32 wizard with proper proportions |

Generate all sprites:
```bash
for f in examples/sprites/*.json; do
  node dist/cli.js encode "$f" -o "${f%.json}.png" --scale 4
done
```

## API Usage

```typescript
import { generatePNG, pngToBuffer, decodeImage, validateInput } from 'pixel-art';

// Generate PNG from JSON
const input = validateInput({
  width: 8,
  height: 8,
  pixels: [{ x: 0, y: 0, color: '#FF0000' }]
});
const png = generatePNG(input);
const buffer = await pngToBuffer(png);

// Decode image to JSON
const decoded = await decodeImage('sprite.png', {
  maxPixels: 1024,
  simplify: true,
  threshold: 10
});
console.log(decoded);
```

## Supported Image Formats

The decoder supports common image formats:
- PNG
- JPEG/JPG
- GIF
- WebP
- TIFF
- BMP
- SVG (rasterized)