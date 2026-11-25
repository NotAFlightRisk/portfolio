<script lang="ts">
  import TagList from '#lib/components/TagList.svelte';

  let { data } = $props();
</script>

<h1>Tags</h1>
<TagList tags={data.tags} />

<style>
  h1 {
    font-size: var(--text-title);
  }
</style>
