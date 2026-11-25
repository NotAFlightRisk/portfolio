<script lang="ts">
  import { site } from '#lib/site.ts';
  import type { Category } from '#lib/types.ts';

  let { categories }: { categories: Category[] } = $props();

  // built, not served, so this is the year of the last build
  const year = new Date().getFullYear();
  const elsewhere = [
    { label: site.home.name, href: site.home.url },
    { label: 'Blog', href: site.blog },
    { label: 'Source', href: site.repo }
  ];
</script>

<footer>
  <small>
    © <a href={site.github}>{site.owner}</a>
    {year}
  </small>

  <nav aria-label="Categories">
    <ul>
      {#each categories as { slug, nav } (slug)}
        <li><a href="/{slug}">{nav}</a></li>
      {/each}
      <li><a href="/api">API</a></li>
    </ul>
  </nav>

  <ul>
    {#each elsewhere as { label, href } (href)}
      <li><a {href}>{label}</a></li>
    {/each}
  </ul>
</footer>

<style>
  footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs) var(--gutter);
    margin-top: var(--space-2xl);
    padding: var(--space-s) var(--space-m);
    background: var(--surface);
    font-size: var(--text-small);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-xs) var(--space-m);
  }

  a {
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  small {
    color: var(--text-muted);
    font-size: inherit;
  }

  @media (width >= 64rem) {
    footer {
      justify-content: space-between;
    }

    /* matching flanks, so the middle links land dead centre */
    small,
    footer > ul {
      flex: 1;
      min-width: fit-content;
    }

    footer > ul {
      justify-content: end;
    }

    nav li + li {
      padding-left: var(--space-m);
      border-left: var(--separator);
    }
  }
</style>
