import { json } from '@sveltejs/kit';
import { apiApp } from '#lib/server/api.ts';
import { apps } from '#lib/server/catalogue.ts';

export const prerender = true;

export const GET = async () => {
  const all = await apps();
  return json({ count: all.length, apps: all.map(apiApp) });
};
