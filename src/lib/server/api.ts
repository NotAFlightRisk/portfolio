import { absolute, shotSizes } from '#lib/site.ts';
import type { App, Category } from '#lib/types.ts';
import { categories } from './catalogue.ts';

const sizes = (path: string) => ({
  small: absolute(`${path}-${shotSizes.small}.webp`),
  large: absolute(`${path}-${shotSizes.large}.webp`)
});

export const appUrl = (app: Pick<App, 'category' | 'name'>) =>
  absolute(`/${app.category}/${app.name}`);

/** An app as the API hands it out, with every link made absolute */
export function apiApp(app: App) {
  const { slug, title } = categories.find((category) => category.slug === app.category)!;
  return {
    name: app.name,
    title: app.title,
    tagline: app.tagline,
    about: app.about,
    features: app.features,
    tags: app.tags,
    category: { slug, title },
    featured: app.featured,
    url: appUrl(app),
    site: app.site ?? null,
    repo: app.repo,
    install: app.install ?? null,
    logo: absolute(app.logo),
    stars: app.stars,
    language: app.language ?? null,
    licence: app.licence ?? null,
    topics: app.topics,
    created: app.created ?? null,
    updated: app.updated ?? null,
    screenshots: app.screenshots.map(({ alt, light, dark }) => ({
      alt,
      width: shotSizes.large,
      height: shotSizes.large * shotSizes.ratio,
      light: sizes(light),
      dark: sizes(dark)
    }))
  };
}

export const apiCategory = (category: Category, apps: App[]) => ({
  slug: category.slug,
  title: category.title,
  description: category.description,
  url: absolute(`/${category.slug}`),
  apps: apps.filter((app) => app.category === category.slug).map(({ name }) => name)
});
