<script lang="ts">
  import AppCard from '#lib/components/AppCard.svelte';
  import AppLinks from '#lib/components/AppLinks.svelte';
  import Browser from '#lib/components/Browser.svelte';
  import Carousel from '#lib/components/Carousel.svelte';
  import Command from '#lib/components/Command.svelte';
  import Facts from '#lib/components/Facts.svelte';
  import JsonLd from '#lib/components/JsonLd.svelte';
  import Readme from '#lib/components/Readme.svelte';
  import Shot from '#lib/components/Shot.svelte';
  import TagList from '#lib/components/TagList.svelte';
  import { absolute, shotSizes, site } from '#lib/site.ts';
  import Check from '~icons/tabler/check';

  let { data } = $props();
  const app = $derived(data.app);

  const software = $derived({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.title,
    description: app.about,
    url: app.site ?? absolute(`/${app.category}/${app.name}`),
    applicationCategory: data.category.schema,
    operatingSystem: app.site ? 'Any (web browser)' : 'Linux, macOS, Windows',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    image: absolute(app.logo),
    screenshot: app.screenshots.map((shot) => absolute(`${shot.light}-${shotSizes.large}.webp`)),
    softwareHelp: `${app.repo}#readme`,
    license: app.licence && `https://spdx.org/licenses/${app.licence}`,
    dateModified: app.updated,
    keywords: app.tags.join(', '),
    sameAs: [app.repo],
    author: { '@type': 'Person', name: site.author.name, url: site.author.url }
  });
</script>

<JsonLd data={software} />

<section class="hero">
  <div class="copy">
    <img class="logo" src={app.logo} alt="" width="80" height="80" />
    <h1>{app.title}</h1>
    <p class="tagline">{app.tagline}</p>
    <AppLinks {app} />
    <Facts {app} />
  </div>

  {#if app.screenshots.length}
    <Carousel items={app.screenshots} label="Screenshots of {app.title}">
      {#snippet slide(shot, i)}
        <Browser {app} url={shot.url}>
          <Shot {shot} sizes="(width < 64rem) 92vw, 52rem" priority={i === 0} />
        </Browser>
      {/snippet}
    </Carousel>
  {/if}
</section>

<section class="about">
  <div class="story">
    <h2>What it does</h2>
    <p>{app.about}</p>
    {#if app.install}
      <h3>Get it running</h3>
      <Command command={app.install} />
    {/if}
    <TagList tags={app.tags.map((title) => ({ title }))} />
  </div>
  <ul class="features panel">
    {#each app.features as feature (feature)}
      <li><Check aria-hidden="true" />{feature}</li>
    {/each}
  </ul>
</section>

<Readme readme={data.readme} />

{#if data.more.length}
  <section class="more">
    <h2>More {data.category.title.toLowerCase()}</h2>
    <Carousel items={data.more} label="More {data.category.title.toLowerCase()}" dots={false} peek>
      {#snippet slide(other)}
        <AppCard app={other} />
      {/snippet}
    </Carousel>
  </section>
{/if}

<style>
  .hero {
    display: grid;
    align-items: center;
    gap: var(--space-xl) var(--space-2xl);

    @media (width >= 64rem) {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }
  }

  .copy {
    container-type: inline-size;
    display: grid;
    justify-items: start;
    gap: var(--space-m);

    & h1 {
      font-size: var(--text-hero);
    }
  }

  .logo {
    width: var(--logo-large);
    height: var(--logo-large);
  }

  .tagline {
    color: var(--text-muted);
    font-size: var(--text-large);
  }

  .about {
    display: grid;
    align-items: start;
    gap: var(--space-xl) var(--space-2xl);

    @media (width >= 64rem) {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }
  }

  .story {
    display: grid;
    gap: var(--space-m);
    max-width: var(--measure);

    & h2 {
      font-size: var(--text-h2);
    }

    & h3 {
      margin-top: var(--space-s);
      font-size: var(--text-h3);
    }
  }

  .features {
    display: grid;
    gap: var(--space-s);
    padding: var(--space-l);

    & li {
      display: flex;
      align-items: start;
      gap: var(--space-xs);
    }

    & :global(svg) {
      flex-shrink: 0;
      width: var(--icon);
      height: var(--icon);
      padding: var(--space-3xs);
      border-radius: 50%;
      background: var(--accent);
      color: var(--on-accent);
    }
  }

  .more {
    display: grid;
    gap: var(--space-m);

    & h2 {
      font-size: var(--text-h2);
    }
  }
</style>
