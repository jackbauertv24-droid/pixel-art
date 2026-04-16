#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { validateInput } from './types';
import { generatePNG, pngToBuffer } from './generator';
import { decodeImage } from './decoder';

const program = new Command();

program
  .name('pixel-art')
  .description('Generate pixel art PNG images from JSON input, or decode images to JSON format')
  .version('1.0.0');

program
  .command('encode')
  .description('Generate PNG from JSON pixel data')
  .argument('[input]', 'JSON input file path (reads from stdin if not provided)')
  .option('-o, --output <file>', 'Output PNG file path', 'output.png')
  .option('-s, --scale <number>', 'Scale factor for pixels', '1')
  .action(async (inputFile: string | undefined, options: { output: string; scale: string }) => {
    try {
      let jsonData: string;
      
      if (inputFile) {
        jsonData = fs.readFileSync(inputFile, 'utf-8');
      } else if (!process.stdin.isTTY) {
        jsonData = await readStdin();
      } else {
        console.error('Error: No input provided. Specify a file or pipe JSON via stdin.');
        process.exit(1);
      }
      
      const parsed = JSON.parse(jsonData);
      const input = validateInput(parsed);
      
      const scale = parseInt(options.scale, 10);
      if (scale < 1) {
        throw new Error('Scale must be at least 1');
      }
      input.scale = scale;
      
      const png = generatePNG(input);
      const buffer = await pngToBuffer(png);
      
      fs.writeFileSync(options.output, buffer);
      console.log(`Generated: ${options.output} (${input.width * scale}x${input.height * scale})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

program
  .command('decode')
  .description('Decode an image to JSON pixel format (for LLMs without vision)')
  .argument('<input>', 'Input image file (PNG, JPG, GIF, WebP, etc.)')
  .option('-o, --output <file>', 'Output JSON file path (prints to stdout if not provided)')
  .option('-m, --max-pixels <number>', 'Maximum pixel count (auto-resize if exceeded)')
  .option('-t, --threshold <number>', 'Alpha threshold (0-255), pixels below are excluded', '0')
  .option('--simplify', 'Remove most common color as background')
  .option('--detect-color-key', 'Auto-detect color key transparency (magenta, etc.)')
  .option('--color-key <hex>', 'Manually specify color key (e.g., #FF00FF)')
  .option('--compact', 'Output compact JSON without whitespace')
  .action(async (inputFile: string, options: { 
    output?: string; 
    maxPixels?: string; 
    threshold: string;
    simplify?: boolean;
    detectColorKey?: boolean;
    colorKey?: string;
    compact?: boolean;
  }) => {
    try {
      const threshold = parseInt(options.threshold, 10);
      const maxPixels = options.maxPixels ? parseInt(options.maxPixels, 10) : undefined;
      
      const decoded = await decodeImage(inputFile, {
        threshold,
        maxPixels,
        simplify: options.simplify,
        detectColorKey: options.detectColorKey,
        colorKey: options.colorKey
      });
      
      const json = options.compact 
        ? JSON.stringify(decoded)
        : JSON.stringify(decoded, null, 2);
      
      if (options.output) {
        fs.writeFileSync(options.output, json);
        console.log(`Decoded: ${options.output} (${decoded.width}x${decoded.height}, ${decoded.pixels.length} pixels)`);
      } else {
        console.log(json);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

program
  .command('convert')
  .description('Convert image to pixel art PNG (decode + encode)')
  .argument('<input>', 'Input image file')
  .option('-o, --output <file>', 'Output PNG file path')
  .option('-m, --max-pixels <number>', 'Maximum pixel count')
  .option('-s, --scale <number>', 'Scale factor for output', '1')
  .option('--simplify', 'Remove most common color as background')
  .option('--detect-color-key', 'Auto-detect color key transparency (magenta, etc.)')
  .option('--color-key <hex>', 'Manually specify color key (e.g., #FF00FF)')
  .action(async (inputFile: string, options: {
    output?: string;
    maxPixels?: string;
    scale: string;
    simplify?: boolean;
    detectColorKey?: boolean;
    colorKey?: string;
  }) => {
    try {
      const maxPixels = options.maxPixels ? parseInt(options.maxPixels, 10) : undefined;
      const scale = parseInt(options.scale, 10);
      
      const decoded = await decodeImage(inputFile, {
        maxPixels,
        simplify: options.simplify,
        detectColorKey: options.detectColorKey,
        colorKey: options.colorKey
      });
      
      decoded.scale = scale;
      
      const png = generatePNG(decoded);
      const buffer = await pngToBuffer(png);
      
      const outputFile = options.output || 
        `${path.basename(inputFile, path.extname(inputFile))}-pixel.png`;
      
      fs.writeFileSync(outputFile, buffer);
      console.log(`Converted: ${outputFile} (${decoded.width * scale}x${decoded.height * scale})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

program.parse();