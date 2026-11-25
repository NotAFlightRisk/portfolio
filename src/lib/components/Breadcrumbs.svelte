<script lang="ts">
  import type { Crumb } from '#lib/types.ts';
  import Chevron from '~icons/tabler/chevron-right';

  let { crumbs }: { crumbs: Crumb[] } = $props();
</script>

<nav aria-label="Breadcrumb">
  <ol>
    {#each crumbs as { name, href }, i (href)}
      <li>
        {#if i < crumbs.length - 1}
          <a {href}>{name}</a>
          <Chevron aria-hidden="true" />
        {:else}
          <span aria-current="page">{name}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  ol {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs);
    color: var(--text-muted);
    font-size: var(--text-small);
  }

  li {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);

    & :global(svg) {
      width: var(--icon-small);
    }
  }

  a {
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        color: var(--text);
        text-decoration: underline;
      }
    }
  }

  span {
    color: var(--text);
  }
</style>
