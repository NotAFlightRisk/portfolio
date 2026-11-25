<script lang="ts">
  import { page } from '$app/state';
  import Oops from '#lib/components/Oops.svelte';
</script>

{#if page.status === 404}
  <Oops
    title="Nothing here"
    message="That page doesn't exist, or it's moved. The apps are all still about though."
  />
{:else}
  <Oops title="Something broke" message="That's on me, not you. Try again in a minute." />
{/if}
