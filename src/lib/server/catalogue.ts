import { existsSync } from 'node:fs';
import { parse } from 'yaml';
import categoryList from '../../../data/categories.yml?raw';
import { shotSizes, site } from '#lib/site.ts';
import type { App, Category, Screenshot } from '#lib/types.ts';
import { stats } from './github.ts';

type Entry = Pick<
  App,
  'title' | 'category' | 'tagline' | 'about' | 'features' | 'site' | 'install'
> & {
  featured?: boolean;
  screenshots?: { alt: string }[];
};

const files = import.meta.glob<string>('/data/apps/*.yml', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const categories: Category[] = parse(categoryList);

const onDisk = (path: string) => existsSync(`static${path}-${shotSizes.large}.webp`);

function screenshots(name: string, shots: { alt: string }[] = []): Screenshot[] {
  return shots.flatMap(({ alt }, i) => {
    const [light, dark] = ['light', 'dark'].map(
      (theme) => `/screenshots/${name}/${i + 1}-${theme}`
    );
    // one look only means the light copy does for both
    return onDisk(light) ? [{ alt, light, dark: onDisk(dark) ? dark : light }] : [];
  });
}

async function load(file: string, source: string): Promise<App> {
  const name = file.match(/([^/]+)\.yml$/)![1];
  const entry: Entry = parse(source);
  return {
    ...entry,
    ...(await stats(name)),
    name,
    featured: entry.featured ?? false,
    repo: `${site.github}/${name}`,
    logo: `/logos/${name}.svg`,
    screenshots: screenshots(name, entry.screenshots)
  };
}

let everything: Promise<App[]> | undefined;

/** Every app, most starred first */
export function apps() {
  everything ??= Promise.all(
    Object.entries(files).map(([file, source]) => load(file, source))
  ).then((list) => list.sort((a, b) => b.stars - a.stars || a.title.localeCompare(b.title)));
  return everything;
}

export async function inCategory(slug: string) {
  return (await apps()).filter((app) => app.category === slug);
}

export const category = (slug: string) => categories.find((category) => category.slug === slug);
