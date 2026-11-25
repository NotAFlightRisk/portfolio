<script lang="ts">
  import AppList from '#lib/components/AppList.svelte';
  import CategoryIcon from '#lib/components/CategoryIcon.svelte';

  let { data } = $props();
</script>

<header class="intro">
  <span class="icon"><CategoryIcon name={data.category.icon} /></span>
  <h1>{data.category.title}</h1>
  <p>{data.category.description}.</p>
</header>

<AppList name={data.category.title} apps={data.apps} />

<nav class="others" aria-label="Other categories">
  <h2>Other categories</h2>
  <ul>
    {#each data.others as other (other.slug)}
      <li>
        <a class="button raised" href="/{other.slug}">
          <CategoryIcon name={other.icon} />
          {other.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .intro {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--space-m);

    & h1 {
      font-size: var(--text-title);
    }

    & p {
      grid-column: 1 / -1;
      max-width: var(--measure);
      color: var(--text-muted);
      font-size: var(--text-large);
    }
  }

  .icon {
    display: grid;
    place-items: center;
    width: var(--logo-large);
    height: var(--logo-large);
    border-radius: var(--radius);
    background: var(--accent);
    color: var(--on-accent);

    & :global(svg) {
      width: 60%;
      height: 60%;
    }
  }

  .others {
    display: grid;
    gap: var(--space-m);

    & h2 {
      font-size: var(--text-h3);
    }

    & ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }
  }
</style>
