export type Theme = 'light' | 'dark';

/** Paths without the `-<width>.webp` end, so each one has a small and a large copy */
export type Screenshot = { alt: string; light: string; dark: string; url?: string };

export type Category = {
  slug: string;
  title: string;
  nav: string;
  icon: string;
  schema: string;
  description: string;
};

export type Stats = {
  stars: number;
  language?: string;
  licence?: string;
  topics: string[];
  created?: string;
  updated?: string;
};

export type App = Stats & {
  name: string;
  title: string;
  category: string;
  tagline: string;
  about: string;
  features: string[];
  tags: string[];
  featured: boolean;
  order?: number;
  site?: string;
  install?: string;
  repo: string;
  logo: string;
  screenshots: Screenshot[];
};

export type Readme = { url: string; html: string };

export type Crumb = { name: string; href: string };

export type Meta = {
  title: string;
  description: string;
  image?: { src: string; alt: string; width: number; height: number };
  noindex?: boolean;
};
