const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if(totalHeight >= document.body.scrollHeight){
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  });
  const page = await browser.newPage();

  // Seteá un User-Agent realista
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  const URL = 'https://www.despegar.com.ar/hoteles/';

  try {
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Pequeña pausa inicial
    await new Promise(r => setTimeout(r, 3000));

    // Scroll para cargar contenido dinámico
    await autoScroll(page);

    // Espera extra por si hay más carga
    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({ path: './screenshots/captura.png', fullPage: true });
    console.log('✔️ Captura completada');
  } catch (e) {
    console.error('❌ Error durante la captura:', e.message);
  } finally {
    await browser.close();
  }
})();
