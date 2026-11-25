<script lang="ts">
  import { page } from '$app/state';
  import { site } from '#lib/site.ts';
  import type { Category } from '#lib/types.ts';
  import Penguin from './Penguin.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  let { categories }: { categories: Category[] } = $props();

  const links = $derived(categories.map(({ slug, nav }) => ({ label: nav, href: `/${slug}` })));
  const current = (href: string) =>
    page.url.pathname === href || page.url.pathname.startsWith(`${href}/`) ? 'page' : undefined;
  let menu = $state<HTMLElement>();
</script>

<header>
  <p class="brand">
    <a href={site.home.url}>{site.home.name}</a>
    <span aria-hidden="true">/</span>
    <a href="/" aria-current={page.url.pathname === '/' ? 'page' : undefined}>{site.section}</a>
  </p>

  <nav aria-label="Main">
    <button class="button burger" type="button" popovertarget="menu" aria-label="Menu">
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    </button>
    <ul id="menu" popover bind:this={menu}>
      {#each links as { label, href } (href)}
        <li>
          <a class="button" {href} aria-current={current(href)} onclick={() => menu?.hidePopover()}>
            {label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <ThemeToggle />
  <Penguin />
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    height: var(--bar-height);
    padding-inline: var(--space-m);
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--bar-shadow);
    /* he peeks up from inside the bar, not from the page under it */
    overflow: clip;
    view-transition-name: bar;

    /* he's already yellow up here, so the highlight swaps round */
    & ::selection {
      background: var(--on-accent);
      color: var(--accent);
    }
  }

  :global(::view-transition-old(bar)) {
    display: none;
  }

  :global(::view-transition-new(bar)) {
    animation: none;
  }

  .brand {
    display: flex;
    align-items: baseline;
    gap: 0.2em;
    margin-right: auto;
    font-size: var(--text-brand);
    font-weight: var(--weight-title);
    line-height: var(--leading-brand);
    letter-spacing: var(--tracking-brand);
    white-space: nowrap;

    & a {
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    & span {
      opacity: 0.4;
    }
  }

  .burger {
    width: var(--target);
    padding: 0;

    & svg {
      width: var(--icon);
      height: var(--icon);
    }
  }

  path {
    transform-origin: center;
  }

  /* top and bottom bars meet in the middle and cross, the other one scarpers */
  nav:has(:popover-open) {
    & path:first-child {
      transform: rotate(45deg) translateY(6px);
    }

    & path:nth-child(2) {
      opacity: 0;
    }

    & path:last-child {
      transform: rotate(-45deg) translateY(-6px);
    }
  }

  ul {
    gap: var(--space-xs);
    border: 0;
    background: var(--accent);
    color: inherit;
  }

  @media (width < 64rem) {
    ul {
      inset: var(--bar-height) 0 auto;
      width: auto;
      margin: 0;
      padding: var(--space-m);
      box-shadow: var(--bar-shadow);

      &:popover-open {
        display: grid;
        align-content: start;
        height: fit-content;
      }
    }

    li a {
      width: 100%;
      font-size: var(--text-base);
    }
  }

  @media (width >= 64rem) {
    .burger {
      display: none;
    }

    ul {
      position: static;
      display: flex;
      padding: 0;
      overflow: visible;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    path,
    ul {
      transition: var(--settle) var(--ease) allow-discrete;
      transition-property: transform, opacity, translate, display, overlay;
    }

    @starting-style {
      ul:popover-open {
        opacity: 0;
        translate: 0 -1rem;
      }
    }
  }
</style>
