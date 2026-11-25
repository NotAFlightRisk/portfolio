<script lang="ts">
  import '@fontsource-variable/bricolage-grotesque';
  import font from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
  import '#lib/styles/tokens.css';
  import '#lib/styles/base.css';
  import { page } from '$app/state';
  import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import Header from '#lib/components/Header.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { site } from '#lib/site.ts';

  let { data, children } = $props();

  const meta = $derived(
    page.data.meta ?? {
      title: page.status === 404 ? 'Page not found' : 'Something broke',
      description: site.description,
      noindex: true
    }
  );
</script>

<svelte:head>
  <link rel="preload" href={font} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<Seo {meta} path={page.url.pathname} crumbs={page.data.crumbs} />

<a class="skip button" href="#main">Skip to content</a>
<Header categories={data.categories} />

<main id="main" tabindex="-1">
  {#if page.data.crumbs}
    <Breadcrumbs crumbs={page.data.crumbs} />
  {/if}
  {@render children()}
</main>

<Footer categories={data.categories} />

<style>
  .skip {
    position: fixed;
    top: var(--space-xs);
    left: var(--space-xs);
    z-index: 3;
    background: var(--on-accent);
    color: var(--accent);
    translate: 0 -200%;

    &:focus-visible {
      translate: none;
    }
  }

  main {
    display: grid;
    align-content: start;
    gap: var(--section-gap);
    flex-grow: 1;
    width: 100%;
    max-width: var(--page);
    margin-inline: auto;
    padding: var(--space-l) var(--gutter) 0;

    &:focus {
      outline: none;
    }
  }
</style>
