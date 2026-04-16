# V6: Professional Reference Study

## Research Sources

Downloaded and analyzed professional sprite sheets:

1. **LPC Medieval Fantasy Sprites** (wulax) - CC-BY-SA 3.0
   - 64x64 animation frames
   - Modular armor system
   - 63,433 downloads on OpenGameArt

2. **Dungeon Crawl Stone Soup** - CC0
   - 6000+ 32x32 tiles
   - Characters, monsters, items, terrain
   - Battle-tested in production game

## Key Discoveries

### Color Count Analysis

| Sprite | V5 Colors | V6 Colors | DCSS Colors |
|--------|-----------|-----------|-------------|
| Warrior | 17 | 17 | 11 (human) |
| Goblin | 9 | 14 | 53 |

**Critical Finding**: DCSS human uses only 11 colors but looks professional!

### Palette Insights

#### DCSS Human Skin Tones
```
#ffd3af - Highlight
#ffb691 - Light
#ca8f72 - Mid
#a5765e - Shadow
#7f5a48 - Deep shadow
```

#### DCSS Goblin Palette
```
#c5311d - Bright red (eyes/accents)
#942416 - Red-orange
#791d11 - Dark red
#5c160d - Deep red
#4c120c - Darkest red
#a98b7e - Skin highlight
#705d55 - Skin midtone
#514741 - Skin shadow
#483e3c - Deep shadow
#353433 - Near-black
```

**Revelation**: Professional goblins are RED-BROWN, not GREEN!

### What Makes Sprites Look Amateur

1. **Named colors** (#228B22 "ForestGreen") vs custom hex values
2. **Mathematical ramps** (#0F0 → #0C0 → #090) vs organic shades
3. **Symmetric designs** - identical left/right
4. **Blocky proportions** - 2px limbs everywhere
5. **Too few colors** - 9 colors looks flat

### What Makes Sprites Look Professional

1. **Custom palettes** - specific hex values chosen by eye
2. **Color harmony** - 1-2 main colors + accent
3. **Asymmetric details** - left arm ≠ right arm
4. **Organic shading** - painterly, not mathematical
5. **Pure black outline** (#000000) for clarity

## V6 Improvements

### Warrior
- Custom blue palette: #0a1a3e → #0a2a5e → #1a3a6e → #2a5299 → #4a7ac7 → #7ab3f7 → #a8d4ff
- Gold accents: #9a6f00 → #ca8f00 → #ffd700 → #ffec80
- Human skin tones from DCSS
- Asymmetric arm positions
- Pure black outline

### Goblin
- Red-brown palette (matching DCSS style)
- Custom skin tones: #a98b7e → #705d55 → #514741 → #483e3c → #353433
- Blood red accents: #4c120c → #5c160d → #791d11 → #942416 → #c5311d
- Angry red eyes
- Asymmetric stance

## Files

```
v6-professional/
├── sprites/
│   ├── warrior.json
│   └── warrior.png
├── monsters/
│   ├── goblin.json
│   └── goblin.png
└── LEARNING.md
```

## Reference Files

```
reference/
├── lpc_entry.zip           # LPC sprite sheets
├── Dungeon Crawl Stone Soup Full/  # 6000+ tiles
├── dcss-human.json         # Decoded DCSS human
├── dcss-goblin.json        # Decoded DCSS goblin
└── REFERENCE-ANALYSIS.md   # Detailed analysis
```

## Lessons Learned

1. **Study professionals first** - don't guess at techniques
2. **Decode and analyze** - understand the actual pixel structure
3. **Custom palettes are essential** - named colors look amateur
4. **Color count isn't everything** - DCSS human = 11 colors, looks great
5. **Pure black outlines work** - "selout" isn't always better

## Future Work

1. Create more sprites using DCSS as reference
2. Build a proper color palette document
3. Add animation frames (study LPC structure)
4. Create tileset matching DCSS style
