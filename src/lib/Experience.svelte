<script>
  /** @type {{ items: { role: string, dates: string, summary: string }[] }} */
  let { items } = $props();
</script>

<div class="xp">
  {#each items as item}
    <article>
      <p class="when">{item.dates}</p>
      <h3>{item.role}</h3>
      <p>{item.summary}</p>
    </article>
  {/each}
</div>

<style>
  .xp {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  article {
    padding: 28px;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--surface);
  }

  .when {
    margin: 0 0 12px;
    color: var(--accent);
    font-size: 14px;
  }

  h3 {
    margin: 0 0 10px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 22px;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
    color: var(--muted);
    font-size: 16px;
  }

  @media (max-width: 860px) {
    .xp {
      grid-template-columns: 1fr;
    }
  }
</style>
