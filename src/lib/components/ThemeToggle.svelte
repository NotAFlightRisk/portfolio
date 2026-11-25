<script lang="ts">
  import { onMount } from 'svelte';

  let dark = $state(false);
  let ready = $state(false);
  let system: MediaQueryList;

  const root = () => document.documentElement;
  const showing = () => root().dataset.theme ?? (system.matches ? 'dark' : 'light');

  function remember(theme?: string) {
    try {
      if (theme) localStorage.setItem('theme', theme);
      else localStorage.removeItem('theme');
    } catch {
      // no storage in private mode and the like, so it just lasts for this page
    }
  }

  function pick(theme?: string) {
    if (theme) root().dataset.theme = theme;
    else delete root().dataset.theme;
    remember(theme);
    dark = showing() === 'dark';
  }

  function toggle() {
    const next = showing() === 'dark' ? 'light' : 'dark';
    // picking what the system shows anyway goes back to following the system
    const pinned = next === (system.matches ? 'dark' : 'light') ? undefined : next;
    if (document.startViewTransition) document.startViewTransition(() => pick(pinned));
    else pick(pinned);
  }

  onMount(() => {
    system = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => (dark = showing() === 'dark');
    sync();
    ready = true;
    system.addEventListener('change', sync);
    return () => system.removeEventListener('change', sync);
  });
</script>

<button
  class="button toggle"
  type="button"
  aria-label="Dark mode"
  aria-pressed={dark}
  class:ready
  onclick={toggle}
>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2" />
    <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
  </svg>
</button>

<style>
  .toggle {
    width: var(--target);
    padding: 0;

    /* keeps its spot until the script's awake, so nothing shuffles along */
    &:not(.ready) {
      visibility: hidden;
    }

    & svg {
      width: var(--icon);
      height: var(--icon);
    }
  }

  path {
    transform-origin: center;
  }

  /* the dark half swaps sides, so it always shows where you'd end up */
  :global(:root[data-theme='dark']) path {
    rotate: 180deg;
  }

  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme='light'])) path {
      rotate: 180deg;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    path {
      transition: rotate var(--settle) var(--ease);
    }
  }
</style>
