import { error } from '@sveltejs/kit';
import { tagged, tags } from '#lib/server/catalogue.ts';
import { list } from '#lib/site.ts';

export const entries = async () => (await tags()).map(({ slug }) => ({ tag: slug }));

export const load = async ({ params }) => {
  const all = await tags();
  const tag = all.find(({ slug }) => slug === params.tag);
  if (!tag) error(404, 'No such tag');
  const apps = await tagged(tag.slug);
  return {
    tag,
    apps,
    others: all.filter(({ slug }) => slug !== tag.slug),
    crumbs: [
      { name: 'Portfolio', href: '/' },
      { name: 'Tags', href: '/tags' },
      { name: tag.title, href: `/tags/${tag.slug}` }
    ],
    meta: {
      title: `${tag.title}: free and open source apps`,
      description: `Free and open source apps tagged ${tag.title}: ${list(apps.map(({ title }) => title))}.`
    }
  };
};
