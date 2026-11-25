<script lang="ts">
  import Command from '#lib/components/Command.svelte';
  import { absolute } from '#lib/site.ts';

  let { data } = $props();

  const endpoints = [
    { path: '/api/apps.json', what: 'Every app, most starred first' },
    { path: '/api/apps/fineprint.json', what: 'One app, by its repo name' },
    { path: '/api/categories.json', what: 'The categories, each with its apps in order' }
  ];
</script>

<header class="intro">
  <h1>API</h1>
  <p>
    Everything on this site is here as JSON too, so any other site can list the apps without keeping
    its own copy. No key, no sign up, and CORS is open, so you can call it straight from a browser.
  </p>
</header>

<section>
  <h2>Endpoints</h2>
  <dl class="endpoints">
    {#each endpoints as { path, what } (path)}
      <div class="panel">
        <dt><a href={path}><code>{path}</code></a></dt>
        <dd>{what}</dd>
      </div>
    {/each}
  </dl>
</section>

<section>
  <h2>Try it</h2>
  <Command command="curl {absolute('/api/apps.json')}" />
  <p class="muted">
    It's rebuilt every day, which is when the star counts catch up. Every link in it is a full URL,
    and each screenshot comes in a light and a dark version, small (800px) and large (1600px). Where
    an app only has the one look, both point at the same picture.
  </p>
</section>

<section>
  <h2>What an app looks like</h2>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre class="panel" tabindex="0"><code>{JSON.stringify(data.example, null, 2)}</code></pre>
</section>

<style>
  .intro {
    display: grid;
    gap: var(--space-m);

    & h1 {
      font-size: var(--text-title);
    }

    & p {
      max-width: var(--measure);
      color: var(--text-muted);
      font-size: var(--text-large);
    }
  }

  section {
    display: grid;
    gap: var(--space-m);
    max-width: 56rem;

    & h2 {
      font-size: var(--text-h2);
    }
  }

  .endpoints {
    display: grid;
    gap: var(--space-xs);
    margin: 0;

    & div {
      display: grid;
      gap: var(--space-2xs);
      padding: var(--space-s) var(--space-m);
    }

    & dd {
      margin: 0;
      color: var(--text-muted);
    }
  }

  pre {
    margin: 0;
    padding: var(--space-m);
    overflow-x: auto;
    font-size: var(--text-small);
  }
</style>
