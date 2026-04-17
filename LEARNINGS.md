# Pixel Art Learnings

A comprehensive guide to creating pixel art programmatically, based on the development of this pixel art generator CLI tool and iterative sprite creation from V1 to V10.

## Table of Contents

1. [Project Overview](#project-overview)
2. [The CLI Tool](#the-cli-tool)
3. [Reference Sources](#reference-sources)
4. [Evolution of Sprites](#evolution-of-sprites)
5. [Key Techniques Learned](#key-techniques-learned)
6. [The LPC Layer System](#the-lpc-layer-system)
7. [Color Mapping for Variants](#color-mapping-for-variants)
8. [Sprite Sheet Format](#sprite-sheet-format)
9. [Common Mistakes](#common-mistakes)
10. [Best Practices](#best-practices)

---

## Project Overview

### Goal
Create a pixel art generator CLI tool that enables text-based LLMs to create and understand pixel art images through JSON data.

### Core Functionality
- **Encode**: Generate PNG images from JSON pixel data
- **Decode**: Convert PNG images to JSON format (for LLMs without vision)
- **Convert**: Decode + encode pipeline for format conversion

### Key Discovery
**Don't create pixel art from scratch.** Modify existing professional sprites through color mapping and layer combination. This produces professional-quality results that creating from scratch cannot match.

---

## The CLI Tool

### Commands

```bash
# Encode JSON to PNG
pixel-art encode input.json -o output.png

# Decode PNG to JSON
pixel-art decode input.png -o output.json --detect-color-key

# Convert between formats
pixel-art convert input.png -o output.png
```

### JSON Format

```json
{
  "width": 64,
  "height": 64,
  "pixels": [
    { "x": 10, "y": 5, "color": "#ff0000" },
    { "x": 11, "y": 5, "color": "#ff0000" }
  ]
}
```

### Color Formats Supported
- `#RRGGBB` - RGB hex
- `#RRGGBBAA` - RGBA hex with alpha

### Decode Options
- `--detect-color-key` - Auto-detect transparent colors (magenta, etc.)
- `--simplify` - Remove most common color as background
- `--threshold` - Alpha threshold for transparency

---

## Reference Sources

### Professional Sources Used

| Source | Size | License | Notes |
|--------|------|---------|-------|
| DawnLike | 16x16 | CC-BY-SA 3.0 | Uses DawnBringer 16 palette - excellent color cohesion |
| DCSS | 32x32 | CC0 | 6000+ tiles, production quality |
| Denzi 32x32 | 32x32 | CC-BY-SA 3.0 | Wide variety of monsters and items |
| LPC Entry | 64x64 | CC-BY-SA 3.0 | Layer-based character system |
| Kenney Tiny Dungeon | 16x16 | CC0 | Clean, simple tiles |
| Horus Dungeon | 32x32 | CC0 | Blue-tinted dungeon tiles |
| Jerom 16x16 | 16x16 | CC-BY-SA 3.0 | GameBoy-style 4-color sprites |

### Key Learning: DawnBringer 16 Palette

DawnLike uses only 16 colors for its entire tileset:

```
#140c1c  #452434  #864d30  #d34549
#d37d2c  #4d494d  #d3aa9a  #6daa2c
#dbd75d  #757161  #8696a2  #dfefd7
#6dc3cb  #346524  #597dcf  #30346d
```

**Why this matters**: Limited palette creates visual cohesion. All sprites look like they belong together because they share the same colors.

---

## Evolution of Sprites

### V1-V6: Creating From Scratch (Failed Approach)

All attempts to create sprites from scratch or by manually placing pixels resulted in poor quality:
- V1: Basic shapes, flat colors
- V2: Color theory attempts, still poor
- V3: Anti-aliasing attempts, still poor
- V4: Production-ready attempts, still poor
- V5: 23 assets, all poor quality
- V6: Applied "professional techniques", still inadequate

**User feedback**: "man your art is like a joke"

### V7: Color-Mapped Variants (Breakthrough)

Instead of creating from scratch, I:
1. Decoded professional sprites to JSON
2. Applied color mapping transformations
3. Re-encoded to PNG

Results:
- Ice demon (from DawnLike demon)
- Poison demon
- Ice/forest goblins (from DCSS)
- Color-shifted monster variants

**Key insight**: Color mapping professional sprites produces professional-looking variants.

### V8: 64x64 Single Frames (Incomplete)

Created 22 character sprites at 64x64 by combining LPC layers.
**Problem**: Only extracted single frames, showing incomplete characters (backs, partial views).

### V9: Complete Sprite Sheets (Success)

Created 24 complete sprite sheets with:
- All 4 directions (down, left, right, up)
- Multiple animation frames per direction
- Proper layer combinations

Format:
- Walk: 9 frames (576x256)
- Slash: 6 frames (384x256)
- Spellcast: 7 frames (448x256)
- Bow: 13 frames (832x256)

### V10: New Character Variants

Applied V9 techniques to create 32 new sprites:
- Dark Knight, Paladin, Crimson Knight
- Ice Mage, Lightning Mage, Necromancer
- Lich, Druid, Cleric
- Assassin, Barbarian, Samurai, Viking
- Monk, Dark Monk

---

## Key Techniques Learned

### 1. Color Mapping

Transform sprites by remapping colors:

```javascript
const colorMap = {
  '#ff0000': '#0000ff',  // red -> blue
  '#cc0000': '#0000cc',  // dark red -> dark blue
  '#ff6666': '#6666ff',  // light red -> light blue
};

pixels.forEach(p => {
  const mapped = colorMap[p.color.toLowerCase()];
  if (mapped) p.color = mapped;
});
```

### 2. Skin Tone Variants

Create diverse characters with skin tone mapping:

```javascript
const darkSkinMap = {
  '#fdd5b7': '#8d5524',  // light -> dark brown
  '#eaa377': '#6b3e26',
  '#d28560': '#4a2c17',
  '#9e3e37': '#2d1810',
  '#fbece6': '#a67c52',
};

const greenSkinMap = {
  '#fdd5b7': '#7ab86e',  // light -> green
  '#eaa377': '#5a944e',
  '#d28560': '#3a7030',
  '#9e3e37': '#2a5020',
  '#fbece6': '#9ac88e',
};
```

### 3. Armor Color Variants

```javascript
const goldArmorMap = {
  '#808080': '#d4af37',  // gray -> gold
  '#696969': '#b8960b',
  '#505050': '#8b7500',
  '#a0a0a0': '#ffd700',
  '#c0c0c0': '#ffec8b',
};

const darkArmorMap = {
  '#808080': '#2a2a2a',  // gray -> black
  '#696969': '#1a1a1a',
  '#505050': '#0a0a0a',
};
```

### 4. Robe/Clothing Colors

```javascript
const blueRobeMap = {
  '#8b4513': '#30346d',  // brown -> dark blue
  '#a0522d': '#4565a5',
  '#cd853f': '#597dcf',
  '#deb887': '#6dc3cb',
};

const redRobeMap = {
  '#8b4513': '#8b0000',  // brown -> dark red
  '#a0522d': '#a01010',
  '#cd853f': '#dc143c',
};
```

---

## The LPC Layer System

### Overview

The Liberated Pixel Cup (LPC) uses a layer-based system for characters. Each character is composed of multiple transparent PNG layers that stack together.

### Layer Types

| Layer | Description |
|-------|-------------|
| BODY | Base body (skin) |
| FEET | Shoes, boots |
| LEGS | Pants, armor legs |
| TORSO | Shirts, armor, robes |
| HEAD | Hair, helmets, hoods |
| HANDS | Gloves |
| BEHIND | Quivers, capes |
| BELT | Belts |
| WEAPON | Weapons, shields |

### Layer Order (Bottom to Top)

1. BEHIND (quivers, capes)
2. BODY
3. LEGS
4. FEET
5. TORSO
6. BELT
7. HANDS
8. HEAD
9. WEAPON

### Combining Layers

```javascript
function combineLayers(layers) {
  const pixelMap = new Map();
  
  // Later layers cover earlier ones
  layers.forEach(layer => {
    layer.forEach(p => {
      pixelMap.set(`${p.x},${p.y}`, p.color);
    });
  });
  
  return Array.from(pixelMap.entries()).map(([key, color]) => {
    const [x, y] = key.split(',').map(Number);
    return { x, y, color };
  });
}
```

### Character Recipes

```
Warrior: body + shoes + leather_torso + hair
Knight: body + shoes + plate_legs + chain_torso + plate_helmet
Mage: body + robe_shirt + robe_skirt + robe_hood
Archer: body + shoes + leather_torso + bow
Skeleton: skeleton_body + shoes + leather_torso
```

---

## Sprite Sheet Format

### Grid Layout

LPC sprites use a consistent grid format:
- **Rows**: 4 directions
  - Row 0: Facing down
  - Row 1: Facing left
  - Row 2: Facing right
  - Row 3: Facing up
- **Columns**: Animation frames
- **Frame size**: 64x64 pixels

### Animation Types

| Animation | Frames | Dimensions | Use Case |
|-----------|--------|------------|----------|
| walkcycle | 9 | 576x256 | Walking in all directions |
| slash | 6 | 384x256 | Melee attack |
| spellcast | 7 | 448x256 | Casting magic |
| thrust | 8 | 512x256 | Spear/staff attack |
| bow | 13 | 832x256 | Bow attack |
| hurt | 6 | 384x64 | Taking damage |

### Extracting Frames

```javascript
function extractFrame(data, col, row, frameWidth = 64) {
  const startX = col * frameWidth;
  const startY = row * 64;
  
  return data.pixels
    .filter(p => 
      p.x >= startX && p.x < startX + 64 &&
      p.y >= startY && p.y < startY + 64
    )
    .map(p => ({
      x: p.x - startX,
      y: p.y - startY,
      color: p.color
    }));
}
```

### Creating Full Sprite Sheet

```javascript
function createSpriteSheet(layers, frameCount) {
  const sheet = { width: frameCount * 64, height: 256, pixels: [] };
  
  for (let row = 0; row < 4; row++) {        // 4 directions
    for (let col = 0; col < frameCount; col++) { // frames per direction
      const frame = extractAndCombineLayers(layers, col, row);
      
      // Offset to position in sheet
      frame.forEach(p => {
        sheet.pixels.push({
          x: p.x + (col * 64),
          y: p.y + (row * 64),
          color: p.color
        });
      });
    }
  }
  
  return sheet;
}
```

---

## Common Mistakes

### 1. Creating From Scratch

**Wrong**: Trying to manually place pixels to create characters.
**Right**: Modify existing professional sprites through color mapping.

### 2. Extracting Single Frames

**Wrong**: Extracting only one 64x64 frame from a sprite sheet.
**Result**: Characters showing only backs, partial views, or just equipment.

**Right**: Understand the sprite sheet format and extract complete animations.

### 3. Ignoring Layer Order

**Wrong**: Combining layers in wrong order.
**Result**: Helmet behind hair, body covering armor.

**Right**: Follow proper layer stacking order (body → legs → torso → head).

### 4. Not Detecting Color Key

**Wrong**: Decoding without `--detect-color-key`.
**Result**: Transparent areas become solid colors.

**Right**: Use `--detect-color-key` for sprites with color key transparency.

### 5. Wrong Color Casing

**Wrong**: `#FF0000` in color map, `#ff0000` in pixel data.
**Result**: Colors not matching, mapping fails.

**Right**: Convert to lowercase before comparison:
```javascript
const c = p.color.toLowerCase();
if (colorMap[c]) p.color = colorMap[c];
```

---

## Best Practices

### 1. Use Professional References

- Download professional sprite sheets (DCSS, DawnLike, LPC)
- Decode them to study color usage and patterns
- Use them as base for new variants

### 2. Limit Your Palette

- Don't use arbitrary colors
- Choose a palette (like DawnBringer 16)
- Map all colors to the palette

### 3. Create Variants, Not New Art

- Color-map existing sprites for variants
- Combine layers differently for new character types
- Use skin tone maps for diversity

### 4. Maintain Sprite Sheet Format

- Keep 4 directions (down, left, right, up)
- Use standard frame counts (6-9 frames)
- Keep 64x64 frame size

### 5. Test Visually

- Always encode and view the result
- Check all 4 directions render correctly
- Verify animation frames flow smoothly

### 6. Clean Up Source Files

- Remove intermediate JSON files
- Keep only final PNG sprites
- Document character recipes in README

---

## File Structure

```
pixel-art/
├── dist/
│   └── cli.js              # Compiled CLI tool
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── encode.ts           # JSON to PNG encoder
│   └── decode.ts           # PNG to JSON decoder
├── examples/
│   ├── v7-variations/      # Color-mapped variants
│   ├── v8-64x64/           # Single frame attempts (incomplete)
│   ├── v9-animations/      # Complete sprite sheets
│   ├── v10-variants/       # New character variants
│   └── reference/
│       ├── sources/        # Professional reference sprites
│       └── *.json          # Decoded reference data
├── package.json
├── tsconfig.json
└── LEARNINGS.md            # This file
```

---

## Resources

### Reference Sources
- [OpenGameArt.org](https://opengameart.org) - Free game assets
- [Dungeon Crawl Stone Soup](https://github.com/crawl/tiles) - CC0 tiles
- [Liberated Pixel Cup](https://lpc.opengameart.org) - Layer-based characters

### Palettes
- [DawnBringer 16](https://pixeljoint.com/forum/forum_posts.asp?TID=12795) - Popular limited palette
- [Lospec](https://lospec.com/palette-list) - Palette database

### Tools
- [Aseprite](https://www.aseprite.org) - Pixel art editor
- [Piskel](https://www.piskelapp.com) - Free online sprite editor

---

## Conclusion

The key insight from this project: **professional pixel art is best created by modifying existing professional sprites, not by creating from scratch.**

The combination of:
1. Professional reference sprites
2. Color mapping for variants
3. Layer combination for character types
4. Proper sprite sheet formatting

Produces high-quality, game-ready pixel art that a text-based LLM can generate through JSON manipulation.

---

*Generated from the pixel-art CLI tool development process*
