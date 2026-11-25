<script lang="ts">
  import Arrow from '~icons/tabler/arrow-left';

  let { title, message }: { title: string; message: string } = $props();
</script>

<section class="oops">
  <h1>{title}</h1>
  <p>{message}</p>
  <a class="button primary" href="/"><Arrow aria-hidden="true" /> Back to the apps</a>
</section>

<style>
  .oops {
    display: grid;
    justify-items: start;
    gap: var(--space-m);
    padding-block: var(--space-2xl);

    & h1 {
      font-size: var(--text-title);
    }

    & p {
      color: var(--text-muted);
      font-size: var(--text-large);
    }
  }
</style>
