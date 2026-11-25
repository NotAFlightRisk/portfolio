<script lang="ts">
  import AppCard from '#lib/components/AppCard.svelte';
  import AppLinks from '#lib/components/AppLinks.svelte';
  import Browser from '#lib/components/Browser.svelte';
  import Carousel from '#lib/components/Carousel.svelte';
  import Command from '#lib/components/Command.svelte';
  import JsonLd from '#lib/components/JsonLd.svelte';
  import Shot from '#lib/components/Shot.svelte';
  import { absolute, shotSizes, site } from '#lib/site.ts';
  import Check from '~icons/tabler/check';
  import Code from '~icons/tabler/code';
  import Clock from '~icons/tabler/clock';
  import License from '~icons/tabler/license';

  let { data } = $props();
  const app = $derived(data.app);

  const date = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

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
    keywords: app.topics.join(', '),
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
    <ul class="facts">
      {#if app.language}<li><Code aria-hidden="true" />{app.language}</li>{/if}
      {#if app.licence}<li><License aria-hidden="true" />{app.licence} licence</li>{/if}
      {#if app.updated}<li><Clock aria-hidden="true" />Updated {date(app.updated)}</li>{/if}
    </ul>
  </div>

  {#if app.screenshots.length}
    <Carousel items={app.screenshots} label="Screenshots of {app.title}">
      {#snippet slide(shot, i)}
        <Browser site={app.site}>
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
    {#if app.topics.length}
      <ul class="topics" aria-label="Topics">
        {#each app.topics as topic (topic)}
          <li><a href="https://github.com/topics/{topic}">#{topic}</a></li>
        {/each}
      </ul>
    {/if}
  </div>
  <ul class="features panel">
    {#each app.features as feature (feature)}
      <li><Check aria-hidden="true" />{feature}</li>
    {/each}
  </ul>
</section>

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

  .facts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs) var(--space-m);
    color: var(--text-muted);
    font-size: var(--text-small);

    & li {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
    }

    & :global(svg) {
      width: var(--icon-small);
      height: var(--icon-small);
    }
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

  .topics {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs) var(--space-s);
    font-size: var(--text-small);

    & a {
      display: inline-flex;
      align-items: center;
      min-height: var(--icon);
      color: var(--text-muted);
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          color: var(--text);
          text-decoration: underline;
        }
      }
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
