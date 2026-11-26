<script>
  let { status, headline, intro, cv } = $props();
</script>

<header id="top">
  <p class="status">{status}</p>
  <h1>{headline[0]} <span class="dim">{headline[1]}</span></h1>
  <p class="intro">{intro}</p>
  <div class="ctas">
    <a class="btn btn-solid" href="#work">See my work</a>
    <a class="btn btn-line" href={cv} target="_blank" rel="noreferrer">Download CV</a>
  </div>
</header>

<style>
  header {
    padding: 13vh 0 9vh;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 20px;
    color: var(--accent);
    font-size: 15px;
    font-weight: 500;
  }

  .status::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }

  h1 {
    max-width: 1000px;
    margin: 0;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(48px, 8.2vw, 112px);
    line-height: 0.95;
    letter-spacing: -0.035em;
  }

  .dim {
    color: var(--faint);
  }

  .intro {
    max-width: 640px;
    margin: 28px 0 32px;
    color: var(--muted);
    font-size: clamp(18px, 1.6vw, 21px);
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>
