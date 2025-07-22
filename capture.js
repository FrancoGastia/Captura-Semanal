const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const date = new Date().toISOString().split('T')[0];
  const fileName = `screenshot-${date}.png`;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.despegar.com.ar/', { waitUntil: 'networkidle2' });
  await page.setViewport({ width: 1280, height: 800 });

  await page.screenshot({ path: fileName, fullPage: true });

  await browser.close();

  // Crear carpeta si no existe
  const dir = 'screenshots';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.renameSync(fileName, path.join(dir, fileName));
})();
