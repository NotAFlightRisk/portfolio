import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { chromium, type Page } from 'playwright-core';
import sharp from 'sharp';
import { parse } from 'yaml';

// npm run screenshots [app ...], with CHROMIUM_PATH set if Playwright can't find one itself

type Shot = {
  alt: string;
  path?: string;
  url?: string;
  click?: string | string[];
  hide?: string[];
  scroll?: string;
  wait?: number;
  idle?: boolean;
};

type Theme = 'light' | 'dark';

const viewport = { width: 1280, height: 800 };
const widths = [800, 1600];
const themes: Theme[] = ['light', 'dark'];
const appsDir = 'data/apps';

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });

async function settle(page: Page, shot: Shot) {
  for (const selector of [shot.click ?? []].flat()) await page.click(selector);
  if (shot.scroll) await page.locator(shot.scroll).first().scrollIntoViewIfNeeded();
  if (shot.hide) {
    await page.addStyleTag({ content: `${shot.hide.join()} { visibility: hidden !important }` });
  }
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(shot.wait ?? 1500);
}

async function capture(url: URL, colorScheme: Theme, shot: Shot) {
  const context = await browser.newContext({
    viewport,
    colorScheme,
    deviceScaleFactor: 2,
    bypassCSP: true
  });
  const page = await context.newPage();
  await page.goto(url.href, { waitUntil: shot.idle === false ? 'load' : 'networkidle' });
  await settle(page, shot);
  const png = await page.screenshot();
  await context.close();
  return png;
}

// a site with one look gives the same picture either way, so it only needs keeping once
async function alike(a: Buffer, b: Buffer) {
  const tiny = (png: Buffer) => sharp(png).resize(64, 40).greyscale().raw().toBuffer();
  const [x, y] = await Promise.all([tiny(a), tiny(b)]);
  const drift = x.reduce((sum, value, i) => sum + Math.abs(value - y[i]), 0) / x.length;
  return drift < 3;
}

async function save(png: Buffer, dir: string, name: string) {
  await Promise.all(
    widths.map((width) =>
      sharp(png).resize({ width }).webp({ quality: 78 }).toFile(`${dir}/${name}-${width}.webp`)
    )
  );
}

async function shoot(app: string) {
  const { site, screenshots = [] }: { site?: string; screenshots?: Shot[] } = parse(
    await readFile(`${appsDir}/${app}.yml`, 'utf8')
  );
  const dir = `static/screenshots/${app}`;
  await mkdir(dir, { recursive: true });

  for (const [i, shot] of screenshots.entries()) {
    const base = shot.url ?? site;
    // no address means it was taken by hand, so it's left as it is
    if (!base) continue;
    const url = new URL(shot.path ?? '', base);
    const [light, dark] = await Promise.all(themes.map((theme) => capture(url, theme, shot)));
    await save(light, dir, `${i + 1}-light`);
    if (await alike(light, dark)) {
      await Promise.all(
        widths.map((width) => rm(`${dir}/${i + 1}-dark-${width}.webp`, { force: true }))
      );
    } else {
      await save(dark, dir, `${i + 1}-dark`);
    }
    console.log(`📸 ${app} ${i + 1} ${url.href}`);
  }

  const stale = (await readdir(dir)).filter((file) => parseInt(file) > screenshots.length);
  await Promise.all(stale.map((file) => rm(`${dir}/${file}`)));
}

const picked = process.argv.slice(2);
const apps = picked.length
  ? picked
  : (await readdir(appsDir)).map((file) => file.replace(/\.yml$/, ''));

for (const app of apps) {
  await shoot(app).catch((error) => {
    process.exitCode = 1;
    console.error(`❌ ${app}: ${error.message}`);
  });
}
await browser.close();
