<script lang="ts">
  import CategoryIcon from '#lib/components/CategoryIcon.svelte';
  import JsonLd from '#lib/components/JsonLd.svelte';
  import Shot from '#lib/components/Shot.svelte';
  import { absolute } from '#lib/site.ts';
  import Star from '~icons/tabler/star-filled';

  let { data } = $props();

  const list = $derived({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.category.title,
    itemListElement: data.apps.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.title,
      url: absolute(`/${app.category}/${app.name}`)
    }))
  });
</script>

<JsonLd data={list} />

<header class="intro">
  <span class="icon"><CategoryIcon name={data.category.icon} /></span>
  <h1>{data.category.title}</h1>
  <p>{data.category.description}.</p>
</header>

<ol class="index">
  {#each data.apps as app (app.name)}
    <li class="row panel">
      <img class="logo" src={app.logo} alt="" width="56" height="56" />
      <div class="copy">
        <h2><a href="/{app.category}/{app.name}">{app.title}</a></h2>
        <p>{app.tagline}</p>
        <p class="meta">
          {#if app.stars > 0}
            <span class="stars"><Star aria-hidden="true" />{app.stars} stars</span>
          {/if}
          {#if app.language}<span>{app.language}</span>{/if}
          {#if app.site}<span>{new URL(app.site).host}</span>{:else}<span>Self-hosted</span>{/if}
        </p>
      </div>
      <div class="thumb">
        {#if app.screenshots[0]}
          <Shot shot={app.screenshots[0]} sizes="16rem" />
        {/if}
      </div>
    </li>
  {/each}
</ol>

<nav class="others" aria-label="Other categories">
  <h2>Other categories</h2>
  <ul>
    {#each data.others as other (other.slug)}
      <li>
        <a class="button raised" href="/{other.slug}">
          <CategoryIcon name={other.icon} />
          {other.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .intro {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--space-m);

    & h1 {
      font-size: var(--text-title);
    }

    & p {
      grid-column: 1 / -1;
      max-width: var(--measure);
      color: var(--text-muted);
      font-size: var(--text-large);
    }
  }

  .icon {
    display: grid;
    place-items: center;
    width: var(--logo-large);
    height: var(--logo-large);
    border-radius: var(--radius);
    background: var(--accent);
    color: var(--on-accent);

    & :global(svg) {
      width: 60%;
      height: 60%;
    }
  }

  .index {
    display: grid;
    gap: var(--space-m);
  }

  .row {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: var(--space-m) var(--space-l);
    padding: var(--space-m);
    transition: box-shadow var(--settle) var(--ease);

    @media (width >= 48rem) {
      grid-template-columns: auto minmax(0, 1fr) 16rem;
    }

    @media (hover: hover) {
      &:hover {
        box-shadow:
          var(--lift-shadow),
          0 0 0 1px var(--border);

        & h2 a {
          text-decoration: underline;
        }

        & .thumb :global(img) {
          scale: var(--hover-zoom);
        }
      }
    }

    &:focus-within {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
    }
  }

  .logo {
    width: 3.5rem;
    height: 3.5rem;
  }

  .copy {
    display: grid;
    gap: var(--space-2xs);

    & h2 {
      font-size: var(--text-h3);
    }

    & a {
      text-decoration: none;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      &:focus-visible {
        outline: none;
      }
    }

    & p {
      color: var(--text-muted);
    }
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs) var(--space-m);
    font-size: var(--text-small);
  }

  .stars {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);

    & :global(svg) {
      width: var(--icon-small);
      color: var(--star);
    }
  }

  .thumb {
    display: none;
    aspect-ratio: var(--shot-ratio);
    overflow: clip;
    border-radius: var(--radius);
    box-shadow: 0 0 0 1px var(--border);

    @media (width >= 48rem) {
      display: block;
    }

    & :global(img) {
      transition: scale var(--drift) var(--ease);
    }
  }

  .others {
    display: grid;
    gap: var(--space-m);

    & h2 {
      font-size: var(--text-h3);
    }

    & ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }
  }
</style>
