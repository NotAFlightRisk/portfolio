<script lang="ts">
  import { languageIcon } from '#lib/languages.ts';
  import type { Stats } from '#lib/types.ts';
  import Clock from '~icons/tabler/clock';
  import License from '~icons/tabler/license';

  let { app }: { app: Stats } = $props();

  const day = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' }).format;

  const facts = $derived(
    [
      { icon: languageIcon(app.language ?? ''), label: 'Language', value: app.language },
      { icon: License, label: 'Licence', value: app.licence },
      { icon: Clock, label: 'Updated', value: app.updated && day(new Date(app.updated)) }
    ].filter(({ value }) => value)
  );
</script>

<dl>
  {#each facts as { icon: Icon, label, value } (label)}
    <div title={label}>
      <dt><Icon role="img" aria-label={label} /></dt>
      <dd>{value}</dd>
    </div>
  {/each}
</dl>

<style>
  dl {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs) var(--space-m);
    margin: 0;
    color: var(--text-muted);
    font-size: var(--text-small);
  }

  div,
  dt {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
  }

  dt :global(svg) {
    width: var(--icon-small);
    height: var(--icon-small);
  }

  dd {
    margin: 0;
  }
</style>
