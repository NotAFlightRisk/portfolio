import { describe, expect, it } from 'vitest';
import { tidy } from '#lib/server/readme.ts';

const wrap = (body: string) =>
  `<div id="readme" class="md" data-path=".github/README.md"><article>${body}</article></div>`;
const { url, html } = tidy(
  'thing',
  wrap(
    [
      '<h1 align="center">thing</h1>',
      '<a id="user-content-setup" class="anchor" href="#setup">#</a><h2>Setup</h2>',
      '<a href="../LICENSE">MIT</a> <a href="https://example.com/">site</a>',
      '<a href="#user-content-fn-1">1</a>',
      '<img src="./shot.png" alt="">',
      '<img src="https://private-user-images.githubusercontent.com/1/2-7d80a3d7-b9fa-4951-8791-0f20f94a44f9.png?jwt=ab.cd-ef_gh" alt="">'
    ].join('')
  )
);

describe('tidying a readme', () => {
  it('links back to the file on GitHub', () => {
    expect(url).toBe('https://github.com/NotAFlightRisk/thing/blob/HEAD/.github/README.md');
  });

  it('points relative links at the repo and relative images at the raw file', () => {
    expect(html).toContain('href="https://github.com/NotAFlightRisk/thing/blob/HEAD/LICENSE"');
    expect(html).toContain(
      'src="https://raw.githubusercontent.com/NotAFlightRisk/thing/HEAD/.github/shot.png"'
    );
    expect(html).toContain('href="https://example.com/"');
  });

  it('swaps an uploaded image for the link that never expires', () => {
    expect(html).toContain(
      'src="https://github.com/user-attachments/assets/7d80a3d7-b9fa-4951-8791-0f20f94a44f9"'
    );
    expect(html).not.toContain('jwt=');
  });

  it('drops every heading a level, so the page keeps its only h1', () => {
    expect(html).toContain('<h2 align="center">thing</h2>');
    expect(html).toContain('<h3>Setup</h3>');
    expect(html).not.toContain('<h1');
  });

  it('sends in-page links to the ids GitHub gave the headings', () => {
    expect(html).toContain('href="#user-content-setup"');
    expect(html).toContain('href="#user-content-fn-1"');
  });

  it('lazy loads every image', () => {
    expect(html.match(/<img loading="lazy" /g)).toHaveLength(2);
  });
});
