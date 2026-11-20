import puppeteer from 'puppeteer-core';

const OUT = 'C:/Users/hp/AppData/Local/Temp/opencode/solecraft-qa';
const URL = 'http://127.0.0.1:4173';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

const page = await browser.newPage();
const problems = [];
page.on('console', (message) => {
  if (message.type() === 'error') problems.push(`console: ${message.text()}`);
});
page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));

const revealAll = async () => {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const step = Math.max(window.innerHeight * 0.7, 420);
    const height = document.body.scrollHeight;
    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 260));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 700));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 700));
  });
};

const shot = async (selector, name) => {
  const element = await page.$(selector);
  if (!element) {
    console.log('missing selector', selector);
    return;
  }
  await element.screenshot({ path: `${OUT}/${name}.png` });
};

/* Desktop */
await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await wait(500);
await revealAll();

const desktop = await page.evaluate(() => ({
  width: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  cards: document.querySelectorAll('#collection article').length,
  visibleCards: Array.from(document.querySelectorAll('#collection article')).filter(
    (card) => getComputedStyle(card.closest('div')).opacity !== '0',
  ).length,
  height: document.body.scrollHeight,
}));
console.log('desktop:', JSON.stringify(desktop));

await page.screenshot({ path: `${OUT}/desktop-full-2.png`, fullPage: true });
await shot('#collection', 'desktop-collection-2');
await shot('#craft', 'desktop-craft');
await shot('#reviews', 'desktop-reviews');
await shot('#footer', 'desktop-footer');

// Focus restoration check.
const focusResult = await page.evaluate(() => {
  const trigger = document.querySelector('#collection article button[aria-label^="Quick view"]');
  trigger.focus();
  trigger.click();
  return true;
});
await page.waitForSelector('[role="dialog"]');
await wait(500);
await page.keyboard.press('Escape');
await wait(500);
const restored = await page.evaluate(() => ({
  dialog: Boolean(document.querySelector('[role="dialog"]')),
  focusLabel: document.activeElement?.getAttribute('aria-label'),
  triggerVisible: Boolean(document.querySelector('#collection article button[aria-label^="Quick view"]')),
}));
console.log('focus restore:', JSON.stringify(restored));

/* Mobile */
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await wait(500);
await revealAll();
const mobile = await page.evaluate(() => ({
  width: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  cards: document.querySelectorAll('#collection article').length,
  height: document.body.scrollHeight,
}));
console.log('mobile:', JSON.stringify(mobile));
await page.screenshot({ path: `${OUT}/mobile-full-2.png`, fullPage: true });
await shot('#collection', 'mobile-collection');
await shot('#craft', 'mobile-craft');

// Mobile quick view.
await page.evaluate(() => {
  document.querySelector('#collection article button[aria-label^="Quick view"]')?.click();
});
await page.waitForSelector('[role="dialog"]');
await wait(600);
await page.screenshot({ path: `${OUT}/mobile-quickview-2.png` });
await page.keyboard.press('Escape');
await wait(400);

// Mobile menu.
await page.evaluate(() => {
  const button = Array.from(document.querySelectorAll('header button')).find((node) =>
    node.textContent.includes('Menu'),
  );
  button?.click();
});
await wait(600);
await page.screenshot({ path: `${OUT}/mobile-menu-2.png` });

console.log('problems:', problems.length ? problems : 'none');
await browser.close();
