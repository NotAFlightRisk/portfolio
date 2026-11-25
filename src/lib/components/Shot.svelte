<script lang="ts">
  import { shotSizes, srcset } from '#lib/site.ts';
  import type { Screenshot } from '#lib/types.ts';

  let {
    shot,
    sizes,
    priority = false
  }: { shot: Screenshot; sizes: string; priority?: boolean } = $props();

  const paired = $derived(shot.dark !== shot.light);
  const height = shotSizes.large * shotSizes.ratio;
</script>

<!-- a pair stays lazy, so the one your theme hides never gets downloaded -->
{#each paired ? ['light', 'dark'] : ['light'] as theme (theme)}
  {@const path = theme === 'dark' ? shot.dark : shot.light}
  <img
    class={theme}
    class:paired={paired && theme === 'light'}
    src="{path}-{shotSizes.small}.webp"
    srcset={srcset(path)}
    {sizes}
    alt={shot.alt}
    width={shotSizes.large}
    {height}
    loading={priority && !paired ? 'eager' : 'lazy'}
    decoding="async"
    fetchpriority={priority ? 'high' : undefined}
  />
{/each}

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .dark {
    display: none;
  }

  :global(:root[data-theme='dark']) {
    & .paired {
      display: none;
    }

    & .dark {
      display: block;
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) {
      & .paired {
        display: none;
      }

      & .dark {
        display: block;
      }
    }
  }
</style>
