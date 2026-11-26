<script>
  /** @type {{ stats: { value: string, label: string }[] }} */
  let { stats } = $props();
</script>

<dl class="stats">
  {#each stats as stat}
    <div class="stat">
      <dt>{stat.label}</dt>
      <dd>{stat.value}</dd>
    </div>
  {/each}
</dl>

<style>
  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  /* The number reads first, the label second, while the markup stays label: value. */
  .stat {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    padding: 28px 24px 28px 0;
  }

  .stat + .stat {
    padding-left: 24px;
    border-left: 1px solid var(--border);
  }

  dd {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  dt {
    color: var(--muted);
    font-size: 15px;
  }

  @media (max-width: 860px) {
    .stats {
      grid-template-columns: 1fr 1fr;
    }

    .stat:nth-child(3) {
      padding-left: 0;
      border-left: none;
    }

    .stat:nth-child(n + 3) {
      border-top: 1px solid var(--border);
    }
  }
</style>
