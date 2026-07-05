import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = '/Users/fadzryrosly/Documents/dreammade-prototype/public';

const images = [
  // SyokPod V2
  ...Array.from({ length: 5 }, (_, i) => `/products/syokpod/v2/syokpod-${i + 1}.jpg`),
  // SyokPod Pro
  ...Array.from({ length: 6 }, (_, i) => `/products/syokpod/pro/syokpod-pro-${i + 1}.jpg`),
  // SyokPod GT
  ...Array.from({ length: 6 }, (_, i) => `/products/syokpod/gt/gt-${i + 1}.jpg`),
  // SyokPod 2 Years
  ...Array.from({ length: 3 }, (_, i) => `/products/syokpod/2years/2years-${i + 1}.jpg`),
  // SyokPod Lush
  ...Array.from({ length: 3 }, (_, i) => `/products/syokpod/lush/lush-${i + 1}.jpg`),

  // SyokBar Standard
  ...Array.from({ length: 5 }, (_, i) => `/products/syokbar/SYOKBAR/syokbar-0${i + 1}.jpg`),
  // SyokBar FIFA
  '/products/syokbar/SYOKBAR FIFA/all-syokbar-fifa.jpg',
  '/products/syokbar/SYOKBAR FIFA/fifa-england.jpg',
  '/products/syokbar/SYOKBAR FIFA/fifa-portugal.jpg',
  '/products/syokbar/SYOKBAR FIFA/fifa-france.jpg',
  '/products/syokbar/SYOKBAR FIFA/fifa-spain.jpg',
  '/products/syokbar/SYOKBAR FIFA/FIFA1.jpg',
  // SyokBar Camo
  ...Array.from({ length: 6 }, (_, i) => `/products/syokbar/SYOKBAR CAMO EDITION/camo-shoot-${i + 1}.jpg`),
  // SyokBar Target
  ...Array.from({ length: 9 }, (_, i) => `/products/syokbar/SYOKBAR TARGET/target-model-${i + 1}.jpg`)
];

async function checkImages() {
  console.log('--- AUDITING CAMPAIGN GALLERY IMAGES ---');
  for (const imgPath of images) {
    const fullPath = path.join(publicDir, imgPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`[MISSING] ${imgPath}`);
      continue;
    }
    try {
      const metadata = await sharp(fullPath).metadata();
      const width = metadata.width || 0;
      const height = metadata.height || 0;
      const ratio = width / height;
      let orientation = 'square';
      if (ratio > 1.05) orientation = 'landscape';
      else if (ratio < 0.95) orientation = 'portrait';
      
      console.log(`${imgPath.padEnd(60)} | ${width}x${height} | Ratio: ${ratio.toFixed(2)} | Orientation: ${orientation.toUpperCase()}`);
    } catch (err) {
      console.log(`[ERROR] ${imgPath}: ${err.message}`);
    }
  }
}

checkImages();
