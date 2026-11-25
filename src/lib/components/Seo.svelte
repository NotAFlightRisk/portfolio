<script lang="ts">
  import { absolute, site } from '#lib/site.ts';
  import type { Crumb, Meta } from '#lib/types.ts';
  import JsonLd from './JsonLd.svelte';

  let { meta, path, crumbs = [] }: { meta: Meta; path: string; crumbs?: Crumb[] } = $props();

  const url = $derived(absolute(path));
  const fullTitle = $derived(path === '/' ? meta.title : `${meta.title} | ${site.name}`);
  const image = $derived(
    meta.image ?? {
      src: '/og.png',
      alt: `${site.name}, every app I've built`,
      width: 1200,
      height: 630
    }
  );
  const ids = { site: absolute('/#website'), author: absolute('/#author') };

  const graph = $derived({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ids.site,
        url: absolute('/'),
        name: site.name,
        description: site.description,
        inLanguage: 'en-GB',
        publisher: { '@id': ids.author }
      },
      {
        '@type': 'Person',
        '@id': ids.author,
        name: site.author.name,
        url: site.author.url,
        sameAs: [site.github, site.home.url]
      },
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': ids.site },
        primaryImageOfPage: absolute(image.src)
      },
      crumbs.length > 1 && {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map(({ name, href }, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          item: absolute(href)
        }))
      }
    ].filter(Boolean)
  });
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={meta.description} />
  {#if meta.noindex}
    <meta name="robots" content="noindex" />
  {:else}
    <meta name="robots" content="max-image-preview:large" />
    <link rel="canonical" href={url} />
  {/if}
  <meta name="author" content={site.author.name} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={absolute(image.src)} />
  <meta property="og:image:width" content={String(image.width)} />
  <meta property="og:image:height" content={String(image.height)} />
  <meta property="og:image:alt" content={image.alt} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<JsonLd data={graph} />
