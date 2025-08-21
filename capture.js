const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

// Arrays más extensos y actualizados
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
];

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1536, height: 864 },
  { width: 1440, height: 900 },
  { width: 1280, height: 1024 },
  { width: 1600, height: 900 }
];

// Delays más humanos y variables
const humanDelay = (min = 2000, max = 8000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const microDelay = (min = 100, max = 500) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Función para comportamiento super humano
async function superHumanBehavior(page, viewport) {
  console.log('🤖 Simulando comportamiento humano avanzado...');
  
  // Movimientos de mouse muy naturales
  for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
    const x = Math.floor(Math.random() * viewport.width);
    const y = Math.floor(Math.random() * viewport.height);
    
    // Movimiento con curva Bézier simulada
    await page.mouse.move(x, y, { steps: Math.floor(Math.random() * 20) + 10 });
    await page.waitForTimeout(microDelay(200, 800));
    
    // Ocasionalmente hacer hover
    if (Math.random() > 0.7) {
      await page.waitForTimeout(microDelay(500, 1500));
    }
  }
  
  // Scroll muy gradual y humano
  const scrollSteps = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < scrollSteps; i++) {
    const scrollAmount = Math.floor(Math.random() * 300) + 100;
    await page.evaluate((amount) => {
      window.scrollBy({
        top: amount,
        behavior: 'smooth'
      });
    }, scrollAmount);
    await page.waitForTimeout(humanDelay(1000, 3000));
  }
  
  // Simular lectura (pause larga)
  console.log('📖 Simulando tiempo de lectura...');
  await page.waitForTimeout(humanDelay(5000, 12000));
}

// Función para inyectar JavaScript que oculte la automatización
async function injectAntiDetection(page) {
  await page.evaluateOnNewDocument(() => {
    // Sobrescribir webdriver flag
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
    
    // Simular plugins reales
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });
    
    // Simular idiomas reales
    Object.defineProperty(navigator, 'languages', {
      get: () => ['es-AR', 'es', 'en'],
    });
    
    // Ocultar características de automatización
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
    
    // Simular propiedades del navegador
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      get: () => 4,
    });
    
    Object.defineProperty(navigator, 'deviceMemory', {
      get: () => 8,
    });
    
    // Ocultar características de Chrome headless
    Object.defineProperty(navigator, 'platform', {
      get: () => 'Win32',
    });
  });
}

(async () => {
  let browser;
  
  try {
    console.log('🚀 Iniciando navegador STEALTH AVANZADO...');
    
    // Configuración más realista del navegador
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
        '--hide-scrollbars',
        '--mute-audio',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=TranslateUI',
        '--disable-features=VizDisplayCompositor',
        '--disable-default-apps',
        '--no-default-browser-check',
        '--disable-extensions-file-access-check',
        '--disable-extensions-http-throttling',
        '--disable-extensions-except',
        '--autoplay-policy=user-gesture-required',
        '--disable-background-mode',
        '--disable-permissions-api',
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--window-size=1920,1080'
      ]
    });

    const page = await browser.newPage();
    
    // Configuración aleatoria pero realista
    const randomViewport = viewports[Math.floor(Math.random() * viewports.length)];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    
    await page.setViewport(randomViewport);
    await page.setUserAgent(randomUserAgent);
    
    console.log(`📱 Viewport: ${randomViewport.width}x${randomViewport.height}`);
    console.log(`🕵️ User Agent: ${randomUserAgent.split(' ')[0]}...`);
    
    // Inyectar código anti-detección ANTES de navegar
    await injectAntiDetection(page);
    
    // Headers más realistas y específicos de Argentina
    await page.setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'es-AR,es;q=0.9,es-419;q=0.8,en;q=0.7',
      'Cache-Control': 'max-age=0',
      'DNT': '1',
      'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1'
    });
    
    // Configurar geolocalización argentina
    await page.setGeolocation({ latitude: -34.6037, longitude: -58.3816 });
    await page.emulateTimezone('America/Argentina/Buenos_Aires');
    
    // Delay inicial largo para parecer más humano
    console.log('⏳ Delay inicial (simulando apertura de navegador)...');
    await page.waitForTimeout(humanDelay(3000, 8000));
    
    console.log('🌐 Navegando a Despegar...');
    const url = 'https://www.despegar.com.ar/hoteles/';
    
    // Navegar con configuración muy conservadora
    await page.goto(url, { 
      waitUntil: 'networkidle0',  // Esperar a que TODO termine de cargar
      timeout: 90000 
    });
    
    console.log('⏳ Esperando carga completa...');
    await page.waitForTimeout(humanDelay(5000, 10000));
    
    // Verificar si la página cargó correctamente
    const title = await page.title();
    console.log(`📄 Título de página: ${title}`);
    
    // Verificar si fuimos bloqueados
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (bodyText.includes('bloqueado') || bodyText.includes('blocked') || bodyText.includes('robot')) {
      console.log('🚨 DETECTADO BLOQUEO - Intentando técnicas adicionales...');
      
      // Intentar refrescar con delay
      await page.waitForTimeout(humanDelay(8000, 15000));
      await page.reload({ waitUntil: 'networkidle0' });
      await page.waitForTimeout(humanDelay(5000, 10000));
    }
    
    // Comportamiento humano súper avanzado
    await superHumanBehavior(page, randomViewport);
    
    // Scroll final muy gradual
    console.log('📜 Scroll final gradual...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 150; // Scroll más pequeño
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 800); // Más lento
      });
    });
    
    // Delay final largo antes de captura
    console.log('⏳ Delay final antes de captura...');
    await page.waitForTimeout(humanDelay(5000, 10000));
    
    // Crear directorio
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filePath = path.join('screenshots', `captura-stealth-${timestamp}.png`);
    
    console.log('📸 Tomando captura final...');
    await page.screenshot({ 
      path: filePath, 
      fullPage: true,
      type: 'png'
    });
    
    console.log(`✅ Captura STEALTH guardada en: ${filePath}`);
    
  } catch (error) {
    console.error('❌ Error durante captura stealth:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Navegador cerrado');
    }
  }
})();
