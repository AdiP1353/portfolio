<script>
  import { onMount } from 'svelte';
  import { profile } from './data/profile.js';
  import { projects } from './data/projects.js';

  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import TerminalCard from './lib/TerminalCard.svelte';
  import Projects from './lib/Projects.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';
  import { highlightOnNavigate } from './lib/highlightOnNavigate.js';
  import EasterEgg from './lib/easter-egg/EasterEgg.svelte';
  import SoundControl from './lib/SoundControl.svelte';
  import { installUiSounds } from './lib/audio/uiSounds.js';

  onMount(installUiSounds);
</script>

<svelte:document onclick={highlightOnNavigate} />

<Nav cv={profile.cv} />

<main>
  <Hero name={profile.name} intro={profile.intro} />
  <div class="container">
    <TerminalCard handle={profile.handle} facts={profile.facts} />
  </div>
  <Projects {projects} />
  <Contact contact={profile.contact} />
</main>

<Footer name={profile.name} />

<SoundControl />
<EasterEgg />
