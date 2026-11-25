<script lang="ts">
  import type { Readme } from '#lib/types.ts';
  import Book from '~icons/tabler/book';

  let { readme }: { readme: Readme } = $props();
</script>

<section class="readme panel" aria-label="Readme">
  <a class="source" href={readme.url}>
    <Book aria-hidden="true" />{readme.url.split('/').pop()}
  </a>
  <div class="body">{@html readme.html}</div>
</section>

<style>
  .readme {
    overflow: clip;
  }

  .source {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-height: var(--target);
    padding-inline: var(--space-l);
    border-bottom: var(--separator);
    color: var(--text-muted);
    font-size: var(--text-small);
    text-decoration: none;

    & :global(svg) {
      width: var(--icon-small);
      height: var(--icon-small);
    }

    @media (hover: hover) {
      &:hover {
        color: var(--text);
        text-decoration: underline;
      }
    }
  }

  /* GitHub's HTML in here, so none of it has our scoped classes */
  .body :global {
    article {
      max-width: var(--measure);
      padding: var(--space-l);
    }

    article > :first-child {
      margin-top: 0;
    }

    :is(article, blockquote, .markdown-alert) > :last-child {
      margin-bottom: 0;
    }

    :is(p, pre, table, ul, ol, blockquote, details, hr, .markdown-alert, .highlight) {
      margin: 0 0 var(--space-m);
    }

    :is(ul, ol) {
      padding-left: var(--space-l);
      list-style: revert;
    }

    li :is(ul, ol) {
      margin: 0;
    }

    .markdown-heading {
      position: relative;
      margin: var(--space-xl) 0 var(--space-s);
    }

    h2 {
      padding-bottom: var(--space-xs);
      border-bottom: var(--separator);
      font-size: var(--text-h2);
    }

    :is(h3, h4, h5, h6) {
      margin: 0;
      font-size: var(--text-h3);
    }

    /* the little chain link turns up in the gap left of a heading */
    .anchor {
      position: absolute;
      inset: 0 100% 0 auto;
      display: flex;
      align-items: center;
      padding-right: var(--space-2xs);
      color: var(--text-muted);
      opacity: 0;
    }

    .markdown-heading:hover .anchor,
    .anchor:focus-visible {
      opacity: 1;
    }

    .octicon {
      fill: currentColor;
    }

    a {
      color: var(--link);
    }

    img {
      display: inline;
      max-width: 100%;
    }

    code {
      padding: var(--space-3xs) var(--space-2xs);
      border-radius: var(--radius);
      background: var(--code-bg);
      font-size: 0.9em;
    }

    pre {
      overflow: auto;
      padding: var(--space-m);
      border-radius: var(--radius);
      background: var(--code-bg);
      font-size: var(--text-small);

      & code {
        padding: 0;
        background: none;
        font-size: inherit;
      }
    }

    table {
      display: block;
      overflow: auto;
      border-collapse: collapse;
      font-size: var(--text-small);
    }

    :is(th, td) {
      padding: var(--space-2xs) var(--space-xs);
      border: var(--separator);
    }

    :is(blockquote, .markdown-alert) {
      padding-left: var(--space-m);
      border-left: var(--quote-border);
      color: var(--text-muted);
    }

    hr {
      border: 0;
      border-top: var(--separator);
    }

    summary {
      cursor: pointer;
    }

    .pl-k {
      color: var(--code-keyword);
    }

    .pl-c {
      color: var(--text-muted);
    }

    :is(.pl-s, .pl-pds) {
      color: var(--code-string);
    }

    :is(.pl-c1, .pl-smi, .pl-v) {
      color: var(--code-constant);
    }

    .pl-en {
      color: var(--code-entity);
    }
  }
</style>
