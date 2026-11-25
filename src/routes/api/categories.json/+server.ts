import { json } from '@sveltejs/kit';
import { apiCategory } from '#lib/server/api.ts';
import { apps, categories } from '#lib/server/catalogue.ts';

export const prerender = true;

export const GET = async () => {
  const all = await apps();
  return json({ categories: categories.map((category) => apiCategory(category, all)) });
};
