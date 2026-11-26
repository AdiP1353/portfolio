<script>
  /**
   * One project as a large feature row: cover art on one side, the pitch on the other.
   * Rows alternate sides (see Projects in App.svelte).
   * @type {{ project: import('../data/projects.js').projects[number], number: number }}
   */
  let { project, number } = $props();

  const linkProps = $derived(
    project.source ? { href: project.source, target: '_blank', rel: 'noreferrer' } : null,
  );
</script>

<article class="feature">
  <svelte:element this={linkProps ? 'a' : 'div'} class="art" {...linkProps} tabindex={linkProps ? -1 : undefined}>
    <img src={project.art} alt={project.artAlt} loading="lazy" width="800" height="500" />
  </svelte:element>

  <div class="text">
    <p class="kind">{String(number).padStart(2, '0')} · {project.kind}</p>
    <h3>{project.title}</h3>
    <p class="pitch">{project.pitch}</p>
    <ul class="chips">
      {#each project.chips as chip, i}
        <li class:hi={i === 0}>{chip}</li>
      {/each}
    </ul>
    {#if project.source}
      <a class="more" href={project.source} target="_blank" rel="noreferrer">View source <span aria-hidden="true">→</span></a>
    {:else if project.note}
      <p class="note">{project.note}</p>
    {/if}
  </div>
</article>

<style>
  .feature {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 56px;
    align-items: center;
    padding: 40px 0;
  }

  .art {
    display: block;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--surface);
  }

  .art img {
    width: 100%;
    height: auto;
    transition: transform 0.6s var(--ease);
  }

  .feature:hover .art img {
    transform: scale(1.035);
  }

  .kind {
    margin: 0 0 10px;
    color: var(--faint);
    font-family: var(--font-display);
    font-size: 15px;
  }

  h3 {
    margin: 0 0 12px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(28px, 3vw, 40px);
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .pitch {
    margin: 0 0 18px;
    color: var(--muted);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    margin: 0 0 22px;
    padding: 0;
  }

  .chips li {
    padding: 4px 10px;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--muted);
    font-size: 13px;
  }

  .chips li.hi {
    border-color: var(--accent);
    color: var(--accent);
  }

  .more {
    display: inline-flex;
    gap: 8px;
    font-weight: 500;
    text-decoration: none;
  }

  .more span {
    color: var(--accent);
    transition: transform 0.2s ease;
  }

  .more:hover span {
    transform: translateX(4px);
  }

  .note {
    margin: 0;
    font-weight: 500;
  }

  @media (max-width: 860px) {
    .feature {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
</style>
