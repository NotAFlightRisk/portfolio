import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { tagSlug } from '#lib/site.ts';

const read = (path: string) => parse(readFileSync(path, 'utf8'));
const categories: { slug: string; apps?: string[] }[] = read('data/categories.yml');
const slugs = categories.map(({ slug }) => slug);
const names = readdirSync('data/apps').map((file) => file.replace(/\.yml$/, ''));
const apps = names.map((name) => ({ name, ...read(`data/apps/${name}.yml`) }));

describe.each(apps)('$name', (app) => {
  it('has the words every page needs', () => {
    for (const key of ['title', 'tagline', 'about']) expect(app[key], key).toBeTypeOf('string');
    expect(app.features.length).toBeGreaterThan(0);
  });

  it('has tags that make tidy links', () => {
    expect(app.tags.length).toBeGreaterThan(0);
    for (const tag of app.tags) expect(tag).toMatch(/^[A-Za-z0-9][A-Za-z0-9 -]*$/);
  });

  it('sits in a category that exists', () => {
    expect(slugs).toContain(app.category);
  });

  it('has a logo of its own', () => {
    expect(existsSync(`static/logos/${app.name}.svg`)).toBe(true);
  });

  it('has a live address that is a proper URL', () => {
    if (app.site) expect(new URL(app.site).protocol).toBe('https:');
  });

  it('has its screenshots on disk, each with a description', () => {
    expect(app.screenshots?.length).toBeGreaterThan(0);
    app.screenshots.forEach(({ alt }: { alt: string }, i: number) => {
      expect(alt).toBeTypeOf('string');
      const has = (theme: string) =>
        [800, 1600].map((width) =>
          existsSync(`static/screenshots/${app.name}/${i + 1}-${theme}-${width}.webp`)
        );
      expect(has('light')).toEqual([true, true]);
      // a dark copy is optional, but never half of one
      expect(new Set(has('dark')).size).toBe(1);
    });
  });
});

it('gives every category at least one app', () => {
  for (const slug of slugs)
    expect(
      apps.some((app) => app.category === slug),
      slug
    ).toBe(true);
});

it('never gives a tag a page all to itself', () => {
  const tags: string[] = apps.flatMap((app) => app.tags);
  for (const tag of new Set(tags)) {
    expect(tags.filter((other) => other === tag).length, tag).toBeGreaterThan(1);
  }
});

it('gives each ordered app a place of its own', () => {
  const places = apps.flatMap((app) => app.order ?? []);
  for (const place of places) expect(Number.isInteger(place) && place > 0, `${place}`).toBe(true);
  expect(new Set(places).size).toBe(places.length);
});

it('only orders apps that are in that category, once each', () => {
  for (const { slug, apps: order = [] } of categories) {
    const inside = apps.filter((app) => app.category === slug).map(({ name }) => name);
    for (const name of order) expect(inside, slug).toContain(name);
    expect(new Set(order).size, slug).toBe(order.length);
  }
});

it('spells each tag the same way everywhere', () => {
  const labels = new Set<string>(apps.flatMap((app) => app.tags));
  expect(new Set([...labels].map(tagSlug)).size).toBe(labels.size);
});

it('has a share card for the pages without a screenshot of their own', () => {
  expect(existsSync('static/og.png')).toBe(true);
});

it('never names two apps the same', () => {
  const titles = apps.map(({ title }) => title.toLowerCase());
  expect(new Set(titles).size).toBe(titles.length);
});
