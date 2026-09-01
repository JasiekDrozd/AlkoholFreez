import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

function createSvg(size) {
  const r = Math.round(size * 0.38);
  const cx = size / 2;
  const cy = size / 2;
  const rx = Math.round(size * 0.16);
  const checkSize = Math.round(size * 0.22);
  const checkX = cx - checkSize / 2;
  const checkY = cy - checkSize / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#09090b" rx="${rx}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#22c55e" opacity="0.15"/>
  <circle cx="${cx}" cy="${cy}" r="${Math.round(r * 0.7)}" fill="none" stroke="#22c55e" stroke-width="${Math.round(size * 0.02)}"/>
  <path d="M${checkX + checkSize * 0.2} ${checkY + checkSize * 0.52} L${checkX + checkSize * 0.42} ${checkY + checkSize * 0.72} L${checkX + checkSize * 0.78} ${checkY + checkSize * 0.3}"
    fill="none" stroke="#22c55e" stroke-width="${Math.round(size * 0.03)}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

async function generate(size) {
  const svg = createSvg(size);
  const png = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  const path = join(publicDir, `icon-${size}.png`);
  writeFileSync(path, png);
  console.log(`Generated ${path} (${png.length} bytes)`);
}

await generate(192);
await generate(512);
console.log('Done!');
