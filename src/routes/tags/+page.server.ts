import { tags } from '#lib/server/catalogue.ts';
import { list } from '#lib/site.ts';

export const load = async () => {
  const all = await tags();
  return {
    tags: all,
    crumbs: [
      { name: 'Portfolio', href: '/' },
      { name: 'Tags', href: '/tags' }
    ],
    meta: {
      title: 'Apps by tag',
      description: `Free and open source apps by tag, like ${list(all.slice(0, 4).map(({ title }) => title))}.`
    }
  };
};
