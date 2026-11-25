<script lang="ts">
  import { beak, belly, body, eyes, pupils, viewBox } from '#lib/penguin.ts';
  import { site } from '#lib/site.ts';
</script>

<svg {viewBox} role="img" aria-label="{site.author.name}'s avatar, a cartoon penguin">
  <path d={body} />
  <path class="white" d={belly} />
  <path class="beak" d={beak} />
  <g class="eyes">
    {#each eyes as d (d)}
      <path class="white" {d} />
    {/each}
    {#each pupils as pupil (pupil.cx)}
      <circle {...pupil} />
    {/each}
  </g>
</svg>

<style>
  svg {
    align-self: end;
    width: 3.5rem;
    /* sat a touch low so his flat bottom never lifts off the bar */
    translate: 0 4%;
    overflow: visible;
    fill: var(--on-accent);
  }

  .white {
    fill: #fff;
  }

  .beak {
    transform-box: fill-box;
    transform-origin: top;
    fill: var(--accent);
    stroke: var(--on-accent);
    stroke-width: 32;
    paint-order: stroke;
  }

  .eyes {
    transform-box: fill-box;
    transform-origin: center;
  }

  @media (prefers-reduced-motion: no-preference) {
    svg {
      animation: peek var(--peek) var(--peek-ease) both;
    }

    .eyes {
      animation: blink var(--blink-every) var(--peek) infinite;
    }

    .beak {
      transition: scale var(--quick) var(--peek-ease);
    }

    /* give him a prod and he'll noot at you */
    svg:hover .beak {
      scale: 1 1.25;
    }
  }

  @keyframes peek {
    from {
      translate: 0 100%;
    }
  }

  @keyframes blink {
    0%,
    94%,
    100% {
      scale: 1;
    }

    97% {
      scale: 1 0.1;
    }
  }
</style>
