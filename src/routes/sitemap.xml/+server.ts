import { appUrl } from '#lib/server/api.ts';
import { apps, categories, tags } from '#lib/server/catalogue.ts';
import { absolute } from '#lib/site.ts';

export const prerender = true;

export const GET = async () => {
  const all = await apps();
  const newest = all
    .map(({ updated }) => updated ?? '')
    .sort()
    .at(-1);
  const pages = [
    { loc: absolute('/'), lastmod: newest },
    ...categories.map(({ slug }) => ({ loc: absolute(`/${slug}`), lastmod: newest })),
    ...all.map((app) => ({ loc: appUrl(app), lastmod: app.updated })),
    { loc: absolute('/tags'), lastmod: newest },
    ...(await tags()).map(({ slug }) => ({ loc: absolute(`/tags/${slug}`), lastmod: newest })),
    { loc: absolute('/api'), lastmod: undefined }
  ];
  const urls = pages
    .map(
      ({ loc, lastmod }) =>
        `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''}</url>`
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'content-type': 'application/xml' } }
  );
};
