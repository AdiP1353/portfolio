<script>
  import { onMount } from 'svelte';
  import Glyph from './Glyph.svelte';

  let { name, intro = [] } = $props();

  // ── Typing animation: reveals the name one character at a time. ──
  let count = $state(0);
  const done = $derived(count >= name.length);

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      count = name.length;
      return;
    }
    const timer = setInterval(() => {
      count += 1;
      if (count >= name.length) clearInterval(timer);
    }, 85);
    return () => clearInterval(timer);
  });

  // ── Hover highlight: letters near the cursor shift towards the highlight colour. ──
  const GLOW_RADIUS = 90; // px from the cursor at which a letter stops glowing
  const letterEls = [];
  let glow = $state([]);

  function handleMove(event) {
    if (!done) return;
    glow = letterEls.map((el) => {
      const r = el.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (r.left + r.width / 2),
        event.clientY - (r.top + r.height / 2),
      );
      return Math.max(0, 1 - distance / GLOW_RADIUS);
    });
  }

  function handleLeave() {
    glow = [];
  }
</script>

<section id="top" class="container">
  <h1 aria-label={name}>
    <span class="prompt"><Glyph char=">" /></span>
    <span class="name" aria-hidden="true" onmousemove={handleMove} onmouseleave={handleLeave}
      >{#each name.slice(0, count) as char, i}<span
          class="char"
          bind:this={letterEls[i]}
          style:--glow={glow[i] ?? 0}>{char}</span
        >{/each}</span
    ><span class="cursor" aria-hidden="true"></span>
  </h1>

  {#each intro as line}
    <p>{line}</p>
  {/each}
  <p>Check out my <a href="#projects">projects</a> below.</p>
</section>

<style>
  section {
    padding-top: clamp(4rem, 12vh, 8rem);
    padding-bottom: 3rem;
  }

  h1 {
    font-family: var(--font-mono);
    font-weight: 400;
    font-size: clamp(2.25rem, 7vw, 4.25rem);
    line-height: 1.15;
    color: var(--accent);
    margin: 0 0 2rem;
    min-height: 1.15em;
  }

  /* Each letter blends from the accent to the highlight colour by its --glow (0–1).
     The transition makes the highlight trail behind the cursor as it moves. */
  .char {
    color: color-mix(in oklab, var(--accent), var(--accent-highlight) calc(var(--glow) * 100%));
    text-shadow: 0 0 calc(var(--glow) * 22px)
      color-mix(in srgb, var(--accent-highlight) calc(var(--glow) * 50%), transparent);
    transition:
      color 0.4s ease-out,
      text-shadow 0.4s ease-out;
  }

  .cursor {
    display: inline-block;
    width: 0.55em;
    height: 1em;
    margin-left: 0.08em;
    vertical-align: -0.12em;
    background: var(--accent);
    opacity: 0.75;
    animation: blink 1.1s steps(1) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  p {
    color: var(--text-muted);
    margin: 0 0 0.35rem;
    max-width: 60ch;
  }

  p a {
    font-weight: 600;
  }
</style>
