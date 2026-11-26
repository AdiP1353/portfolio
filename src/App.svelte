<script>
  import { profile } from './data/profile.js';
  import { projects } from './data/projects.js';

  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import Stats from './lib/Stats.svelte';
  import ProjectFeature from './lib/ProjectFeature.svelte';
  import Experience from './lib/Experience.svelte';
  import Contact from './lib/Contact.svelte';
</script>

<Nav name={profile.name} cv={profile.cv} />

<main class="wrap">
  <Hero status={profile.status} headline={profile.headline} intro={profile.intro} cv={profile.cv} />
  <Stats stats={profile.stats} />

  <section id="work">
    <div class="section-head">
      <h2>Selected work</h2>
      <p>A shipped level, a renderer, a 24-hour hackathon build, and the things I make to learn.</p>
    </div>
    <div class="projects">
      {#each projects as project, i (project.title)}
        <ProjectFeature {project} number={i + 1} />
      {/each}
    </div>
  </section>

  <section id="experience">
    <div class="section-head"><h2>Experience</h2></div>
    <Experience items={profile.experience} />
  </section>

  <Contact email={profile.email} links={profile.links} cv={profile.cv} />
</main>

<style>
  /* Feature rows: hairlines between them, and the art swaps sides on every other row. */
  .projects :global(.feature + .feature) {
    border-top: 1px solid var(--border);
  }

  .projects :global(.feature:nth-child(even) .art) {
    order: 2;
  }

  @media (max-width: 860px) {
    .projects :global(.feature:nth-child(even) .art) {
      order: 0;
    }
  }
</style>
