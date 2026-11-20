import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();

const diagnose = async (label) => {
  const data = await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    for (const node of document.querySelectorAll('body *')) {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.right > vw + 1 || rect.width > vw + 1) {
        const style = getComputedStyle(node);
        offenders.push({
          tag: node.tagName.toLowerCase(),
          cls: String(node.className).slice(0, 70),
          width: Math.round(rect.width),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          position: style.position,
          display: style.display,
          text: node.textContent.trim().slice(0, 35),
        });
      }
    }
    return {
      innerWidth: window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      visualWidth: window.visualViewport?.width,
      scale: window.visualViewport?.scale,
      dpr: window.devicePixelRatio,
      screenWidth: window.screen.width,
      scrollWidth: document.documentElement.scrollWidth,
      meta: document.querySelector('meta[name="viewport"]')?.content,
      offenders: offenders.slice(0, 18),
    };
  });
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(data, null, 2));
};

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await diagnose('mobile emulation, fresh load');

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: false });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await diagnose('desktop mode 390, reload');

await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await diagnose('desktop 1440');

await browser.close();
