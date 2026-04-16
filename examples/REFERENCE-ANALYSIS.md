# Professional Pixel Art Reference Analysis

## Sources Analyzed

| Source | License | Size | Notes |
|--------|---------|------|-------|
| LPC Medieval Sprites (wulax) | CC-BY-SA 3.0 | 64x64 frames | Animation sheets, modular armor system |
| Dungeon Crawl Stone Soup | CC0 | 32x32 | 6000+ tiles, roguelike style |
| (Already had) RPG 32x32 sprites | CC-BY | 32x32 | Character sprites |

## Key Discoveries

### 1. Color Count Gap

| Asset | My Color Count | Professional Color Count |
|-------|---------------|-------------------------|
| Goblin (16x16) | 9 | N/A (different size) |
| Goblin (32x32) | N/A | 53 |
| Human | 17 | 11 |
| Hobgoblin | N/A | 63 |
| Kobold | N/A | 33 |
| Warrior (32x32) | 17-30 | 11-53 (varies) |

**Key Insight**: More colors != better. DCSS Human uses only 11 colors, but they're PERFECTLY chosen.

### 2. Color Selection Trends

Professional sprites use:
- **Custom hex values**, not named colors
- **Carefully designed ramps**, not arbitrary shades
- **Pure black outlines** (#000000), not "colored selout"
- **Organic color relationships**, not mathematical gradients

### 3. Palette Analysis

#### DCSS Human Skin Tones
```
#ffd3af - Highlight (very light)
#ffb691 - Light skin
#ca8f72 - Mid tone  
#a5765e - Shadow
#7f5a48 - Deep shadow
```
Notice: These are NOT #FFDAB9 or #DEB887 standard names!

#### DCSS Goblin Colors
```
#c5311d - Bright red (eyes/highlights)
#962617 - Red-orange
#791d11 - Dark red  
#5c160d - Deep red
#4c120c - Darkest red
#483e3c - Gray-brown (skin)
#514741 - Brown shadow
#705d55 - Brown midtone
#a98b7e - Brown highlight
#353433 - Very dark gray (outline supplement)
```
**Critical Discovery**: DCSS Goblins are RED-BROWN, not GREEN! This gives them warmth and character.

### 4. Proportions

| Feature | My Sprites | DCSS Sprites |
|---------|-----------|--------------|
| Head size | 40-50% of body | 30-35% of body |
| Eye size | 25% of head | 10-15% of head |
| Limb thickness | 2px minimum | Varies organically |
| Silhouette | Blocky, regular | Organic, asymmetric |

### 5. Shading Philosophy

#### My Approach (V1-V5)
- Mathematical color ramps
- Consistent light source (top-left)
- Selout for outlines
- "4 shades per color" rule

#### Professional Approach
- Organic, painterly placement
- Suggestive shading (shapes read clearly)
- Pure black outline for separation
- As many shades as needed (3-6 per color)

### 6. Anti-aliasing Technique

**My sprites**: Blocky edges

**DCSS sprites**: Careful 1-pixel edge blending with:
- Intermediate colors at diagonals
- Dithering for texture
- Single-pixel highlights for specularity

### 7. What Makes Sprites Look Bad

Based on analysis, these make sprites look amateurish:

1. **Wrong palette**: Using #228B22 "forestgreen" instead of custom greens
2. **Mathematical ramps**: #00FF00 → #00CC00 → #009900 (too plastic)
3. **Inconsistent outline**: Sometimes black, sometimes colored
4. **Symmetric shapes**: Identical arms, symmetrical faces
5. **Blocky limbs**: All 2px thick
6. **No color harmony**: Green shirt, blue pants, red belt = clown
7. **Too few colors**: 9 colors in 16x16 = looks flat

## V6 Goals

Based on this research:

1. **Custom palettes**, not named colors
2. **Color harmony**: Each sprite uses 1-2 main colors + accent
3. **Asymmetric designs**: Left arm different from right
4. **48x48 or 32x32 sizes**: Avoid 16x16 for characters
5. **Pure black outlines**: For clear separation
6. **Organic shading**: Painterly placement, not mathematical
7. **Reference existing palettes**: DawnBringer 16, PICO-8, etc.

## Recommended Palettes

### DawnBringer 16 (Used by many pixel artists)
```
#140C1C #442434 #30346D #5E716E
#5C3555 #B1305B #EB8931 #F7E67E
#A39F8E #85942A #325128 #3E4452
#5E646E #856362 #D77643 #D7C0A5
```

### Hybrid Palette (For V6)
```
Pure black: #000000
Deep shadow: #1a1c2c
Shadow: #3d3f4a
Mid shadow: #5e6068
Mid: #8b8c8f
Light: #c4c4c4
Highlight: #ffffff

Skin shadow: #7f5a48
Skin dark: #a5765e
Skin mid: #ca8f72
Skin light: #ffb691
Skin highlight: #ffd3af

Blood shadow: #4c120c
Blood dark: #791d11
Blood mid: #b32c1b
Blood light: #c5311d

Steel dark: #353433
Steel mid: #514741
Steel light: #705d55
```
