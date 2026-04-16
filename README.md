# pixel-art

Generate pixel art PNG images from JSON input. Designed as a tool for LLMs to create pixel art.

## Installation

```bash
npm install
npm run build
```

## Usage

### From file
```bash
node dist/cli.js input.json -o output.png
```

### From stdin
```bash
echo '{"width":2,"height":2,"pixels":[...]}' | node dist/cli.js -o output.png
```

### With scaling
```bash
node dist/cli.js input.json -o output.png --scale 10
```

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

## CLI Options

```
Usage: pixel-art [options] [input]

Arguments:
  input                 JSON input file path (reads from stdin if not provided)

Options:
  -V, --version         output the version number
  -o, --output <file>   Output PNG file path (default: "output.png")
  -s, --scale <number>  Scale factor for pixels (default: "1")
  -h, --help            display help for command
```

## Example

See `examples/heart.json` for a sample pixel art definition.

## API Usage

```typescript
import { generatePNG, pngToBuffer, validateInput } from 'pixel-art';

const input = validateInput({
  width: 8,
  height: 8,
  pixels: [
    { x: 0, y: 0, color: '#FF0000' }
  ]
});

const png = generatePNG(input);
const buffer = await pngToBuffer(png);
// Write buffer to file
```
