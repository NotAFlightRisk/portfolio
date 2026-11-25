import { apiApp } from '#lib/server/api.ts';
import { apps } from '#lib/server/catalogue.ts';

export const load = async () => {
  const [example] = await apps();
  return {
    example: {
      ...apiApp(example),
      about: '...',
      features: ['...'],
      screenshots: [apiApp(example).screenshots[0]]
    },
    crumbs: [
      { name: 'Portfolio', href: '/' },
      { name: 'API', href: '/api' }
    ],
    meta: {
      title: 'API',
      description:
        'Every app in the portfolio as JSON, free to use from anywhere: names, links, star counts, screenshots and categories.'
    }
  };
};
