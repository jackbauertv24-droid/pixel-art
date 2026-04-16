#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import { validateInput } from './types';
import { generatePNG, pngToBuffer } from './generator';

const program = new Command();

program
  .name('pixel-art')
  .description('Generate pixel art PNG images from JSON input')
  .version('1.0.0')
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
