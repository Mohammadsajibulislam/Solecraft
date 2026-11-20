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
page.on('requestfailed', (request) => {
  problems.push(`requestfailed: ${request.url()} — ${request.failure()?.errorText}`);
});

const metrics = async (label) => {
  const result = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    cards: document.querySelectorAll('#collection article').length,
  }));
  console.log(label, JSON.stringify(result));
  return result;
};

const scrollThrough = async () => {
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.7, 500);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 110));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 350));
  });
};

const clickByText = async (scope, text) => {
  await page.evaluate(
    (selector, wanted) => {
      const nodes = Array.from(document.querySelectorAll(selector));
      const target = nodes.find((node) => node.textContent.trim().startsWith(wanted));
      if (!target) throw new Error(`No element in ${selector} starting with "${wanted}"`);
      target.click();
    },
    scope,
    text,
  );
};

/* ------------------------------- Desktop ------------------------------- */
await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await wait(600);
await scrollThrough();

const desktop = await metrics('desktop:');
await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true });

// Search sync: navbar input filters the collection.
await page.click('#nav-search');
await page.type('#nav-search', 'chelsea');
await wait(500);
const searchCount = await page.evaluate(
  () => document.querySelectorAll('#collection article').length,
);
const searchNames = await page.$$eval('#collection article h3', (nodes) =>
  nodes.map((node) => node.textContent),
);
console.log('search "chelsea":', searchCount, searchNames.join(' | '));

// Clear search with the navbar clear button.
await page.click('#nav-search ~ button[aria-label="Clear search"]').catch(async () => {
  await page.evaluate(() => {
    const button = document.querySelector('form[role="search"] button[aria-label="Clear search"]');
    button?.click();
  });
});
await wait(350);

// Empty state for an impossible query.
await page.click('#nav-search');
await page.type('#nav-search', 'zzzz');
await wait(400);
const emptyVisible = await page.evaluate(() =>
  Boolean(document.querySelector('#collection h3')?.textContent.includes('No pairs found')),
);
console.log('empty state visible:', emptyVisible);
await clickByText('#collection button', 'Clear filters');
await wait(400);

// Category filter from chips.
await clickByText('#collection button', 'Boots');
await wait(450);
const bootsCount = await page.evaluate(
  () => document.querySelectorAll('#collection article').length,
);
console.log('Boots filter count:', bootsCount);

// Sort low to high.
await page.select('select[aria-label="Sort products"]', 'price-asc');
await wait(350);
const firstSorted = await page.$eval('#collection article h3', (node) => node.textContent);
console.log('first after price-asc:', firstSorted);

// Reset.
await clickByText('#collection button', 'Clear filters');
await wait(400);

// Category index selects a category and clears search.
await page.evaluate(() => {
  document.querySelector('button[aria-label^="Browse Trail"]')?.click();
});
await wait(900);
const trailCount = await page.evaluate(
  () => document.querySelectorAll('#collection article').length,
);
console.log('Trail from category index:', trailCount);
await page.evaluate(() => {
  const button = Array.from(document.querySelectorAll('#collection button')).find((node) =>
    node.textContent.trim().startsWith('All pairs'),
  );
  button?.click();
});
await wait(400);

// Quick view: open, inspect, screenshot, close with Escape.
await page.evaluate(() => {
  document.querySelector('#collection article button[aria-label^="Quick view"]')?.click();
});
await page.waitForSelector('[role="dialog"]');
await wait(650);
const dialogInfo = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const title = dialog.querySelector('h2')?.textContent;
  const active = document.activeElement;
  return {
    title,
    modal: dialog.getAttribute('aria-modal'),
    labelled: dialog.getAttribute('aria-labelledby'),
    focusInside: dialog.contains(active),
    focusLabel: active?.getAttribute('aria-label') ?? active?.textContent?.trim().slice(0, 40),
    scrollLocked: getComputedStyle(document.body).overflow,
    swatches: dialog.querySelectorAll('fieldset button[aria-pressed]').length,
    sizes: dialog.querySelectorAll('fieldset button[aria-pressed]').length,
  };
});
console.log('quick view:', JSON.stringify(dialogInfo));
await page.screenshot({ path: `${OUT}/desktop-quickview.png` });

// Toggle saved inside the modal.
const savedLabelBefore = await page.$eval('[role="dialog"] button[aria-pressed]', (node) =>
  node.textContent.trim(),
);
await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const button = Array.from(dialog.querySelectorAll('button')).find((node) =>
    /Save pair|Saved/.test(node.textContent),
  );
  button?.click();
});
await wait(300);
const savedLabelAfter = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const button = Array.from(dialog.querySelectorAll('button')).find((node) =>
    /Save pair|Saved/.test(node.textContent),
  );
  return button?.textContent.trim();
});
const navBadge = await page.evaluate(() => {
  const header = document.querySelector('header');
  const badge = Array.from(header.querySelectorAll('span')).find((node) =>
    /^[0-9]+$/.test(node.textContent.trim()),
  );
  return badge?.textContent.trim() ?? null;
});
console.log('save toggle:', savedLabelBefore, '->', savedLabelAfter, '| nav badge:', navBadge);

await page.keyboard.press('Escape');
await wait(450);
const afterEscape = await page.evaluate(() => ({
  dialog: Boolean(document.querySelector('[role="dialog"]')),
  bodyOverflow: getComputedStyle(document.body).overflow,
  focusLabel: document.activeElement?.getAttribute('aria-label'),
}));
console.log('after Escape:', JSON.stringify(afterEscape));

// Collection element screenshot.
const collection = await page.$('#collection');
await collection.screenshot({ path: `${OUT}/desktop-collection.png` });

/* -------------------------------- Mobile ------------------------------- */
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await wait(600);
await scrollThrough();
await metrics('mobile:');
await page.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true });

// Mobile menu.
await page.click('button[aria-label="Open menu"], button[aria-label="Menu"]').catch(async () => {
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll('header button')).find((node) =>
      node.textContent.includes('Menu'),
    );
    button?.click();
  });
});
await wait(700);
const menuOpen = await page.evaluate(() => {
  const dialog = document.querySelector('#mobile-menu');
  return {
    open: Boolean(dialog),
    modal: dialog?.getAttribute('aria-modal'),
    focusInside: dialog?.contains(document.activeElement),
    scrollLocked: getComputedStyle(document.body).overflow,
  };
});
console.log('mobile menu:', JSON.stringify(menuOpen));
await page.screenshot({ path: `${OUT}/mobile-menu.png` });
await page.keyboard.press('Escape');
await wait(500);

// Mobile quick view.
await page.evaluate(() => {
  const card = document.querySelector('#collection article button[aria-label^="Quick view"]');
  card?.click();
});
await page.waitForSelector('[role="dialog"]');
await wait(700);
await metrics('mobile quickview:');
await page.screenshot({ path: `${OUT}/mobile-quickview.png` });
const mobileDialog = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const rect = dialog.getBoundingClientRect();
  return {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    viewport: [window.innerWidth, window.innerHeight],
    focusInside: dialog.contains(document.activeElement),
    scrollableDetails: [...dialog.querySelectorAll('div')].some(
      (node) => node.scrollHeight > node.clientHeight + 2,
    ),
  };
});
console.log('mobile quick view:', JSON.stringify(mobileDialog));

await page.keyboard.press('Escape');
await wait(400);

console.log('problems:', problems.length ? problems : 'none');
await browser.close();
