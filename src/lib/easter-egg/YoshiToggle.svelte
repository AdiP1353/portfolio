<script>
  import { fly } from 'svelte/transition';
  import EggIcon from '../EggIcon.svelte';

  /** Bottom-right switch for Yoshi mode, shown once the Konami code has been found. */
  let { on = false, ontoggle } = $props();
</script>

<!-- data-sound="none": the theme switch plays its own chime, so skip the usual press sound. -->
<button
  type="button"
  class="yoshi-toggle"
  class:on
  aria-pressed={on}
  title={on ? 'Leave Yoshi mode' : 'Enter Yoshi mode'}
  data-sound="none"
  onclick={ontoggle}
  in:fly={{ y: 12, duration: 300 }}
>
  <EggIcon class="icon" />
  <span>Yoshi mode</span>
  <span class="switch" aria-hidden="true"><span class="knob"></span></span>
</button>

<style>
  .yoshi-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.6rem 0.4rem 0.7rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    box-shadow: 0 8px 20px -10px var(--shadow);
    cursor: pointer;
    pointer-events: auto;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .yoshi-toggle:hover,
  .yoshi-toggle.on {
    color: var(--accent);
    border-color: var(--accent);
  }

  .yoshi-toggle :global(.icon) {
    width: 12px;
    height: 14px;
  }

  .switch {
    position: relative;
    width: 26px;
    height: 14px;
    border-radius: 999px;
    background: var(--border);
    transition: background-color 0.2s ease;
  }

  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-muted);
    transition:
      transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 0.2s ease;
  }

  .on .switch {
    background: var(--accent-soft);
  }

  .on .knob {
    transform: translateX(12px);
    background: var(--accent);
  }
</style>
