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

<!-- lazy unless it's up top, so further down the twin your theme hides is never fetched -->
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
    loading={priority ? 'eager' : 'lazy'}
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
