<script>
  import Tag from './Tag.svelte';

  /**
   * layout: 'tile' — grid tile whose screenshots slide out on hover
   *         'row'  — full-width list row with screenshots always visible on the right
   * @type {{ project: { title: string, description: string, tags: string[], source?: string, demo?: string, images?: string[] }, layout?: 'tile' | 'row' }}
   */
  let { project, layout = 'tile' } = $props();

  const images = $derived(project.images ?? []);

  // Clicking anywhere on the tile opens the source. Real links inside the
  // tile (View Source / Live Demo) handle their own clicks.
  function openSource(event) {
    if (!project.source || event.target.closest('a')) return;
    window.open(project.source, '_blank', 'noopener');
  }

  // The screenshot panel slides out sideways, towards whichever side has room
  // in the viewport. If neither side does (narrow screens), it opens below.
  let card;
  let side = $state('below');

  function chooseSide() {
    if (layout !== 'tile') return;
    const rect = card.getBoundingClientRect();
    const needed = rect.width + 24;
    if (window.innerWidth - rect.right >= needed) side = 'right';
    else if (rect.left >= needed) side = 'left';
    else side = 'below';
  }
</script>

<!-- Mouse users can click the whole tile; keyboard users get the same action via the View Source link. -->

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
  bind:this={card}
  data-side={side}
  class:tile={layout === 'tile'}
  class:row={layout === 'row'}
  data-hover-sound={layout === 'tile' ? 'open' : undefined}
  class:clickable={project.source}
  class:has-previews={images.length > 0}
  onclick={openSource}
  onmouseenter={chooseSide}
  onfocusin={chooseSide}
