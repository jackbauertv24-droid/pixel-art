import sharp from 'sharp';
import { Pixel, PixelArtInput, rgbaToHex } from './types';

export interface DecodeOptions {
  threshold?: number;
  maxPixels?: number;
  simplify?: boolean;
}

export async function decodeImage(
  imagePath: string,
  options: DecodeOptions = {}
): Promise<PixelArtInput> {
  const { threshold = 0, maxPixels, simplify = false } = options;
  
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
  const seenColors = new Map<string, number>();
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      if (a <= threshold) continue;
      
      const color = rgbaToHex(r, g, b, a);
      
      if (simplify) {
        const count = seenColors.get(color) || 0;
        seenColors.set(color, count + 1);
      }
      
      pixels.push({ x, y, color });
    }
  }
  
  const result: PixelArtInput = {
    width: info.width,
    height: info.height,
    pixels
  };
  
  if (simplify && seenColors.size > 0) {
    const bgColor = [...seenColors.entries()].sort((a, b) => b[1] - a[1])[0][0];
    result.background = bgColor;
    result.pixels = pixels.filter(p => p.color !== bgColor);
  }
  
  return result;
}

export async function decodeFromBuffer(
  buffer: Buffer,
  options: DecodeOptions = {}
): Promise<PixelArtInput> {
  const { threshold = 0, maxPixels, simplify = false } = options;
  
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
  const seenColors = new Map<string, number>();
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      if (a <= threshold) continue;
      
      const color = rgbaToHex(r, g, b, a);
      
      if (simplify) {
        const count = seenColors.get(color) || 0;
        seenColors.set(color, count + 1);
      }
      
      pixels.push({ x, y, color });
    }
  }
  
  const result: PixelArtInput = {
    width: info.width,
    height: info.height,
    pixels
  };
  
  if (simplify && seenColors.size > 0) {
    const bgColor = [...seenColors.entries()].sort((a, b) => b[1] - a[1])[0][0];
    result.background = bgColor;
    result.pixels = pixels.filter(p => p.color !== bgColor);
  }
  
  return result;
}
