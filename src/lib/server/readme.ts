import { site } from '#lib/site.ts';
import type { Readme } from '#lib/types.ts';
import { ask } from './github.ts';

// relative links only make sense on GitHub, so they get pointed back at the repo
const pin = (html: string, attr: string, base: string) =>
  html.replace(
    new RegExp(` ${attr}="(?!#)([^"]*)"`, 'g'),
    (_, path) => ` ${attr}="${new URL(path, base).href}"`
  );

// uploaded images come back signed for five minutes, so swap in the link that never expires
const uploads =
  /https:\/\/private-user-images\.githubusercontent\.com\/\d+\/\d+-([\w-]{36})\.\w+\?jwt=[\w.-]+/g;

/** GitHub's own HTML for a readme, tidied up to live on our page */
export function tidy(name: string, html: string): Readme {
  const path = html.match(/data-path="([^"]+)"/)![1];
  const url = `${site.github}/${name}/blob/HEAD/${path}`;
  const raw = `https://raw.githubusercontent.com/${site.owner}/${name}/HEAD/${path}`;

  return {
    url,
    html: pin(pin(html, 'href', url), 'src', raw)
      .replace(uploads, 'https://github.com/user-attachments/assets/$1')
      // the page has its own h1, so every heading drops down a peg
      .replace(/<(\/?)h([1-5])\b/g, (_, slash, level) => `<${slash}h${Number(level) + 1}`)
      .replace(/href="#(?!user-content-)/g, 'href="#user-content-')
      .replaceAll('<img ', '<img loading="lazy" ')
      // wide code and tables scroll, so keyboards need to be able to reach them
      .replace(/<(pre|table)\b/g, '<$1 tabindex="0"')
  };
}

export const readme = async (name: string) =>
  tidy(name, await (await ask(`${name}/readme`, 'application/vnd.github.html+json')).text());
