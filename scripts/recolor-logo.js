const { Jimp } = require('jimp');

async function main() {
  const image = await Jimp.read('public/logo.png');
  const { width, height, data } = image.bitmap;

  let darkCount = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 10) continue;
    // Perceived luminance
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum < 80) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      darkCount++;
    }
  }

  console.log('Recolored pixels:', darkCount, 'of', width * height);
  await image.write('public/logo-light.png');
  console.log('Wrote public/logo-light.png', width, 'x', height);
}

main().catch((e) => { console.error(e); process.exit(1); });
