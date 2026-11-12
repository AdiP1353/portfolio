<script>
  let { cv = '' } = $props();

  const links = [
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
</script>

<header>
  <nav class="container">
    <ul>
      {#each links as link}
        <li><a href={link.href}>{link.label}</a></li>
      {/each}
      {#if cv}
        <li><a class="cv" href={cv} target="_blank" rel="noreferrer">CV</a></li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--header-bg);
    backdrop-filter: blur(10px);
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 68px;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 2.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul a {
    color: var(--text);
    font-size: 1.05rem;
    font-weight: 500;
    transition:
      color 0.2s ease,
      background-color 0.2s ease;
  }

  ul a:hover {
    color: var(--accent);
    text-decoration: none;
  }

  /* Outlined button that inverts (filled accent, dark text) on hover. */
  ul a.cv {
    color: var(--accent);
    border: 1.5px solid var(--accent);
    border-radius: 8px;
    padding: 0.4rem 1.1rem;
  }

  ul a.cv:hover {
    color: var(--on-accent);
    background: var(--accent);
  }

  @media (max-width: 420px) {
    ul {
      gap: 1.5rem;
    }
  }
</style>
