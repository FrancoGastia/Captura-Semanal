const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const date = new Date().toISOString().split('T')[0];
  const fileName = `screenshot-${date}.png`;

const browser = await puppeteer.launch({
  headless: "new",  // compatible con Puppeteer moderno y GitHub Actions
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

  const page = await browser.newPage();

  // Emula navegador real
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 800 });
  await page.setExtraHTTPHeaders({
    'accept-language': 'en-US,en;q=0.9',
  });

  // URL a capturar — reemplazá esto por tu web real
  await page.goto('https://www.despegar.com.ar/', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  await page.waitForTimeout(3000); // Tiempo para que todo cargue

  await page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });

  await browser.close();
})();
