<script>
  import { fly, fade } from 'svelte/transition';

  /** Brief tip shown above the Yoshi mode switch after entering Yoshi mode. */
</script>

<div class="hint" role="status" in:fly={{ y: 10, duration: 300 }} out:fade={{ duration: 400 }}>
  Press <kbd>Esc</kbd> <kbd>Esc</kbd> to leave Yoshi mode
</div>

<style>
  .hint {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--text-muted);
    font-size: 0.8rem;
    white-space: nowrap;
    box-shadow: 0 8px 24px -12px var(--shadow);
    pointer-events: none;
  }

  kbd {
    padding: 0.05rem 0.4rem;
    border: 1px solid var(--border);
    border-bottom-width: 2px;
    border-radius: 5px;
    background: var(--surface-raised);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }

  /* Phones have no Esc key; the Yoshi mode switch is enough there. */
  @media (hover: none) {
    .hint {
      display: none;
    }
  }
</style>
