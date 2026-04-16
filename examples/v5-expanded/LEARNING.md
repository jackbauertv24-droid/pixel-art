# V5: Expanded Asset Library

## Complete Game Asset Pack

This version expands V4 into a full game-ready library with diverse characters, monsters, items, and tiles.

## Asset Summary

| Category | Count | Sizes |
|----------|-------|-------|
| Sprites | 3 | 32x32 |
| Monsters | 6 | 16x16 |
| Items | 7 | 16x16 |
| Tiles | 7 | 16x16, 32x32 |
| **Total** | **23** | |

## Characters (32x32)

| Sprite | Colors | Description |
|--------|--------|-------------|
| Warrior | 28 | Blue/silver armored knight with sword |
| Wizard | 26 | Purple-robed mage with golden staff trim |
| Rogue | 30 | Dark leather armor, hooded shadow dweller |

## Monsters (16x16)

| Monster | Colors | Description |
|---------|--------|-------------|
| Goblin | 24 | Green-skinned small humanoid |
| Skeleton | 18 | Undead warrior with glowing red eyes |
| Bat | 22 | Flying cave dweller with yellow eyes |
| Slime | 20 | Green gelatinous blob |
| Spider | 26 | Red-eyed arachnid |
| Orc | 28 | Large green brutish humanoid |

## Items (16x16)

| Item | Colors | Description |
|------|--------|-------------|
| Sword | 18 | Iron blade with gold crossguard |
| Bow | 16 | Wooden recurve bow with gold accent |
| Shield | 22 | Blue kite shield with gold crest |
| Staff | 18 | Mystical staff with purple gem |
| Potion | 16 | Red health potion in glass flask |
| Ring | 18 | Gold band with blue gem |
| Scroll | 14 | Ancient parchment with brown text |

## Tiles

| Tile | Size | Description |
|------|------|-------------|
| Grass | 32x32 | Basic grass terrain tile |
| Floor | 16x16 | Stone dungeon floor |
| Wall | 16x16 | Gray stone brick wall |
| Water | 16x16 | Animated-ready water tile |
| Door | 16x16 | wooden door with gold handle |
| Chest | 16x16 | Treasure chest with gold lock |
| Tree | 16x16 | Green leafy tree with brown trunk |

## Quality Metrics

### Color Distribution
- **Sprites (32x32)**: 26-30 colors each
- **Monsters (16x16)**: 16-28 colors each  
- **Items (16x16)**: 14-22 colors each
- **Tiles**: Variable based on complexity

### Techniques Applied
- Proper color ramps (4+ shades per base color)
- Consistent top-left light source
- Selective outlining (selout)
- Anti-aliasing on curved edges
- Hue shifting for depth
- Chibi proportions for sprites
- Varied sizes for visual hierarchy

## File Structure
```
v5-expanded/
├── sprites/
│   ├── warrior.json / warrior.png
│   ├── wizard.json / wizard.png
│   └── rogue.json / rogue.png
├── monsters/
│   ├── goblin.json / goblin.png
│   ├── skeleton.json / skeleton.png
│   ├── bat.json / bat.png
│   ├── slime.json / slime.png
│   ├── spider.json / spider.png
│   └── orc.json / orc.png
├── items/
│   ├── sword.json / sword.png
│   ├── bow.json / bow.png
│   ├── shield.json / shield.png
│   ├── staff.json / staff.png
│   ├── potion.json / potion.png
│   ├── ring.json / ring.png
│   └── scroll.json / scroll.png
├── tiles/
│   ├── grass.json / grass.png
│   ├── floor.json / floor.png
│   ├── wall.json / wall.png
│   ├── water.json / water.png
│   ├── door.json / door.png
│   ├── chest.json / chest.png
│   └── tree.json / tree.png
└── LEARNING.md
```

## Palette Highlights

### Rogue (Sprite)
```
Dark ramp:    #202020 → #303030 → #404040 → #505050
Cyan ramp:    #003366 → #0066CC → #66B2FF → #B3D9FF
Skin ramp:    #A0522D → #CD853F → #DEB887 → #FFE4C4
```

### Goblin (Monster)
```
Green ramp:   #2F4F00 → #556B2F → #6B8E23 → #9ACD32
Skin ramp:    #505030 → #6B6B4A → #8B8B6B → #ABAB8B
```

### Slime (Monster)
```
Green ramp:   #0F3F0F → #1A6B1A → #228B22 → #32CD32 → #7FFF00
Highlight:    #ADFF2F → #B0E0E6 → #FFFFFF
```

## Design Decisions

### Size Choices
- **32x32 sprites**: Large enough for detail, good for player characters
- **16x16 monsters**: Smaller for enemies, stays readable
- **16x16 items**: Compact for inventory systems
- **16x16 tiles**: Standard for most roguelikes

### Color Key Transparency
All assets use `#00000000` (transparent) background for proper compositing.

### Coherent Art Style
All assets share:
- Top-left light source (45°)
- Limited palette per sprite
- Consistent outline thickness (1px)
- Similar saturation levels

## Learning Journey Summary

### V1 → V2: Color Theory
- Added proper 4-shade color ramps
- Eliminated pillow shading
- Implemented selout technique

### V2 → V3: Polish
- Added anti-aliasing
- Introduced dithering for texture
- Applied hue shifting

### V3 → V4: Production
- Created coherent asset set
- Matched professional color counts
- Established consistent style

### V4 → V5: Expansion
- Tripled asset count to 23
- Added monster variety
- Built complete tileset
- Demonstrated tool versatility

## Tool Usage Examples

### Generate all V5 PNGs
```bash
# Sprites
for f in examples/v5-expanded/sprites/*.json; do
  node dist/cli.js encode "$f" -o "${f%.json}.png"
done

# Monsters
for f in examples/v5-expanded/monsters/*.json; do
  node dist/cli.js encode "$f" -o "${f%.json}.png"
done

# Items & Tiles
for f in examples/v5-expanded/items/*.json examples/v5-expanded/tiles/*.json; do
  node dist/cli.js encode "$f" -o "${f%.json}.png"
done
```

### Scale for Preview
```bash
node dist/cli.js encode sprites/rogue.json -o rogue-4x.png --scale 4
```

## Future Improvements
1. Add animation frames (idle, walk, attack)
2. Create boss monsters (dragon, demon lord)
3. Add environmental objects (rocks, bushes)
4. Design UI elements (buttons, panels)
5. Build character variant sprites (female versions)
