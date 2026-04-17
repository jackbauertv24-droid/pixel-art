# V9 Sprite Animations

Complete character sprite sheets with all directions and animation frames.

## Sprite Sheet Format

Each sprite sheet contains multiple frames arranged in a grid:
- **Rows (4)**: Directions - Down (row 0), Left (row 1), Right (row 2), Up (row 3)
- **Columns**: Animation frames (varies by animation type)
- **Frame size**: 64x64 pixels

### Animation Types

| Animation | Frames | Dimensions |
|-----------|--------|------------|
| Walk | 9 frames | 576x256 |
| Slash | 6 frames | 384x256 |
| Spellcast | 7 frames | 448x256 |
| Bow | 13 frames | 832x256 |

## Characters

### Warriors (leather armor, brown hair)
- `warrior-walk.png` / `warrior-slash.png` - Human (light skin)
- `warrior-dark-walk.png` / `warrior-dark-slash.png` - Dark-skinned
- `orc-warrior-walk.png` / `orc-warrior-slash.png` - Green skin
- `demon-warrior-walk.png` / `demon-warrior-slash.png` - Red skin
- `undead-warrior-walk.png` / `undead-warrior-slash.png` - Pale/gray skin

### Knights (plate armor)
- `knight-walk.png` - Human
- `knight-dark-walk.png` - Dark-skinned

### Mages (robes)
- `mage-brown-walk.png` / `mage-brown-spellcast.png` - Brown robe
- `mage-blue-walk.png` / `mage-blue-spellcast.png` - Blue robe
- `mage-fire-walk.png` / `mage-fire-spellcast.png` - Red/fire robe

### Archers (leather armor, bow)
- `archer-walk.png` / `archer-bow.png` - Human
- `archer-dark-walk.png` / `archer-dark-bow.png` - Dark-skinned

### Undead
- `skeleton-walk.png` / `skeleton-slash.png` - Skeleton with leather armor

## Usage

For games using bird's eye view (top-down) RPG style:
1. Select the row for desired direction
2. Cycle through columns for animation frames
3. Each frame is 64x64 pixels

Based on Liberated Pixel Cup (LPC) asset format.
