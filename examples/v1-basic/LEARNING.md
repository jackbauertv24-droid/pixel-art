# V1: Basic Pixel Art - Initial Attempt

## What I Did
Created basic 16x16 and 32x32 RPG character sprites with:
- Simple geometric shapes
- Flat colors with minimal shading
- Basic color choices (blue for warrior, purple for wizard, etc.)
- Black outlines

## Problems Identified

### 1. Too Few Colors
| Sprite | Colors Used | Professional Standard |
|--------|-------------|----------------------|
| warrior-32 | 17 | 30-50 |
| wizard-32 | 15 | 30-50 |

**Impact**: Sprites look flat, cartoonish, lack depth

### 2. Pillow Shading
- Shaded from outline inward
- Creates "pillowy" unnatural look
- No consistent light source

### 3. No Color Ramps
Colors are isolated - no graduated shades:
```
Bad:  #4169E1 (blue) → done
Good: #1E4D8C → #4169E1 → #8FAADC → #B8D4E8 (4-shade ramp)
```

### 4. Missing Techniques
- **Anti-aliasing**: No intermediate colors at edges
- **Selective outlining**: Only black outlines
- **Dithering**: No texture gradients
- **Hue shifting**: Shadows are just darker, not hue-shifted

### 5. Poor Proportions
- Generic head/body ratios
- Not following chibi/super-deformed style for small sprites
- Details too small to read at intended size

## Reference Analysis

Analyzed `examples/reference/rpg32-sprites.png`:
- **136 unique colors** across entire spritesheet
- **~40 colors per character** (32x32)
- **Color ramps**: Each base color has 3-4 shades
- **Light source**: Consistent top-left
- **Outlines**: Darker shade of fill color, not pure black

## What to Fix in V2

1. Create proper 4-shade color ramps for each color
2. Establish consistent light source (top-left)
3. Use selective outlining (selout)
4. Add anti-aliasing at key edges
5. Apply hue shifting (shadows lean warm, highlights lean cool)

## Sources Studied
- Derek Yu's Pixel Art Tutorial: https://www.derekyu.com/makegames/pixelart.html
- Derek Yu's Common Mistakes: https://www.derekyu.com/makegames/pixelart2.html
- OpenGameArt 32x32 RPG sprites (CC0)
