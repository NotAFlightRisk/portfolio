<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { App } from '#lib/types.ts';
  import Back from '~icons/tabler/arrow-left';
  import Forward from '~icons/tabler/arrow-right';
  import More from '~icons/tabler/dots-vertical';
  import Lock from '~icons/tabler/lock';
  import Plus from '~icons/tabler/plus';
  import Reload from '~icons/tabler/reload';
  import Star from '~icons/tabler/star';
  import Close from '~icons/tabler/x';

  let {
    app,
    url,
    children
  }: { app: Pick<App, 'title' | 'logo'>; url?: string; children: Snippet } = $props();

  // the way browsers show it, without the https or a lone slash on the end
  const address = $derived(
    url ? decodeURI(url.replace(/^https:\/\//, '').replace(/\/$/, '')) : 'localhost'
  );
  const host = $derived(address.split('/')[0]);
</script>

<figure class="browser">
  <div class="chrome" aria-hidden="true">
    <div class="tabs">
      <span class="lights"><i></i><i></i><i></i></span>
      <span class="tab">
        <img src={app.logo} alt="" width="16" height="16" />
        <span class="title">{app.title}</span>
        <Close />
      </span>
      <Plus />
    </div>
    <div class="toolbar">
      <Back />
      <Forward class="roomy" />
      <Reload />
      <span class="address">
        {#if url}<Lock />{/if}
        <span class="url"><span class="host">{host}</span>{address.slice(host.length)}</span>
        <Star class="roomy" />
      </span>
      <More />
    </div>
  </div>
  <div class="view">{@render children()}</div>
</figure>

<style>
  .browser {
    container-type: inline-size;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    margin: 0;
    overflow: clip;
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow:
      var(--lift-shadow),
      0 0 0 1px var(--border);
  }

  .chrome {
    display: grid;
    border-bottom: var(--separator);
    background: var(--surface-hover);
    color: var(--text-muted);
    font-size: var(--text-small);
    line-height: var(--leading-title);

    & :global(svg) {
      flex-shrink: 0;
      width: var(--icon-small);
      height: var(--icon-small);
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    padding: var(--space-xs) var(--space-s) 0;
  }

  .lights {
    display: flex;
    gap: var(--space-2xs);
    padding-bottom: var(--space-xs);

    & i {
      width: var(--space-s);
      height: var(--space-s);
      border-radius: 50%;
      background: var(--border);
    }
  }

  .tab {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    width: min(15rem, 45%);
    padding: var(--space-xs) var(--space-s);
    border-radius: var(--radius) var(--radius) 0 0;
    background: var(--surface);
    color: var(--text);

    & img {
      width: 1em;
      height: 1em;
    }
  }

  .title {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    padding: var(--space-xs) var(--space-s);
    background: var(--surface);
  }

  .address {
    display: flex;
    flex-grow: 1;
    align-items: center;
    gap: var(--space-xs);
    min-width: 0;
    padding: var(--space-2xs) var(--space-s);
    border-radius: var(--radius);
    background: var(--bg);
  }

  .url {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .host {
    color: var(--text);
  }

  /* phone-sized frames keep just the address bar, like a phone browser does */
  @container (width < 30rem) {
    .tabs,
    .chrome :global(.roomy) {
      display: none;
    }
  }

  .view {
    aspect-ratio: var(--shot-ratio);
    overflow: clip;
    background: var(--surface-hover);
  }
</style>
