<script>
  let { email, links, cv } = $props();
</script>

<section id="contact">
  <p>Hiring for gameplay or software roles?</p>
  <a class="email" href="mailto:{email}">{email}</a>
  <div class="row">
    {#each links as link}
      <a class="btn btn-line" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
    {/each}
    <a class="btn btn-solid" href={cv} target="_blank" rel="noreferrer">Download CV</a>
  </div>
</section>

<style>
  section {
    margin-top: 140px;
    padding: 80px 0 64px;
    border-top: 1px solid var(--border);
  }

  p {
    margin: 0 0 12px;
    color: var(--muted);
  }

  .email {
    display: inline-block;
    margin-bottom: 32px;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(28px, 6vw, 84px);
    line-height: 1;
    letter-spacing: -0.03em;
    text-decoration: none;
    overflow-wrap: anywhere;
  }

  .email:hover {
    color: var(--accent);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>
