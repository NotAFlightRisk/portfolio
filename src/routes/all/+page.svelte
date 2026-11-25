<script lang="ts">
  import { onMount } from 'svelte';
  import AppList from '#lib/components/AppList.svelte';
  import type { App } from '#lib/types.ts';
  import Search from '~icons/tabler/search';

  let { data } = $props();

  const newest = (key: 'updated' | 'created') => (a: App, b: App) =>
    (b[key] ?? '').localeCompare(a[key] ?? '');

  const sorts = [
    { value: 'stars', label: 'Most stars', by: () => 0 },
    { value: 'updated', label: 'Recently updated', by: newest('updated') },
    { value: 'created', label: 'Newest', by: newest('created') },
    { value: 'title', label: 'A to Z', by: (a: App, b: App) => a.title.localeCompare(b.title) }
  ];

  let query = $state('');
  let category = $state('');
  let sort = $state('stars');
  let ready = $state(false);

  onMount(() => (ready = true));

  const words = (app: App) =>
    [app.title, app.name, app.tagline, app.language, ...app.tags].join(' ').toLowerCase();

  const shown = $derived(
    data.apps
      .filter((app) => !category || app.category === category)
      .filter((app) => words(app).includes(query.trim().toLowerCase()))
      .sort(sorts.find(({ value }) => value === sort)!.by)
  );
</script>

<header class="intro">
  <h1>All apps</h1>
  <search class="tools">
    <label class="find">
      <Search aria-hidden="true" />
      <span class="visually-hidden">Search the apps</span>
      <input type="search" placeholder="Search" bind:value={query} disabled={!ready} />
    </label>
    <label>
      <span class="visually-hidden">Category</span>
      <select bind:value={category} disabled={!ready}>
        <option value="">All categories</option>
        {#each data.categories as { slug, title } (slug)}
          <option value={slug}>{title}</option>
        {/each}
      </select>
    </label>
    <label>
      <span class="visually-hidden">Sort by</span>
      <select bind:value={sort} disabled={!ready}>
        {#each sorts as { value, label } (value)}
          <option {value}>{label}</option>
        {/each}
      </select>
    </label>
  </search>
  <p role="status">
    {shown.length === data.apps.length
      ? `Every app I've built, all ${shown.length} of them.`
      : `${shown.length} of ${data.apps.length} apps.`}
  </p>
</header>

{#if shown.length}
  <AppList name="All apps" apps={shown} />
{:else}
  <div class="empty">
    <p>Nothing matches that.</p>
    <button class="button raised" type="button" onclick={() => ([query, category] = ['', ''])}>
      Clear the filters
    </button>
  </div>
{/if}

<style>
  .intro {
    display: grid;
    gap: var(--space-m);

    @media (width >= 56rem) {
      grid-template-columns: 1fr auto;
      align-items: end;
    }

    & h1 {
      font-size: var(--text-title);
    }

    & p {
      grid-column: 1 / -1;
      color: var(--text-muted);
      font-size: var(--text-large);
    }
  }

  .tools {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xs);
    font-size: var(--text-small);

    @media (width >= 56rem) {
      display: flex;
    }
  }

  :is(.find, select) {
    min-height: var(--target);
    border: 0;
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow:
      var(--panel-shadow),
      0 0 0 1px var(--border);
    color: inherit;
    font: inherit;
  }

  .find {
    display: flex;
    grid-column: 1 / -1;
    align-items: center;
    gap: var(--space-xs);
    padding-inline: var(--space-s);
    color: var(--text-muted);

    &:focus-within {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
    }

    & :global(svg) {
      flex-shrink: 0;
      width: var(--icon-small);
      height: var(--icon-small);
    }

    & input {
      width: 100%;
      min-width: 0;
      border: 0;
      background: none;
      color: var(--text);
      font: inherit;
      outline: none;
    }
  }

  select {
    width: 100%;
    padding-inline: var(--space-s);
    cursor: pointer;
  }

  .empty {
    display: grid;
    justify-items: start;
    gap: var(--space-s);
    color: var(--text-muted);
  }
</style>
