export interface Pixel {
  x: number;
  y: number;
  color: string;
}

export interface PixelArtInput {
  width: number;
  height: number;
  pixels: Pixel[];
  background?: string;
  scale?: number;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  if (a === 255) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
}

export function parseColor(color: string): RGBA {
  const hex = color.replace('#', '');
  
  if (hex.length === 6) {
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
      a: 255
    };
  }
  
  if (hex.length === 8) {
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
      a: parseInt(hex.substring(6, 8), 16)
    };
  }
  
  throw new Error(`Invalid color format: ${color}. Use #RRGGBB or #RRGGBBAA`);
}

export function validateInput(input: unknown): PixelArtInput {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Input must be an object');
  }
  
  const data = input as Record<string, unknown>;
  
  if (typeof data.width !== 'number' || data.width < 1) {
    throw new Error('width must be a positive number');
  }
  
  if (typeof data.height !== 'number' || data.height < 1) {
    throw new Error('height must be a positive number');
  }
  
  if (!Array.isArray(data.pixels)) {
    throw new Error('pixels must be an array');
  }
  
  for (let i = 0; i < data.pixels.length; i++) {
    const pixel = data.pixels[i] as Record<string, unknown>;
    
    if (typeof pixel.x !== 'number' || typeof pixel.y !== 'number') {
      throw new Error(`pixel[${i}] must have x and y numbers`);
    }
    
    if (typeof pixel.color !== 'string') {
      throw new Error(`pixel[${i}] must have a color string`);
    }
  }
  
  return {
    width: data.width,
    height: data.height,
    pixels: data.pixels as Pixel[],
    background: data.background as string | undefined,
    scale: data.scale as number | undefined
  };
}
