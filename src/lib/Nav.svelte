<script>
  let { name, cv } = $props();

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];
</script>

<nav class="wrap">
  <a class="name" href="#top">{name}</a>
  <ul>
    {#each links as link}
      <li class="section"><a href={link.href}>{link.label}</a></li>
    {/each}
    <li><a class="btn btn-line" href={cv} target="_blank" rel="noreferrer">CV</a></li>
  </ul>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 76px;
  }

  .name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 15px;
  }

  .section a {
    color: var(--muted);
    text-decoration: none;
  }

  .section a:hover {
    color: var(--text);
  }

  @media (max-width: 860px) {
    .section {
      display: none;
    }
  }
</style>
