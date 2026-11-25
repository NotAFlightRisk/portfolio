import { absolute } from '#lib/site.ts';

export const prerender = true;

export const GET = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`, {
    headers: { 'content-type': 'text/plain' }
  });
