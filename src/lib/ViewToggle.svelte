<script>
  /** Single button that flips between grid and list view; the active mode's icon is highlighted. */
  let { view = 'grid', onchange } = $props();

  const next = $derived(view === 'grid' ? 'list' : 'grid');
</script>

<button
  type="button"
  class="toggle"
  data-press-sound="toggle"
  aria-label="Switch to {next} view"
  title="Switch to {next} view"
  onclick={() => onchange?.(next)}
>
  <span class="icon" class:active={view === 'grid'} aria-hidden="true">
    <svg viewBox="0 0 16 16" width="16" height="16">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" />
    </svg>
  </span>
  <span class="icon" class:active={view === 'list'} aria-hidden="true">
    <svg viewBox="0 0 16 16" width="16" height="16">
      <rect x="1.5" y="2" width="13" height="3.5" rx="1.2" />
      <rect x="1.5" y="10.5" width="13" height="3.5" rx="1.2" />
    </svg>
  </span>
</button>

<style>
  .toggle {
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 9px;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .toggle:hover {
    border-color: var(--accent);
  }

  .icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 28px;
    border-radius: 6px;
    color: var(--text-muted);
    transition:
      color 0.2s ease,
      background-color 0.2s ease;
  }

  .icon.active {
    color: var(--accent);
    background: var(--accent-soft);
  }

  svg {
    fill: currentColor;
  }
</style>
