import { apps, categories, shelf } from '#lib/server/catalogue.ts';
import { site } from '#lib/site.ts';
import type { App } from '#lib/types.ts';

// no order means the back of the queue, still most starred first
const place = (app: App) => app.order ?? Infinity;

export const load = async () => {
  const all = await apps();
  return {
    all,
    featured: all.filter((app) => app.featured).sort((a, b) => place(a) - place(b)),
    shelves: categories.map((category) => ({ ...category, apps: shelf(category, all) })),
    meta: {
      title: 'Peng.ly Portfolio - free and open source apps',
      description: `${site.description}. Try them out, or grab the code on GitHub.`
    }
  };
};
