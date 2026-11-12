<script>
  /** Small spotted Yoshi egg. Shell colour: --egg-shell, spots: --accent. */
  let { class: className = '' } = $props();
</script>

<svg class="egg-icon {className}" viewBox="0 0 20 24" aria-hidden="true">
  <path
    class="shell"
    d="M10 1C4.8 1 1.2 8.6 1.2 14.4 1.2 19.4 5.1 23 10 23s8.8-3.6 8.8-8.6C18.8 8.6 15.2 1 10 1z"
  />
  <circle class="spot" cx="7.2" cy="9.4" r="2.3" />
  <circle class="spot" cx="13.6" cy="13.8" r="2.7" />
  <circle class="spot" cx="7.4" cy="18.4" r="1.9" />
</svg>

<style>
  .shell {
    fill: var(--egg-shell, #f3f0e4);
  }

  .spot {
    fill: var(--accent);
  }
</style>
