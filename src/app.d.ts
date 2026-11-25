import 'unplugin-icons/types/svelte';
import type { Crumb, Meta } from '#lib/types.ts';

declare global {
  namespace App {
    interface PageData {
      meta?: Meta;
      crumbs?: Crumb[];
    }
  }
}

export {};
