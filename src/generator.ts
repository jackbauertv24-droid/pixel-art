import { PNG } from 'pngjs';
import { PixelArtInput, RGBA, parseColor } from './types';

export function generatePNG(input: PixelArtInput): PNG {
  const { width, height, pixels, background, scale = 1 } = input;
  
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  const png = new PNG({ width: scaledWidth, height: scaledHeight });
  
  const bgColor: RGBA = background 
    ? parseColor(background) 
    : { r: 0, g: 0, b: 0, a: 0 };
  
  for (let y = 0; y < scaledHeight; y++) {
    for (let x = 0; x < scaledWidth; x++) {
      const idx = (scaledWidth * y + x) << 2;
      png.data[idx] = bgColor.r;
      png.data[idx + 1] = bgColor.g;
      png.data[idx + 2] = bgColor.b;
      png.data[idx + 3] = bgColor.a;
    }
  }
  
  for (const pixel of pixels) {
    const color = parseColor(pixel.color);
    
    for (let sy = 0; sy < scale; sy++) {
      for (let sx = 0; sx < scale; sx++) {
        const px = pixel.x * scale + sx;
        const py = pixel.y * scale + sy;
        
        if (px >= 0 && px < scaledWidth && py >= 0 && py < scaledHeight) {
          const idx = (scaledWidth * py + px) << 2;
          png.data[idx] = color.r;
          png.data[idx + 1] = color.g;
          png.data[idx + 2] = color.b;
          png.data[idx + 3] = color.a;
        }
      }
    }
  }
  
  return png;
}

export function pngToBuffer(png: PNG): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    png.pack()
      .on('data', (chunk: Buffer) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', reject);
  });
}
