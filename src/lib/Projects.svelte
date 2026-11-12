<script>
  import { fade } from 'svelte/transition';
  import ProjectCard from './ProjectCard.svelte';
  import ViewToggle from './ViewToggle.svelte';
  import Glyph from './Glyph.svelte';

  let { projects = [] } = $props();

  // 'grid' = tiles that open out on hover; 'list' = full-width rows with previews always shown.
  // The choice is remembered per visitor.
  const STORAGE_KEY = 'projects-view';
  let view = $state(readSavedView());

  function readSavedView() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'list' ? 'list' : 'grid';
    } catch {
      return 'grid';
    }
  }

  function setView(next) {
    view = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode etc.) — the toggle still works for this visit.
    }
  }
</script>

<section id="projects" class="container">
  <div class="header">
    <h2 class="section-title"><Glyph char="#" /> Projects</h2>
    <ViewToggle {view} onchange={setView} />
  </div>

  {#key view}
    <div class={view} in:fade={{ duration: 200 }}>
      {#each projects as project (project.title)}
        <ProjectCard {project} layout={view === 'list' ? 'row' : 'tile'} />
      {/each}
    </div>
  {/key}
</section>

<style>
  section {
    padding-top: 5rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .header :global(.section-title) {
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    gap: 1.25rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
