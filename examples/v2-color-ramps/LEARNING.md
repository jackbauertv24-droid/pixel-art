# V2: Color Ramps & Proper Shading

## Key Concepts Learned

### Color Ramps
Each base color needs 3-4 graduated shades:
```
Blue (skin highlight):   #B8D4E8 → #8FAADC → #4169E1 → #1E4D8C
Blue (armor):           #E8E8E8 → #C0C0C0 → #808080 → #696969
Gold (trim):            #FFFFFF → #FFD700 → #CD853F → #8B4513
Skin:                   #FFFFFF → #FFE4C4 → #DEB887 → #CD853F
```

### Hue Shifting
- Shadows: Shift toward warm (red/brown)
- Highlights: Shift toward cool (blue/cyan)
- Avoid simple brightness changes

Example:
```
Bad (no hue shift):  #FF0000 → #CC0000 → #990000 (just darker)
Good (hue shift):    #FF0000 → #CC2200 → #993300 (warm shadows)
```

### Light Source
- Establish consistent direction (top-left, 45°)
- Highlights on top-left edges
- Shadows on bottom-right edges
- Cast shadows under protruding elements

### Selective Outlining (Selout)
- Pure black outline: Cartoonish, harsh
- Selout: Use darker shade of fill color
- Top-left edges: Lighter outline or no outline
- Bottom-right edges: Darker outline

### Anti-Aliasing
Smooth pixel edges with intermediate colors:
```
Without AA:  
  X
 XX
XXX

With AA:
  .X
 .XX
.XXX
```
`.` = intermediate color between edge and background

### Pixel Art Proportions (32x32)
- Head: 30-40% of total height
- Eyes: Large, expressive (2-4 pixels)
- Body: Chibi/super-deformed style
- Arms/Legs: Chunky, minimum 2 pixels thick
- "Chunky Pixels Rule": Avoid 1-pixel thickness

## Techniques Applied

| Technique | Before (V1) | After (V2) |
|-----------|-------------|------------|
| Color count | 17 | 40+ |
| Color ramps | ❌ | ✅ 4 shades per color |
| Light source | ❌ | ✅ Top-left consistent |
| Selout | ❌ | ✅ Dynamic outlines |
| AA | ❌ | ✅ Key edges smoothed |
| Hue shift | ❌ | ✅ Warm shadows, cool highlights |
| Proportions | Generic | Chibi-style |

## Color Palettes Created

### Warrior Palette (Blue/Silver)
```
Outline Dark:    #000000
Outline Light:   #1E4D8C

Armor Dark:      #696969
Armor Mid:       #808080
Armor Light:     #C0C0C0
Armor Highlight: #E8E8E8

Cloth Dark:      #1E4D8C
Cloth Mid:       #4169E1
Cloth Light:     #8FAADC
Cloth Highlight: #B8D4E8

Gold Dark:       #8B4513
Gold Mid:        #CD853F
Gold Light:      #FFD700
Gold Highlight:  #FFFFFF
```

### Wizard Palette (Purple/Gold)
```
Outline Dark:    #000000

Robe Dark:       #8B008B
Robe Mid:        #9932CC
Robe Light:      #BA55D3
Robe Highlight:  #DDA0DD

Gold Dark:       #8B4513
Gold Mid:        #CD853F
Gold Light:      #FFD700
Gold Highlight:  #FFFFFF

Skin Light:      #FFE4C4
Skin Mid:        #DEB887
Skin Dark:       #CD853F
```

## Sources
- Derek Yu tutorials (referenced above)
- Analysis of OpenGameArt professional sprites
- Color theory: warm shadows, cool highlights