import { error } from '@sveltejs/kit';
import { apps, category } from '#lib/server/catalogue.ts';
import { readme } from '#lib/server/readme.ts';
import { shotSizes } from '#lib/site.ts';

export const entries = async () =>
  (await apps()).map(({ category, name }) => ({ category, app: name }));

export const load = async ({ params }) => {
  const all = await apps();
  const app = all.find(({ name, category }) => name === params.app && category === params.category);
  if (!app) error(404, 'No such app');

  const section = category(app.category)!;
  const siblings = all.filter((other) => other.category === app.category);
  const at = siblings.indexOf(app);
  const where = app.site ? `, live at ${new URL(app.site).host}` : '';

  return {
    app,
    category: section,
    readme: await readme(app.name),
    // the next ones first, so they all get a look-in
    more: [...siblings.slice(at + 1), ...siblings.slice(0, at)],
    crumbs: [
      { name: 'Portfolio', href: '/' },
      { name: section.title, href: `/${section.slug}` },
      { name: app.title, href: `/${section.slug}/${app.name}` }
    ],
    meta: {
      title: `${app.title}: ${app.tagline}`,
      description: `${app.tagline}. Free and open source${where}, with the code on GitHub.`,
      image: app.screenshots[0] && {
        src: `${app.screenshots[0].light}-${shotSizes.large}.webp`,
        alt: app.screenshots[0].alt,
        width: shotSizes.large,
        height: shotSizes.large * shotSizes.ratio
      }
    }
  };
};
