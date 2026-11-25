<script lang="ts">
  import { tagSlug } from '#lib/site.ts';
  import TagIcon from '~icons/tabler/tag';

  let { tags, label = 'Tags' }: { tags: { title: string; count?: number }[]; label?: string } =
    $props();
</script>

<ul aria-label={label}>
  {#each tags as { title, count } (title)}
    <li>
      <a class="button raised" href="/tags/{tagSlug(title)}">
        <TagIcon aria-hidden="true" />
        {title}
        {#if count}
          <span class="count">{count}<span class="visually-hidden"> apps</span></span>
        {/if}
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .count {
    padding-left: var(--space-xs);
    border-left: var(--separator);
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  @media (hover: hover) {
    a:hover .count {
      border-color: currentColor;
      color: inherit;
    }
  }
</style>
