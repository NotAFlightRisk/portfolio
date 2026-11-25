<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import Next from '~icons/tabler/chevron-right';
  import Previous from '~icons/tabler/chevron-left';

  let {
    items,
    label,
    slide,
    dots = true,
    peek = false
  }: {
    items: T[];
    label: string;
    slide: Snippet<[T, number]>;
    dots?: boolean;
    peek?: boolean;
  } = $props();

  let track = $state<HTMLElement>();
  let active = $state(0);
  let atStart = $state(true);
  let atEnd = $state(false);
  let overflows = $state(true);

  // the distance from one slide to the next, gap and all
  const step = () => {
    const [first, second] = track!.children as HTMLCollectionOf<HTMLElement>;
    return second ? second.offsetLeft - first.offsetLeft : track!.clientWidth;
  };
  const go = (index: number) => track!.scrollTo({ left: index * step() });

  function page(direction: number) {
    const perView = Math.max(1, Math.floor(track!.clientWidth / step()));
    go(Math.round(track!.scrollLeft / step()) + direction * perView);
  }

  function onscroll() {
    const { scrollLeft, clientWidth, scrollWidth } = track!;
    atStart = scrollLeft < 4;
    atEnd = scrollLeft + clientWidth > scrollWidth - 4;
    overflows = scrollWidth > clientWidth + 4;
    active = Math.round(scrollLeft / step());
  }

  $effect(() => {
    const watcher = new ResizeObserver(onscroll);
    watcher.observe(track!);
    return () => watcher.disconnect();
  });
</script>

<div class="carousel" class:peek role="region" aria-roledescription="carousel" aria-label={label}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="track" bind:this={track} {onscroll} tabindex="0">
    {#each items as item, i (i)}
      <div
        class="slide"
        role="group"
        aria-roledescription="slide"
        aria-label="{i + 1} of {items.length}"
      >
        {@render slide(item, i)}
      </div>
    {/each}
  </div>

  {#if items.length > 1}
    <div class="controls" hidden={!overflows}>
      <button class="button raised" type="button" disabled={atStart} onclick={() => page(-1)}>
        <Previous aria-hidden="true" /><span class="visually-hidden">Previous</span>
      </button>
      {#if dots}
        <div class="dots" role="group" aria-label="Pick one">
          {#each items as _, i (i)}
            <button
              type="button"
              aria-label="Show {i + 1} of {items.length}"
              aria-current={i === active ? 'true' : undefined}
              onclick={() => go(i)}
            ></button>
          {/each}
        </div>
      {/if}
      <button class="button raised" type="button" disabled={atEnd} onclick={() => page(1)}>
        <Next aria-hidden="true" /><span class="visually-hidden">Next</span>
      </button>
    </div>
  {/if}
</div>

<style>
  .carousel {
    display: grid;
    gap: var(--space-s);
    min-width: 0;
  }

  .track {
    position: relative;
    display: grid;
    grid-auto-columns: 100%;
    grid-auto-flow: column;
    gap: var(--space-m);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    /* the focus ring would get clipped by the scroller, so it goes inside */
    &:focus-visible {
      outline-offset: calc(var(--outline-offset) * -1);
    }
  }

  .peek .track {
    grid-auto-columns: var(--shelf-card);
    /* room for the cards' shadows, which the scroller would otherwise shave off */
    padding: var(--space-2xs) var(--space-2xs) var(--space-s);
    scroll-padding-inline: var(--space-2xs);
  }

  .slide {
    min-width: 0;
    scroll-snap-align: start;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-s);

    & .button {
      width: var(--target);
      padding: 0;

      &:disabled {
        opacity: 0.4;
        cursor: default;
        box-shadow: var(--panel-shadow);
      }
    }
  }

  .peek .controls {
    justify-content: end;
  }

  .dots {
    display: flex;
    gap: var(--space-2xs);

    & button {
      display: grid;
      place-items: center;
      width: var(--target);
      height: var(--target);
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;

      &::before {
        content: '';
        width: var(--dot);
        height: var(--dot);
        border-radius: 50%;
        background: var(--text-muted);
        opacity: 0.5;
        transition:
          width var(--settle) var(--ease),
          opacity var(--quick) var(--ease);
      }

      @media (hover: hover) {
        &:hover::before {
          opacity: 1;
        }
      }

      &[aria-current]::before {
        width: calc(var(--dot) * 2.5);
        border-radius: var(--dot);
        background: var(--link);
        opacity: 1;
      }
    }
  }
</style>
