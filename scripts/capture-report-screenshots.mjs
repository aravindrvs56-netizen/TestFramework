import { chromium } from '@playwright/test';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const screenshotsDir = resolve(root, 'screenshots');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const startStaticServer = (directory) =>
  new Promise((resolvePromise) => {
    const server = createServer((request, response) => {
      const requestPath = request.url === '/' ? '/index.html' : request.url.split('?')[0];
      const filePath = join(directory, requestPath);

      if (!filePath.startsWith(directory) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream' });
      createReadStream(filePath).pipe(response);
    });

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolvePromise({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise((closeResolve) => server.close(closeResolve)),
      });
    });
  });

await mkdir(screenshotsDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const allureServer = await startStaticServer(resolve(root, 'allure-report'));
await page.goto(`${allureServer.url}/index.html`);
await page.waitForTimeout(2500);
await page.screenshot({
  path: resolve(screenshotsDir, 'allure-report-overview.png'),
  fullPage: true,
});
await allureServer.close();

const playwrightServer = await startStaticServer(resolve(root, 'playwright-report'));
await page.goto(`${playwrightServer.url}/index.html`);
await page.waitForTimeout(1500);
await page.screenshot({
  path: resolve(screenshotsDir, 'playwright-report-overview.png'),
  fullPage: true,
});
await playwrightServer.close();

await browser.close();
