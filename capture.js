const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

// Generar user agent aleatorio
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
];

const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

// Viewports realistas
const viewports = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1280, height: 720 }
];

const randomViewport = viewports[Math.floor(Math.random() * viewports.length)];

// Función para delay aleatorio
const randomDelay = (min = 1000, max = 3000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Función para simular movimientos de mouse humanos
async function simulateHumanBehavior(page) {
  // Movimientos de mouse aleatorios
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(Math.random() * randomViewport.width);
    const y = Math.floor(Math.random() * randomViewport.height);
    await page.mouse.move(x, y, { steps: 10 });
    await page.waitForTimeout(randomDelay(500, 1500));
  }
  
  // Scroll aleatorio pequeño
  await page.evaluate(() => {
    window.scrollBy(0, Math.floor(Math.random() * 200));
  });
  
  await page.waitForTimeout(randomDelay(1000, 2000));
}

(async () => {
  let browser;
  
  try {
    console.log('🚀 Iniciando navegador con configuración anti-detección...');
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-field-trial-config',
        '--disable-back-forward-cache',
        '--disable-ipc-flooding-protection',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--force-color-profile=srgb',
        '--metrics-recording-only',
        '--use-mock-keychain',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-translate',
        '--disable-logging',
        '--disable-background-networking',
        '--disable-default-apps',
        '--mute-audio',
        '--no-default-browser-check',
        '--autoplay-policy=user-gesture-required',
        '--disable-background-mode',
        '--disable-backgrounding-occluded-windows',
        '--disable-permissions-api',
        '--disable-web-security',
        '--allow-running-insecure-content'
      ]
    });

    const page = await browser.newPage();
    
    // Configurar viewport aleatorio
    await page.setViewport(randomViewport);
    console.log(`📱 Viewport configurado: ${randomViewport.width}x${randomViewport.height}`);
    
    // Configurar user agent aleatorio
    await page.setUserAgent(randomUserAgent);
    console.log(`🕵️ User agent configurado: ${randomUserAgent.substring(0, 50)}...`);
    
    // Headers adicionales para parecer más real
    await page.setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1'
    });
    
    // Configurar timezone argentino
    await page.emulateTimezone('America/Argentina/Buenos_Aires');
    
    console.log('🌐 Navegando a Despegar...');
    const url = 'https://www.despegar.com.ar/hoteles/';
    
    // Navegar con timeout extendido
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    
    console.log('⏳ Esperando que la página cargue completamente...');
    await page.waitForTimeout(randomDelay(3000, 5000));
    
    // Simular comportamiento humano
    await simulateHumanBehavior(page);
    
    // Esperar a que elementos clave estén presentes
    try {
      await page.waitForSelector('body', { timeout: 10000 });
      console.log('✅ Página cargada correctamente');
    } catch (error) {
      console.log('⚠️ No se pudo detectar selector específico, continuando...');
    }
    
    // Scroll suave para cargar contenido dinámico
    console.log('📜 Realizando scroll para cargar contenido...');
    await smoothScroll(page);
    
    // Esperar un poco más después del scroll
    await page.waitForTimeout(randomDelay(2000, 4000));
    
    // Crear directorio si no existe
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }
    
    // Generar nombre de archivo con timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filePath = path.join('screenshots', `captura-${timestamp}.png`);
    
    console.log('📸 Tomando captura de pantalla...');
    await page.screenshot({ 
      path: filePath, 
      fullPage: true,
      type: 'png'
    });
    
    console.log(`✅ Captura guardada en: ${filePath}`);
    
  } catch (error) {
    console.error('❌ Error durante la captura:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Navegador cerrado');
    }
  }
})();

// Función de scroll más suave y humana
async function smoothScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = Math.floor(Math.random() * 200) + 100; // Scroll aleatorio entre 100-300px
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Pausas aleatorias durante el scroll
        if (Math.random() > 0.7) {
          setTimeout(() => {}, Math.random() * 1000);
        }

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, Math.random() * 400 + 200); // Intervalo aleatorio entre 200-600ms
    });
  });
}
