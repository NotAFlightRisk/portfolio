import { error, json } from '@sveltejs/kit';
import { apiApp } from '#lib/server/api.ts';
import { apps } from '#lib/server/catalogue.ts';

export const prerender = true;

export const entries = async () => (await apps()).map(({ name }) => ({ name }));

export const GET = async ({ params }) => {
  const app = (await apps()).find(({ name }) => name === params.name);
  if (!app) error(404, 'No such app');
  return json(apiApp(app));
};
