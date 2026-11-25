<script lang="ts">
  import type { App } from '#lib/types.ts';
  import GitHub from '~icons/tabler/brand-github';
  import Star from '~icons/tabler/star-filled';
  import Open from '~icons/tabler/external-link';

  let { app }: { app: Pick<App, 'title' | 'site' | 'repo' | 'stars'> } = $props();
</script>

<div class="links">
  {#if app.site}
    <a class="button primary" href={app.site}>
      <Open aria-hidden="true" />
      Open {app.title}
    </a>
  {/if}
  <a class="button raised" href={app.repo}>
    <GitHub aria-hidden="true" />
    Star on GitHub
    {#if app.stars > 0}
      <span class="stars">
        <Star aria-hidden="true" />
        {app.stars}<span class="visually-hidden"> stars so far</span>
      </span>
    {/if}
  </a>
</div>

<style>
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .stars {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);
    margin-left: var(--space-2xs);
    padding-left: var(--space-xs);
    border-left: var(--separator);
    font-variant-numeric: tabular-nums;

    & :global(svg) {
      width: var(--icon-small);
      color: var(--star);
    }
  }

  /* the star goes dark with the rest once the button's gone yellow */
  @media (hover: hover) {
    .raised:hover .stars {
      border-color: currentColor;

      & :global(svg) {
        color: inherit;
      }
    }
  }
</style>
