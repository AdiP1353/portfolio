<script>
  import Glyph from './Glyph.svelte';

  let { handle, facts = [] } = $props();

  const isLink = (item) => typeof item === 'object' && item !== null && 'href' in item;
</script>

{#snippet item(value)}
  {#if isLink(value)}
    <a class="str" href={value.href} target="_blank" rel="noreferrer">"{value.label}"</a>
  {:else}
    <span class="str">"{value}"</span>
  {/if}
{/snippet}

<div class="terminal" role="region" aria-label="About me">
  <div class="titlebar" aria-hidden="true">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
  </div>

  <dl>
    {#each facts as fact}
      <dt><span class="prompt"><Glyph char=">" /></span> {handle}.{fact.key}</dt>
      <dd>
        {#if Array.isArray(fact.value)}
          [{#each fact.value as v, i}{#if i > 0}{', '}{/if}{@render item(v)}{/each}]
        {:else}
          {@render item(fact.value)}
        {/if}
      </dd>
    {/each}
  </dl>
</div>

<style>
  .terminal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 20px 50px -20px var(--shadow);
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }

  .titlebar {
    display: flex;
    gap: 7px;
    padding: 10px 14px;
    background: var(--surface-raised);
    border-bottom: 1px solid var(--border);
  }

  .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }
  .red { background: #ff5f57; }
  .yellow { background: #febc2e; }
  .green { background: #28c840; }

  dl {
    margin: 0;
    padding: 1.25rem 1.5rem 1.5rem;
  }

  dt {
    color: var(--syntax-key);
    margin-top: 1rem;
  }

  dt:first-child {
    margin-top: 0;
  }

  .prompt {
    color: var(--accent);
  }

  dd {
    margin: 0;
    color: var(--text-muted);
  }

  .str {
    color: var(--syntax-string);
    white-space: nowrap;
  }

  a.str:hover {
    text-decoration: underline;
  }
</style>
