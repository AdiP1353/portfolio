# Portfolio Website

A one-page, dark-themed portfolio inspired by [justinchi.me](https://www.justinchi.me/): a typed terminal-style name that glows under the cursor, an "about me" terminal window, projects as tiles (screenshots slide out on hover) or a list, and LinkedIn / GitHub / CV links. Subtle synthesised UI sounds, a volume control, and a Konami-code easter egg.

## Tech stack

| Tool | Why |
| --- | --- |
| **[Svelte 5](https://svelte.dev/)** | Small, readable components and a tiny bundle. |
| **[Vite 7](https://vite.dev/)** | Dev server and static build. |
| **Plain CSS** | Theme variables, component-scoped styles. |
| **Google Fonts** | Inter and JetBrains Mono. |

## Project structure

```
src/
├── data/
│   ├── projects.js      ← your projects (edit this to add more)
│   └── profile.js       ← name, intro, terminal facts, contact/CV links
├── lib/
│   ├── Nav, Hero, TerminalCard, Contact, Footer .svelte
│   ├── SoundControl.svelte  mute + volume slider
│   ├── Projects.svelte      grid / list of projects
│   ├── ViewToggle.svelte    grid ↔ list button
│   ├── ProjectCard.svelte   clickable tile or list row
│   ├── Glyph.svelte         > / # that turn into eggs
│   ├── audio/               Web Audio engine + UI sounds
│   └── easter-egg/          Konami code, Yoshi theme, music
├── App.svelte
├── app.css              colour themes, fonts, global styles
└── main.js
public/
├── Adithya_Prakash_CV.pdf
├── audio/bg_music.mp3
└── images/<project>/    screenshots
```

## Adding a project

Add an object to the array in `src/data/projects.js`:

```js
{
  title: 'My New Project',
  description: 'What it does and what I learned.',
  tags: ['TypeScript', 'React'],
  source: 'https://github.com/AdiP1353/my-new-project', // optional
  demo: 'https://example.com',                          // optional
  images: ['images/my-new-project/1.png'],              // optional, files in public/images/
},
```

Clicking a project opens `source`. The heading's toggle switches between **grid** (`images` slide out on hover) and **list** (always shown). Images are currently placeholders.

## Sound

All sounds share one Web Audio graph (`src/lib/audio/`) whose master volume is the bottom-left control. UI sounds are synthesised: hover ticks, a press "thock", a swish when tiles open, a bell when a section is reached. Add `data-sound="none"` to silence an element, or `data-hover-sound` / `data-press-sound` to pick another sound.

## Easter egg

Press **↑ ↑ ↓ ↓ ← → ← → B A** (each correct key plays a rising note) to toggle Yoshi mode: a green theme bursts from the screen centre with a shockwave ring, sparks and a chime (View Transitions API), `>` and `#` pop into eggs, and `public/audio/bg_music.mp3` fades in quietly.

Afterwards a **Yoshi mode** switch stays in the bottom-right. **Esc Esc** also exits. Typed keys appear as keycaps and reset after 3 s idle. Settings: top of `EasterEgg.svelte`.

## Customising

- **Personal info:** `src/data/profile.js`; each `facts` entry becomes a terminal line.
- **CV:** replace `public/Adithya_Prakash_CV.pdf`.
- **Colours:** variables in `src/app.css`.

## Running locally

Requires Node 20.19+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Accessibility

- Semantic landmarks, visible focus outlines; tiles expand on keyboard focus.
- Animations are disabled under `prefers-reduced-motion`.
