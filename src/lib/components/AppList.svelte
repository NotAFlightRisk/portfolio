<script lang="ts">
  import { absolute, tagSlug } from '#lib/site.ts';
  import type { App } from '#lib/types.ts';
  import AppLinks from './AppLinks.svelte';
  import Facts from './Facts.svelte';
  import JsonLd from './JsonLd.svelte';
  import Shot from './Shot.svelte';

  let { name, apps }: { name: string; apps: App[] } = $props();

  const list = $derived({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: apps.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.title,
      url: absolute(`/${app.category}/${app.name}`)
    }))
  });
</script>

<JsonLd data={list} />

<ol class="index">
  {#each apps as app (app.name)}
    <li class="row panel">
      <img class="logo" src={app.logo} alt="" width="56" height="56" />
      <div class="copy">
        <h2><a class="name" href="/{app.category}/{app.name}">{app.title}</a></h2>
        <p>{app.tagline}</p>
        <Facts {app} />
        <div class="actions"><AppLinks {app} /></div>
        <ul class="tags" aria-label="{app.title} tags">
          {#each app.tags as tag}
            <li><a href="/tags/{tagSlug(tag)}">#{tagSlug(tag)}</a></li>
          {/each}
        </ul>
      </div>
      <div class="thumb">
        {#if app.screenshots[0]}
          <Shot shot={app.screenshots[0]} sizes="22rem" />
        {/if}
      </div>
    </li>
  {/each}
</ol>

<style>
  .index {
    display: grid;
    gap: var(--space-m);
  }

  .row {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: var(--space-m) var(--space-l);
    padding: var(--space-m);
    transition: box-shadow var(--settle) var(--ease);

    @media (width >= 48rem) {
      grid-template-columns: auto minmax(0, 1fr) 22rem;
    }

    @media (hover: hover) {
      &:hover {
        box-shadow:
          var(--lift-shadow),
          0 0 0 1px var(--border);

        & .name {
          text-decoration: underline;
        }

        & .thumb :global(img) {
          scale: var(--hover-zoom);
        }
      }
    }

    &:has(.name:focus-visible) {
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
    justify-items: start;
    gap: var(--space-xs);

    @media (width >= 48rem) {
      align-self: center;
      gap: var(--space-s);
    }

    & h2 {
      font-size: var(--text-h3);
    }

    & p {
      color: var(--text-muted);
    }
  }

  .name {
    text-decoration: none;

    /* the whole row's the link, bar the buttons sat on top of it */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }

    &:focus-visible {
      outline: none;
    }
  }

  .actions,
  .tags {
    position: relative;
    z-index: 1;
  }

  .actions {
    margin-top: var(--space-2xs);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-s);
    font-size: var(--text-small);

    & a {
      display: inline-block;
      padding-block: var(--space-3xs);
      color: var(--text-muted);
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          color: var(--text);
          text-decoration: underline;
        }
      }
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
</style>
