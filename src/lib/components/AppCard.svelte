<script lang="ts">
  import type { App } from '#lib/types.ts';
  import Star from '~icons/tabler/star-filled';
  import Shot from './Shot.svelte';

  let { app, heading = 'h3' }: { app: App; heading?: 'h2' | 'h3' } = $props();
  const [cover] = $derived(app.screenshots);
</script>

<article class="card panel">
  <div class="cover">
    {#if cover}
      <Shot shot={cover} sizes="(width < 40rem) 72vw, 24rem" />
    {/if}
  </div>
  <div class="body">
    <img class="logo" src={app.logo} alt="" width="40" height="40" />
    <svelte:element this={heading} class="title">
      <a href="/{app.category}/{app.name}">{app.title}</a>
    </svelte:element>
    {#if app.stars > 0}
      <span class="stars">
        <Star aria-hidden="true" />{app.stars}<span class="visually-hidden"> stars</span>
      </span>
    {/if}
    <p>{app.tagline}</p>
  </div>
</article>

<style>
  .card {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    overflow: clip;
    transition: box-shadow var(--settle) var(--ease);

    @media (hover: hover) {
      &:hover {
        box-shadow:
          var(--lift-shadow),
          0 0 0 1px var(--border);

        & .cover :global(img) {
          scale: var(--hover-zoom);
        }

        & a {
          text-decoration: underline;
        }
      }
    }

    &:focus-within {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
    }
  }

  .cover {
    aspect-ratio: var(--shot-ratio);
    overflow: clip;
    border-bottom: var(--separator);
    background: var(--surface-hover);

    & :global(img) {
      transition: scale var(--drift) var(--ease);
    }
  }

  .body {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-xs) var(--space-s);
    padding: var(--space-m);
  }

  .logo {
    width: var(--logo);
    height: var(--logo);
  }

  .title {
    font-size: var(--text-h3);

    & a {
      text-decoration: none;

      /* the whole card's the link, without wrapping it all in one */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      &:focus-visible {
        outline: none;
      }
    }
  }

  .stars {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);
    color: var(--text-muted);
    font-size: var(--text-small);
    font-variant-numeric: tabular-nums;

    & :global(svg) {
      width: var(--icon-small);
      color: var(--star);
    }
  }

  p {
    grid-column: 1 / -1;
    color: var(--text-muted);
    font-size: var(--text-small);
  }
</style>
