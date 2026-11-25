import { categories } from '#lib/server/catalogue.ts';

export const prerender = true;

export const load = () => ({ categories });
