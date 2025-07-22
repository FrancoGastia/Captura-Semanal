const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const delay = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= document.body.scrollHeight){
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  });
}

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  await page.goto('https://tusitio.com', { waitUntil: 'networkidle2' });

  // Espera fija con método compatible (reemplaza waitForTimeout)
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Auto scroll para cargar toda la página
  await autoScroll(page);

  await page.screenshot({ path: './screenshots/captura.png', fullPage: true });

  await browser.close();
})();
