<script lang="ts">
  import Chart from '~icons/tabler/chart-dots-3';
  import Microscope from '~icons/tabler/microscope';
  import Server from '~icons/tabler/server-2';
  import Sparkles from '~icons/tabler/sparkles';
  import Tool from '~icons/tabler/tool';

  let { name }: { name: string } = $props();

  const icons = {
    microscope: Microscope,
    'chart-dots-3': Chart,
    'server-2': Server,
    tool: Tool,
    sparkles: Sparkles
  };
  const Icon = $derived(icons[name as keyof typeof icons]);
</script>

<Icon aria-hidden="true" />
