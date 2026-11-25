import Go from '~icons/simple-icons/go';
import JavaScript from '~icons/simple-icons/javascript';
import Mdx from '~icons/simple-icons/mdx';
import Python from '~icons/simple-icons/python';
import Svelte from '~icons/simple-icons/svelte';
import TypeScript from '~icons/simple-icons/typescript';
import Code from '~icons/tabler/code';

const icons: Record<string, typeof Code> = { Go, JavaScript, MDX: Mdx, Python, Svelte, TypeScript };

export const languageIcon = (language: string) => icons[language] ?? Code;
