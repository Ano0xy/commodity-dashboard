import sharp from 'sharp';
import fs from 'fs';

async function run() {
  const dir = "public/frames";
  for (let i = 1; i <= 40; i++) {
    const name = `ezgif-frame-${i.toString().padStart(3, "0")}`;
    try {
      await sharp(`${dir}/${name}.jpg`)
        .resize(1280)
        .webp({ quality: 90 })
        .toFile(`${dir}/${name}.webp`);
      console.log(`Converted ${name}`);
      // Clean up old jpg
      fs.unlinkSync(`${dir}/${name}.jpg`);
    } catch(e) {
      console.error(e);
    }
  }
}
run();
