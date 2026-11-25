import { error } from '@sveltejs/kit';
import { categories, category, inCategory } from '#lib/server/catalogue.ts';

export const entries = () => categories.map(({ slug }) => ({ category: slug }));

export const load = async ({ params }) => {
  const found = category(params.category);
  if (!found) error(404, 'No such category');
  const apps = await inCategory(found.slug);
  return {
    category: found,
    apps,
    others: categories.filter(({ slug }) => slug !== found.slug),
    crumbs: [
      { name: 'Portfolio', href: '/' },
      { name: found.title, href: `/${found.slug}` }
    ],
    meta: {
      title: `${found.title} apps`,
      description: `${found.description}. ${apps.length} free, open source apps, with screenshots and the code on GitHub.`
    }
  };
};
