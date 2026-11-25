import { apps, categories } from '#lib/server/catalogue.ts';

export const load = async () => {
  const all = await apps();
  return {
    all,
    featured: all.filter((app) => app.featured),
    shelves: categories.map((category) => ({
      ...category,
      apps: all.filter((app) => app.category === category.slug)
    })),
    meta: {
      title: "Peng.ly Portfolio - every app I've built",
      description: `${all.length} free, open source apps, like VPN comparisons, live Tube maps, self-hosted monitors and little browser tools. Try them out, or grab the code on GitHub.`
    }
  };
};
