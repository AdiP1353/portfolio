<script>
  let { name } = $props();
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="container">Made by {name} © {year}</div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    padding: 1.5rem 0;
    color: var(--text-muted);
    font-size: 0.8rem;
  }
</style>
