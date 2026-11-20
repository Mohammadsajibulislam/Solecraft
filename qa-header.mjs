import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: false });
await page.goto('http://127.0.0.1:4317', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);

const data = await page.evaluate(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { width: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right) };
  };
  const describe = (el) => ({
    tag: el.tagName.toLowerCase(),
    text: el.textContent.trim().slice(0, 30),
    cls: String(el.className).slice(0, 100),
    display: getComputedStyle(el).display,
    ...rect(el),
  });

  const header = document.querySelector('header');
  const container = header.querySelector(':scope > div');
  const actions = container.lastElementChild;

  return {
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    header: rect(header),
    container: rect(container),
    containerChildren: [...container.children].map(describe),
    actions: describe(actions),
    actionChildren: [...actions.children].map(describe),
    forms: [...document.querySelectorAll('form[role="search"]')].map(describe),
    shopAll: [...document.querySelectorAll('a')]
      .filter((a) => a.textContent.includes('Shop all'))
      .map(describe),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
