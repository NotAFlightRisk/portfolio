import { apps, categories } from '#lib/server/catalogue.ts';
import { site } from '#lib/site.ts';

export const load = async () => {
  const all = await apps();
  return {
    all,
    featured: all.filter((app) => app.featured),
    shelves: categories.map((category) => ({
      ...category,
      apps: all.filter((app) => app.category === category.slug)
    })),
    meta: {
      title: 'Peng.ly Portfolio - free and open source apps',
      description: `${site.description}. Try them out, or grab the code on GitHub.`
    }
  };
};
