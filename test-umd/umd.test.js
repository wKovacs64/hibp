import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';

describe('UMD build', () => {
  const hibpTest = `
    if (typeof window.hibp !== 'object') throw new Error();
    if (typeof window.hibp.breach !== 'function') throw new Error();
    if (typeof window.hibp.breachedAccount !== 'function') throw new Error();
    if (typeof window.hibp.breaches !== 'function') throw new Error();
    if (typeof window.hibp.dataClasses !== 'function') throw new Error();
    if (typeof window.hibp.pasteAccount !== 'function') throw new Error();
    if (typeof window.hibp.pwnedPassword !== 'function') throw new Error();
    if (typeof window.hibp.search !== 'function') throw new Error();
  `;

  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  afterAll(() => {
    browser.close();
  });

  it('should expose the hibp namespace on the window object', async () => {
    const page = await browser.newPage();
    const testUrl = `file://${path.join(__dirname, 'index.html')}`;

    await page.goto(testUrl);
    return page.evaluate(hibpTest);
  });
});
