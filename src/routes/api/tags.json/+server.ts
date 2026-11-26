import { json } from '@sveltejs/kit';
import { apiTag } from '#lib/server/api.ts';
import { tagged, tags } from '#lib/server/catalogue.ts';

export const prerender = true;

export const GET = async () => {
  const all = await tags();
  return json({
    tags: await Promise.all(all.map(async (tag) => apiTag(tag, await tagged(tag.slug))))
  });
};
