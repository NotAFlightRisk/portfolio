<script lang="ts">
  import type { Snippet } from 'svelte';

  let { site, children }: { site?: string; children: Snippet } = $props();
</script>

<figure class="browser">
  <div class="chrome" aria-hidden="true">
    <span class="lights"><i></i><i></i><i></i></span>
    {#if site}<span class="address">{new URL(site).host}</span>{/if}
  </div>
  <div class="view">{@render children()}</div>
</figure>

<style>
  .browser {
    display: grid;
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
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-s);
    padding: var(--space-xs) var(--space-s);
    border-bottom: var(--separator);
    font-size: var(--text-small);
  }

  .lights {
    display: flex;
    gap: var(--space-2xs);

    & i {
      width: var(--space-s);
      height: var(--space-s);
      border-radius: 50%;
      background: var(--border);
    }
  }

  .address {
    justify-self: center;
    padding: 0 var(--space-m);
    border-radius: var(--radius);
    background: var(--bg);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.85em;
  }

  .view {
    aspect-ratio: var(--shot-ratio);
    overflow: clip;
    background: var(--surface-hover);
  }
</style>
