<script>
  import EggIcon from './EggIcon.svelte';

  /**
   * A decorative prompt character (e.g. ">" or "#") that turns into a small
   * spotted Yoshi egg while the Yoshi theme is active.
   */
  let { char } = $props();
</script>

<span class="glyph" aria-hidden="true"><span class="char">{char}</span><EggIcon class="egg" /></span>

<style>
  .glyph :global(.egg) {
    display: none;
    width: 0.7em;
    height: 0.84em;
    vertical-align: -0.1em;
  }

  :global(:root[data-theme='yoshi']) .char {
    display: none;
  }

  /* Eggs pop into place with a little bounce just after the theme switch finishes. */
  :global(:root[data-theme='yoshi']) .glyph :global(.egg) {
    display: inline-block;
    transform-origin: 50% 85%;
    animation: egg-pop 0.6s cubic-bezier(0.34, 1.7, 0.64, 1) 0.9s both;
  }

  @keyframes egg-pop {
    from {
      transform: scale(0) rotate(-25deg);
    }
    to {
      transform: scale(1) rotate(0);
    }
  }
</style>
