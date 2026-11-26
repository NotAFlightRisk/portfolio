import { error, json } from '@sveltejs/kit';
import { apiApp } from '#lib/server/api.ts';
import { tagged, tags } from '#lib/server/catalogue.ts';

export const prerender = true;

export const entries = async () => (await tags()).map(({ slug }) => ({ tag: slug }));

export const GET = async ({ params }) => {
  const tag = (await tags()).find(({ slug }) => slug === params.tag);
  if (!tag) error(404, 'No such tag');
  const apps = await tagged(tag.slug);
  return json({
    tag: { slug: tag.slug, title: tag.title },
    count: apps.length,
    apps: apps.map(apiApp)
  });
};
