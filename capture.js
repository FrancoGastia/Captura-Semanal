const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const url = 'https://www.despegar.com.ar/hoteles/';
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Scroll para cargar más contenido
  await autoScroll(page);
  await page.waitForTimeout(2000);

  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  const filePath = path.join('screenshots', 'captura.png');
  await page.screenshot({ path: filePath, fullPage: true });

  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 400);
    });
  });
}
