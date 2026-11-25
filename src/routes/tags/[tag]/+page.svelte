<script lang="ts">
  import AppList from '#lib/components/AppList.svelte';
  import TagList from '#lib/components/TagList.svelte';

  let { data } = $props();
</script>

<h1>{data.tag.title}</h1>
<AppList name={data.tag.title} apps={data.apps} />

<section class="others">
  <h2>Other tags</h2>
  <TagList tags={data.others} label="Other tags" />
</section>

<style>
  h1 {
    font-size: var(--text-title);
  }

  .others {
    display: grid;
    gap: var(--space-m);

    & h2 {
      font-size: var(--text-h3);
    }
  }
</style>
