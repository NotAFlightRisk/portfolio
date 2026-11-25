<script lang="ts">
  import AppCard from '#lib/components/AppCard.svelte';
  import AppLinks from '#lib/components/AppLinks.svelte';
  import Browser from '#lib/components/Browser.svelte';
  import Carousel from '#lib/components/Carousel.svelte';
  import CategoryIcon from '#lib/components/CategoryIcon.svelte';
  import JsonLd from '#lib/components/JsonLd.svelte';
  import Shot from '#lib/components/Shot.svelte';
  import { absolute } from '#lib/site.ts';
  import Arrow from '~icons/tabler/arrow-right';

  let { data } = $props();

  const page = (app: { category: string; name: string }) => `/${app.category}/${app.name}`;

  const list = $derived({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Apps',
    itemListElement: data.all.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.title,
      url: absolute(page(app))
    }))
  });
</script>

<JsonLd data={list} />

<section class="intro">
  <h1>Portfolio</h1>
  <div class="blurb">
    <p>
      I build free and open source apps that make hidden information easier to find, explore and
      understand.
    </p>
    <a class="button raised" href="/all">
      View all ({data.all.length})<span class="visually-hidden"> apps</span>
      <Arrow aria-hidden="true" />
    </a>
  </div>
</section>

<div class="featured panel">
  <Carousel items={data.featured} label="Featured apps">
    {#snippet slide(app, i)}
      <article class="feature">
        <div class="copy">
          <img class="logo" src={app.logo} alt="" width="80" height="80" />
          <h2><a href={page(app)}>{app.title}</a></h2>
          <p>{app.tagline}</p>
          <AppLinks {app} />
        </div>
        <a class="frame" href={page(app)} tabindex="-1" aria-hidden="true">
          <Browser {app} url={app.screenshots[0]?.url}>
            {#if app.screenshots[0]}
              <Shot
                shot={app.screenshots[0]}
                sizes="(width < 56rem) 92vw, 50rem"
                priority={i === 0}
              />
            {/if}
          </Browser>
        </a>
      </article>
    {/snippet}
  </Carousel>
</div>

{#each data.shelves as shelf (shelf.slug)}
  <section class="shelf">
    <div class="heading">
      <span class="icon"><CategoryIcon name={shelf.icon} /></span>
      <h2><a href="/{shelf.slug}">{shelf.title}</a></h2>
      <p>{shelf.description}</p>
      <a class="button raised all" href="/{shelf.slug}">
        View all ({shelf.apps.length})<span class="visually-hidden">
          {shelf.title.toLowerCase()} apps
        </span>
        <Arrow aria-hidden="true" />
      </a>
    </div>
    <Carousel items={shelf.apps} label={shelf.title} dots={false} peek>
      {#snippet slide(app)}
        <AppCard {app} />
      {/snippet}
    </Carousel>
  </section>
{/each}

<style>
  .intro {
    display: grid;
    justify-items: start;
    gap: var(--space-m);

    & h1 {
      font-size: var(--text-title);
    }

    /* title on the left, the blurb beside it, so the first app sits higher up the screen */
    @media (width >= 64rem) {
      grid-template-columns: auto minmax(0, 1fr);
      align-items: center;
      column-gap: var(--space-2xl);
    }
  }

  .blurb {
    display: grid;
    justify-items: start;
    gap: var(--space-s);

    & p {
      max-width: var(--measure);
      color: var(--text-muted);
      font-size: var(--text-large);
    }
  }

  .featured {
    padding: var(--space-s);

    @media (width >= 56rem) {
      padding: var(--space-l);
    }
  }

  .feature {
    display: grid;
    align-items: center;
    gap: var(--space-l) var(--space-2xl);
    padding: var(--space-xs);

    @media (width >= 56rem) {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }
  }

  .copy {
    container-type: inline-size;
    display: grid;
    justify-items: start;
    gap: var(--space-m);

    & h2 {
      font-size: var(--text-hero);

      & a {
        text-decoration: none;

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    & p {
      color: var(--text-muted);
      font-size: var(--text-large);
    }

    /* every slide the same height on a phone, so the dots sit snug under whichever is showing */
    @media (width < 56rem) {
      & h2 {
        overflow: hidden;
        font-size: var(--text-h2);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & p {
        display: -webkit-box;
        min-height: 3lh;
        overflow: hidden;
        font-size: var(--text-base);
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
      }
    }
  }

  .logo {
    width: var(--logo-large);
    height: var(--logo-large);

    /* the screenshot's right above it on a phone, so the name does the job alone */
    @media (width < 56rem) {
      display: none;
    }
  }

  .frame {
    display: block;
    text-decoration: none;

    @media (width < 56rem) {
      order: -1;
    }
  }

  .shelf {
    display: grid;
    gap: var(--space-m);
    padding-top: var(--section-gap);
    border-top: var(--separator);
  }

  .heading {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-2xs) var(--space-s);

    & h2 {
      font-size: var(--text-h2);

      & a {
        text-decoration: none;

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    & p {
      grid-column: 1 / -1;
      grid-row: 2;
      max-width: var(--measure);
      color: var(--text-muted);
    }
  }

  .icon {
    display: grid;
    place-items: center;
    width: var(--target);
    height: var(--target);
    border-radius: var(--radius);
    background: var(--accent);
    color: var(--on-accent);

    & :global(svg) {
      width: var(--icon);
      height: var(--icon);
    }
  }
</style>
