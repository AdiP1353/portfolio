import { mount } from 'svelte';
import App from './App.svelte';
// Bundled fonts (THEME.md §3)
import '@fontsource-variable/bricolage-grotesque/opsz.css'; // weight + optical size axes
import '@fontsource-variable/dm-sans/opsz.css';
import './app.css';

export default mount(App, { target: document.getElementById('app') });