>
  <div class="body">
    <h3>{project.title}</h3>
    <p>{project.description}</p>

    <ul class="tags" aria-label="Technologies">
      {#each project.tags as tag}
        <li><Tag label={tag} /></li>
      {/each}
    </ul>

    {#if project.demo || project.source}
      <div class="links">
        {#if project.demo}
          <a href={project.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>
        {/if}
        {#if project.source}
          <a href={project.source} target="_blank" rel="noreferrer">View Source ↗</a>
        {/if}
      </div>
    {/if}
  </div>

  {#if images.length}
    <div class="previews">
      {#each images as src, i}
        <img {src} alt="{project.title} screenshot {i + 1}" loading="lazy" />
      {/each}
    </div>
  {/if}
</article>

<style>
  article {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition:
      transform 0.25s ease,
      border-color 0.25s ease,
      border-radius 0.25s ease,
      box-shadow 0.25s ease;
  }

  article.clickable {
    cursor: pointer;
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.25rem 1.375rem 1.375rem;
  }

  h3 {
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: 1.1rem;
    margin: 0 0 0.6rem;
    transition: color 0.25s ease;
  }

  p {
    color: var(--text-muted);
    font-size: 0.925rem;
    margin: 0 0 1.25rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    list-style: none;
    margin: 0 0 1.25rem;
    padding: 0;
  }

  .links {
    display: flex;
    gap: 1.25rem;
    margin-top: auto;
    font-size: 0.875rem;
    font-weight: 500;
  }

  /* Screenshots: first one large, the rest in a row underneath. */
  .previews {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0 1.375rem 1.375rem;
  }

  .previews img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--surface-raised);
  }

  .previews img:first-child {
    grid-column: 1 / -1;
  }

  /*
   * Tile layout, on devices with a mouse: previews are hidden and the tile "opens out" on
   * hover: it lifts, and a screenshot panel attached to one of its edges slides
   * out over the neighbouring content, so the rest of the grid doesn't move.
   */
  @media (hover: hover) {
    article.tile:hover,
    article.tile:focus-within {
      z-index: 5;
      transform: translateY(-4px) scale(1.03);
      border-color: var(--accent);
      box-shadow: 0 30px 60px -25px var(--shadow);
    }

    article.tile:hover h3,
    article.tile:focus-within h3 {
      color: var(--accent);
    }

    /* The panel is a visual preview only: the pointer passes through it, so moving
       onto a neighbouring tile switches straight to that tile. */
    .tile .previews {
      position: absolute;
      pointer-events: none;
      background: var(--surface);
      border: 1px solid var(--accent);
      box-shadow: 0 30px 60px -25px var(--shadow);
      opacity: 0;
      visibility: hidden;
      transition:
        clip-path 0.35s ease,
        opacity 0.2s ease,
        visibility 0s linear 0.35s;
    }

    article.tile:hover .previews,
    article.tile:focus-within .previews {
      opacity: 1;
      visibility: visible;
      transition:
        clip-path 0.35s ease,
        opacity 0.2s ease,
        visibility 0s;
    }

    /* ── Sideways: a panel the same size as the tile, joined to its edge. ── */
    article.tile[data-side='right'] .previews,
    article.tile[data-side='left'] .previews {
      top: -1px;
      bottom: -1px;
      width: calc(100% + 1px);
      padding: 1.25rem;
      grid-template-rows: minmax(0, 2fr) minmax(0, 1fr);
    }

    article.tile[data-side='right'] .previews img,
    article.tile[data-side='left'] .previews img {
      height: 100%;
      aspect-ratio: auto;
    }

    article.tile[data-side='right'] .previews {
      left: 100%;
      border-left: none;
      border-radius: 0 var(--radius) var(--radius) 0;
      clip-path: inset(-60px 100% -60px 0);
    }

    article.tile[data-side='right']:is(:hover, :focus-within) .previews {
      clip-path: inset(-60px -60px -60px 0);
    }

    article.tile.has-previews[data-side='right']:is(:hover, :focus-within) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    article.tile[data-side='left'] .previews {
      right: 100%;
      border-right: none;
      border-radius: var(--radius) 0 0 var(--radius);
      clip-path: inset(-60px 0 -60px 100%);
    }

    article.tile[data-side='left']:is(:hover, :focus-within) .previews {
      clip-path: inset(-60px 0 -60px -60px);
    }

    article.tile.has-previews[data-side='left']:is(:hover, :focus-within) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    /* ── Fallback when there's no room at the side: unroll below the tile. ── */
    article.tile[data-side='below'] .previews {
      top: 100%;
      left: -1px;
      right: -1px;
      padding-top: 0.25rem;
      border-top: none;
      border-radius: 0 0 var(--radius) var(--radius);
      clip-path: inset(0 -60px 100% -60px);
    }

    article.tile[data-side='below']:is(:hover, :focus-within) .previews {
      clip-path: inset(0 -60px -60px -60px);
    }

    article.tile.has-previews[data-side='below']:is(:hover, :focus-within) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  /*
   * Row layout (list view): looks like an opened-out tile — details on the left,
   * screenshots on the right — but fixed in size, with previews always visible.
   */
  article.row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 300px;
  }

  .row .previews {
    padding: 1.25rem;
    border-left: 1px solid var(--border);
    grid-template-rows: minmax(0, 2fr) minmax(0, 1fr);
    contain: size; /* fill the row's height instead of growing it */
  }

  .row .previews img {
    height: 100%;
    aspect-ratio: auto;
  }

  @media (hover: hover) {
    article.row:hover,
    article.row:focus-within {
      border-color: var(--accent);
      box-shadow: 0 20px 50px -25px var(--shadow);
    }

    article.row:hover h3,
    article.row:focus-within h3 {
      color: var(--accent);
    }
  }

  /* Narrow screens: stack the screenshots under the details. */
  @media (max-width: 700px) {
    article.row {
      grid-template-columns: 1fr;
      min-height: 0;
    }

    .row .previews {
      contain: none;
      border-left: none;
      grid-template-rows: none;
      padding-top: 0;
    }

    .row .previews img {
      height: auto;
      aspect-ratio: 16 / 9;
    }
  }
</style>
