# V3: Advanced Techniques

## New Concepts Applied

### 1. Anti-Aliasing Implementation
Smoothed pixel edges using intermediate colors at corners and transitions:
- Placed lighter outline color on outer edges
- Used 2-3 pixel AA strips for longer curves
- Avoided AA on sprite edges (unknown background color)

### 2. Dithering for Gradients
Added noise patterns to create smooth color transitions without adding new colors:
```
Checkerboard pattern: 50% mix of two colors
Scattered pattern: 25% mix
```
Used sparingly for:
- Armor texture
- Fabric folds
- Sky gradients (in maps)

### 3. Sub-Pixel Animation Considerations
Designed sprites with animation in mind:
- Clear limb separation for walk cycles
- Consistent pivot points
- Readable at each animation frame

### 4. Hue Shifting Mastery
Applied warm-to-cool color theory:
```
Shadows:   Warm (red/orange tint) - #993300 instead of #660000
Midtones:  True color - #CC0000
Highlights: Cool (blue/cyan tint) - #FF3333 instead of #FF0000
```

### 5. Improved Proportions
Followed chibi style guidelines:
- Head: 35-40% of total height
- Eyes: Large, expressive (3-4 pixels for 32x32)
- Body: Compact, chunky
- Limbs: Minimum 2 pixels thick

## Color Count Improvements

| Sprite | V1 Colors | V2 Colors | V3 Colors |
|--------|-----------|-----------|-----------|
| Warrior | 17 | 28 | 35 |
| Wizard | 15 | 26 | 33 |
| Dragon | 22 | 32 | 40 |
| Demon | 19 | 29 | 38 |

## File Organization
```
v3-advanced/
├── sprites/
│   ├── warrior.json
│   ├── wizard.json
│   ├── rogue.json (NEW - with cloak animation)
│   ├── cleric.json (NEW - with staff)
│   ├── ranger.json (NEW - with bow)
│   └── paladin.json (NEW - with shield)
├── items/
│   ├── sword.json
│   ├── staff.json
│   ├── bow.json
│   ├── shield.json
│   └── potion.json
└── LEARNING.md
```

## Techniques Summary

| Technique | V1 | V2 | V3 |
|-----------|----|----|-----|
| Color ramps | ❌ | ✅ | ✅ |
| Consistent light source | ❌ | ✅ | ✅ |
| Selective outlining | ❌ | ✅ | ✅ |
| Anti-aliasing | ❌ | ❌ | ✅ |
| Dithering | ❌ | ❌ | ✅ |
| Hue shifting | ❌ | ❌ | ✅ |
| Animation-ready design | ❌ | ❌ | ✅ |