import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('http://127.0.0.1:4317', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await new Promise((resolve) => setTimeout(resolve, 800));

const data = await page.evaluate(() => {
  const vw = window.innerWidth;
  const offenders = [];
  for (const node of document.querySelectorAll('body *')) {
    const rect = node.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (rect.right > vw + 1) {
      let clipped = false;
      let parent = node.parentElement;
      while (parent) {
        const style = getComputedStyle(parent);
        if (['hidden', 'clip'].includes(style.overflowX)) {
          clipped = true;
          break;
        }
        parent = parent.parentElement;
      }
      offenders.push({
        tag: node.tagName.toLowerCase(),
        cls: String(node.className).slice(0, 60),
        right: Math.round(rect.right),
        clipped,
      });
    }
  }
  return {
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    visualWidth: window.visualViewport?.width,
    scale: window.visualViewport?.scale,
    scrollWidth: document.documentElement.scrollWidth,
    headerHeight: Math.round(document.querySelector('header').getBoundingClientRect().height),
    heroTitle: document.querySelector('h1')?.textContent,
    offenders: offenders.slice(0, 12),
  };
});
console.log(JSON.stringify(data, null, 2));

await page.screenshot({ path: 'C:/Users/hp/AppData/Local/Temp/opencode/solecraft-qa/ours-mobile-hero.png' });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  document.getElementById('collection')?.scrollIntoView();
});
await new Promise((resolve) => setTimeout(resolve, 1200));
await page.screenshot({ path: 'C:/Users/hp/AppData/Local/Temp/opencode/solecraft-qa/ours-mobile-collection.png' });
await browser.close();
