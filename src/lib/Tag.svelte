<script>
  let { label } = $props();
</script>

<span>{label}</span>

<style>
  span {
    display: inline-block;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }
</style>
