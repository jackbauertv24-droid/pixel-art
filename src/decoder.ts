import sharp from 'sharp';
import { Pixel, PixelArtInput, rgbaToHex } from './types';

export interface DecodeOptions {
  threshold?: number;
  maxPixels?: number;
  simplify?: boolean;
  detectColorKey?: boolean;
  colorKey?: string;
}

interface ColorInfo {
  color: string;
  r: number;
  g: number;
  b: number;
  count: number;
  touchesEdge: boolean;
}

function isColorKeyCandidate(info: ColorInfo, totalPixels: number): boolean {
  const ratio = info.count / totalPixels;
  if (ratio < 0.1) return false;
  if (!info.touchesEdge) return false;
  
  const isHighSaturation = 
    (Math.abs(info.r - info.g) > 100 || Math.abs(info.g - info.b) > 100 || Math.abs(info.r - info.b) > 100);
  
  const isHighValue = info.r > 200 || info.g > 200 || info.b > 200;
  
  return isHighSaturation || isHighValue;
}

export async function decodeImage(
  imagePath: string,
  options: DecodeOptions = {}
): Promise<PixelArtInput> {
  const { 
    threshold = 0, 
    maxPixels, 
    simplify = false,
    detectColorKey = false,
    colorKey 
  } = options;
  
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  
  let width = metadata.width || 0;
  let height = metadata.height || 0;
  
  if (maxPixels && width * height > maxPixels) {
    const scale = Math.sqrt(maxPixels / (width * height));
    width = Math.floor(width * scale);
    height = Math.floor(height * scale);
  }
  
  if (width === 0 || height === 0) {
    throw new Error('Could not determine image dimensions');
  }
  
  const resized = sharp(imagePath).resize(width, height);
  const { data, info } = await resized
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels: Pixel[] = [];
  const seenColors = new Map<string, ColorInfo>();
  const totalPixels = info.width * info.height;
  
  let manualColorKey: { r: number; g: number; b: number } | null = null;
  if (colorKey) {
    const hex = colorKey.replace('#', '');
    manualColorKey = {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      if (a <= threshold) continue;
      
      const rgbHex = rgbaToHex(r, g, b, 255).toLowerCase();
      const touchesEdge = x === 0 || y === 0 || x === info.width - 1 || y === info.height - 1;
      
      if (simplify || detectColorKey) {
        const existing = seenColors.get(rgbHex);
        if (existing) {
          existing.count++;
          existing.touchesEdge = existing.touchesEdge || touchesEdge;
        } else {
          seenColors.set(rgbHex, { 
            color: rgbHex, 
            r, g, b, 
            count: 1, 
            touchesEdge 
          });
        }
      }
      
      pixels.push({ x, y, color: rgbaToHex(r, g, b, a) });
    }
  }
  
  let detectedColorKey: string | null = null;
  
  if (detectColorKey && seenColors.size > 0) {
    const candidates = [...seenColors.values()]
      .filter(c => isColorKeyCandidate(c, totalPixels))
      .sort((a, b) => b.count - a.count);
    
    if (candidates.length > 0) {
      detectedColorKey = candidates[0].color;
    }
  }
  
  if (manualColorKey && colorKey) {
    detectedColorKey = colorKey.toLowerCase().startsWith('#') ? colorKey.toLowerCase() : `#${colorKey.toLowerCase()}`;
  }
  
  const result: PixelArtInput = {
    width: info.width,
    height: info.height,
    pixels
  };
  
  if (detectedColorKey) {
    result.background = '#00000000';
    result.pixels = pixels.filter(p => {
      const pixelHex = p.color.substring(0, 7).toLowerCase();
      return pixelHex !== detectedColorKey;
    });
  } else if (simplify && seenColors.size > 0) {
    const bgColor = [...seenColors.entries()]
      .sort((a, b) => b[1].count - a[1].count)[0][0];
    result.background = bgColor;
    result.pixels = pixels.filter(p => p.color !== bgColor);
  }
  
  return result;
}

export async function decodeFromBuffer(
  buffer: Buffer,
  options: DecodeOptions = {}
): Promise<PixelArtInput> {
  const { 
    threshold = 0, 
    maxPixels, 
    simplify = false,
    detectColorKey = false,
    colorKey 
  } = options;
  
  const metadata = await sharp(buffer).metadata();
  
  let width = metadata.width || 0;
  let height = metadata.height || 0;
  
  if (maxPixels && width * height > maxPixels) {
    const scale = Math.sqrt(maxPixels / (width * height));
    width = Math.floor(width * scale);
    height = Math.floor(height * scale);
  }
  
  if (width === 0 || height === 0) {
    throw new Error('Could not determine image dimensions');
  }
  
  const { data, info } = await sharp(buffer)
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels: Pixel[] = [];
  const seenColors = new Map<string, ColorInfo>();
  const totalPixels = info.width * info.height;
  
  let manualColorKey: { r: number; g: number; b: number } | null = null;
  if (colorKey) {
    const hex = colorKey.replace('#', '');
    manualColorKey = {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      if (a <= threshold) continue;
      
      const rgbHex = rgbaToHex(r, g, b, 255).toLowerCase();
      const touchesEdge = x === 0 || y === 0 || x === info.width - 1 || y === info.height - 1;
      
      if (simplify || detectColorKey) {
        const existing = seenColors.get(rgbHex);
        if (existing) {
          existing.count++;
          existing.touchesEdge = existing.touchesEdge || touchesEdge;
        } else {
          seenColors.set(rgbHex, { 
            color: rgbHex, 
            r, g, b, 
            count: 1, 
            touchesEdge 
          });
        }
      }
      
      pixels.push({ x, y, color: rgbaToHex(r, g, b, a) });
    }
  }
  
  let detectedColorKey: string | null = null;
  
  if (detectColorKey && seenColors.size > 0) {
    const candidates = [...seenColors.values()]
      .filter(c => isColorKeyCandidate(c, totalPixels))
      .sort((a, b) => b.count - a.count);
    
    if (candidates.length > 0) {
      detectedColorKey = candidates[0].color;
    }
  }
  
  if (manualColorKey && colorKey) {
    detectedColorKey = colorKey.toLowerCase().startsWith('#') ? colorKey.toLowerCase() : `#${colorKey.toLowerCase()}`;
  }
  
  const result: PixelArtInput = {
    width: info.width,
    height: info.height,
    pixels
  };
  
  if (detectedColorKey) {
    result.background = '#00000000';
    result.pixels = pixels.filter(p => {
      const pixelHex = p.color.substring(0, 7).toLowerCase();
      return pixelHex !== detectedColorKey;
    });
  } else if (simplify && seenColors.size > 0) {
    const bgColor = [...seenColors.entries()]
      .sort((a, b) => b[1].count - a[1].count)[0][0];
    result.background = bgColor;
    result.pixels = pixels.filter(p => p.color !== bgColor);
  }
  
  return result;
}