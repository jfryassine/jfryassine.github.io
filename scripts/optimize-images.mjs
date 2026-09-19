import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('../src/Components/Gallery/imgs/', import.meta.url);
const destination = new URL('../src/Components/Gallery/optimized/', import.meta.url);
await mkdir(destination, { recursive: true });
const dimensions = await Promise.all(Array.from({ length: 16 }, async (_, index) => {
  const name = `Img${index + 1}`;
  const result = await sharp(fileURLToPath(new URL(`${name}.jpg`, source)))
    .rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 83 })
    .toFile(fileURLToPath(new URL(`${name}.webp`, destination)));
  return { width: result.width, height: result.height };
}));
await writeFile(new URL('../dimensions.json', destination), JSON.stringify(dimensions, null, 2) + '\n');
console.log('Optimized all 16 photographs; original JPEGs are unchanged.');
