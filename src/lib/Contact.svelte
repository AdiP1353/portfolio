<script>
  import Glyph from './Glyph.svelte';

  let { contact } = $props();
</script>

<section id="contact" class="container">
  <h2 class="section-title"><Glyph char="#" /> Contact me</h2>
  <p>Got a question, an opportunity, or just want to say hi? Reach out below.</p>
  <ul>
    {#if contact.email}
      <li><a href="mailto:{contact.email}">{contact.email}</a></li>
    {/if}
    {#each contact.links as link}
      <li><a href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a></li>
    {/each}
  </ul>
</section>

<style>
  section {
    padding-top: 5rem;
    padding-bottom: 4rem;
    --flash-inset: 3.75rem calc(var(--gutter) - 1rem) 2.5rem;
  }

  p {
    color: var(--text-muted);
    margin: 0 0 1rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: var(--font-mono);
    font-size: 0.95rem;
  }
</style>
