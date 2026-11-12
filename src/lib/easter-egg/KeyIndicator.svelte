<script>
  import { fly } from 'svelte/transition';

  /**
   * Strip of keycaps showing recently pressed keys.
   * keys:    [{ id, label, matched }] — `matched` keys are part of the code entered so far
   * visible: fades the whole strip in/out
   */
  let { keys = [], visible = false } = $props();
</script>

<div class="keys" class:visible aria-hidden="true">
  {#each keys as key (key.id)}
    <kbd class:matched={key.matched} in:fly={{ x: 10, duration: 150 }}>{key.label}</kbd>
  {/each}
</div>

<style>
  .keys {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 5px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(6px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .keys.visible {
    opacity: 1;
    transform: none;
  }

  kbd {
    min-width: 2rem;
    padding: 0.25rem 0.5rem;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    background: var(--surface);
    border: 1px solid var(--border);
    border-bottom-width: 3px;
    border-radius: 6px;
    box-shadow: 0 6px 16px -8px var(--shadow);
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  kbd.matched {
    color: var(--accent);
    border-color: var(--accent);
  }
</style>
