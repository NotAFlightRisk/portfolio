export const site = {
  name: 'Peng.ly Portfolio',
  section: 'Portfolio',
  url: 'https://portfolio.peng.ly',
  owner: 'NotAFlightRisk',
  author: { name: 'Iain', url: 'https://peng.ly/about' },
  home: { name: 'Peng.ly', url: 'https://peng.ly' },
  blog: 'https://blog.peng.ly',
  github: 'https://github.com/NotAFlightRisk',
  repo: 'https://github.com/NotAFlightRisk/portfolio',
  description:
    "Every app I've built, free and open source, with screenshots, live links and the code on GitHub",
  color: '#febc20'
};

export const absolute = (path: string) => new URL(path, site.url).href;

export const shotSizes = { small: 800, large: 1600, ratio: 10 / 16 };

export const srcset = (path: string) =>
  `${path}-${shotSizes.small}.webp ${shotSizes.small}w, ${path}-${shotSizes.large}.webp ${shotSizes.large}w`;
