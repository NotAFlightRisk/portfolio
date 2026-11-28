export const site = {
  name: 'Peng.ly Portfolio',
  section: 'Portfolio',
  url: 'https://portfolio.peng.ly',
  owner: 'NotAFlightRisk',
  author: { name: 'Iain', url: 'https://peng.ly/about' },
  home: { name: 'Peng.ly', url: 'https://peng.ly' },
  blog: 'https://blog.peng.ly',
  github: 'https://github.com/NotAFlightRisk',
  mastodon: 'https://mastodon.social/@NotAFlightRisk',
  bluesky: 'https://bsky.app/profile/peng.ly',
  fediverse: '@NotAFlightRisk@mastodon.social',
  repo: 'https://github.com/NotAFlightRisk/portfolio',
  description:
    'Free and open source apps that make hidden information easier to find, explore and understand',
  color: '#febc20'
};

export const absolute = (path: string) => new URL(path, site.url).href;

export const tagSlug = (tag: string) => tag.toLowerCase().replaceAll(' ', '-');

export const list = (items: string[]) => new Intl.ListFormat('en-GB').format(items);

export const shotSizes = { small: 800, large: 1600, ratio: 10 / 16 };

export const srcset = (path: string) =>
  `${path}-${shotSizes.small}.webp ${shotSizes.small}w, ${path}-${shotSizes.large}.webp ${shotSizes.large}w`;
