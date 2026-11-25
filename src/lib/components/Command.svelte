<script lang="ts">
  import Check from '~icons/tabler/check';
  import Copy from '~icons/tabler/copy';

  let { command }: { command: string } = $props();
  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="command">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre tabindex="0"><code>{command}</code></pre>
  <button class="button" type="button" onclick={copy}>
    {#if copied}<Check aria-hidden="true" /> Copied{:else}<Copy aria-hidden="true" /> Copy{/if}
  </button>
</div>

<style>
  .command {
    display: flex;
    align-items: start;
    gap: var(--space-s);
    padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-m);
    border-radius: var(--radius);
    background: var(--code-bg);
    box-shadow: 0 0 0 1px var(--border);
  }

  pre {
    flex: 1;
    margin: 0;
    padding-block: var(--space-xs);
    overflow-x: auto;
  }
</style>
