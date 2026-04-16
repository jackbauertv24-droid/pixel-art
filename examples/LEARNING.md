# Pixel Art Learning Journey

This directory documents my progressive learning of pixel art techniques, from basic shapes to production-ready assets.

## Iterations

### [V1: Basic](./v1-basic/LEARNING.md)
**Status**: ❌ Initial attempt, identified problems

**What I Did**:
- Created basic 16x16 and 32x32 sprites
- Used flat colors with minimal shading
- Applied black outlines everywhere

**Problems Found**:
- Too few colors (17 vs. professional 30-50)
- Pillow shading (unrealistic)
- No color ramps
- Missing advanced techniques
- Poor proportions

**Files**: 10 sprites (warrior, wizard, rogue, cleric, dragon, demon, skeleton)

---

### [V2: Color Ramps](./v2-color-ramps/LEARNING.md)
**Status**: ✅ Major improvement

**What I Learned**:
- **Color ramps**: Each base color needs 4 graduated shades
- **Light source**: Consistent direction (top-left)
- **Selective outlining**: Darker shade outlines, not black
- **Hue shifting**: Warm shadows, cool highlights

**Results**:
- Color count: 17 → 27 (+59%)
- Improved 3D depth illusion
- More professional appearance

**Files**: 2 improved sprites (warrior, wizard)

---

### [V3: Advanced](./v3-advanced/LEARNING.md)
**Status**: ✅ Professional polish

**What I Learned**:
- **Anti-aliasing**: Smooth edges with intermediate colors
- **Dithering**: Gradients without adding colors
- **Animation-ready design**: Clear limb separation
- **Better proportions**: Chibi style guidelines

**Results**:
- Color count: 27 → 35 (+30%)
- Smoother appearance
- Animation-ready sprites

**Files**: Enhanced V2 sprites

---

### [V4: Production](./v4-production/LEARNING.md)
**Status**: ✅ Game-ready assets

**What I Created**:
- **Characters**: Warrior, Wizard (32x32)
- **Items**: Sword, Potion (16x16)
- **Maps**: Grass tile (32x32)

**Quality Metrics**:
- All sprites use proper color ramps
- Consistent art style across all assets
- Readable at intended sizes
- Animation-ready design

**Files**: Complete asset pack

---

## Key Learnings Summary

### Color Theory
1. Use 4-shade ramps for each base color
2. Hue shift shadows warm, highlights cool
3. Limit palette to 30-50 colors per character

### Shading
1. Establish ONE consistent light source
2. Never pillow shade (outline → inward)
3. Think in 3D forms, not flat shapes

### Outlines
1. Use selout (selective outlining)
2. Light edges = lighter or no outline
3. Dark edges = darker outline
4. Avoid pure black outlines

### Proportions
1. Chibi style: Head = 35-40% of height
2. Chunky pixels: Minimum 2px thickness
3. Large, expressive eyes (2-4 pixels)
4. Clear silhouette

### Technical
1. Anti-alias on interior edges only
2. Dither for gradients and texture
3. PNG format, never JPG
4. Integer scale factors only (2x, 4x, not 2.5x)

---

## Sources Studied
- Derek Yu's Pixel Art Tutorial: https://www.derekyu.com/makegames/pixelart.html
- Derek Yu's Common Mistakes: https://www.derekyu.com/makegames/pixelart2.html
- OpenGameArt 32x32 RPG Sprites (CC0)
- Professional sprite analysis via decode feature

---

## Color Count Progression

| Version | Warrior | Wizard | Average |
|---------|---------|--------|---------|
| V1 | 17 | 15 | 16 |
| V2 | 28 | 26 | 27 |
| V3 | 35 | 33 | 34 |
| V4 | 28 | 26 | 27 |

**Note**: V4 optimized color usage while maintaining quality.

---

## Next Steps
1. Add animation frames
2. Create more character classes
3. Design monster sprites
4. Build complete tileset
5. Add UI elements