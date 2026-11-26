import { appUrl } from '#lib/server/api.ts';
import { apps, categories, shelf } from '#lib/server/catalogue.ts';
import { absolute, site } from '#lib/site.ts';

export const prerender = true;

export const GET = async () => {
  const all = await apps();
  const sections = categories.map((category) => {
    const lines = shelf(category, all).map(
      (app) => `- [${app.title}](${appUrl(app)}): ${app.tagline}`
    );
    return `## ${category.title}\n\n${category.description}.\n\n${lines.join('\n')}`;
  });
  const body = [
    `# ${site.name}`,
    `> ${site.description}. The same list as JSON is at ${absolute('/api/apps.json')}.`,
    ...sections
  ].join('\n\n');
  return new Response(`${body}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
