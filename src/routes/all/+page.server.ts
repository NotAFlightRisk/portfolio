import { apps } from '#lib/server/catalogue.ts';

export const load = async () => {
  const all = await apps();
  return {
    apps: all,
    crumbs: [
      { name: 'Portfolio', href: '/' },
      { name: 'All apps', href: '/all' }
    ],
    meta: {
      title: 'All apps',
      description: `All ${all.length} of my free, open source apps in one list, with screenshots and the code on GitHub.`
    }
  };
};
