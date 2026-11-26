# Portfolio Website

My portfolio: projects first, then experience and a way to get in touch.

Live at https://adip1353.github.io/portfolio/

## How it's built

- **Svelte 5** and **Vite 7**. The page is a handful of small components that render the data files.
- **Plain CSS**, dark theme. All design rules are in [`THEME.md`](THEME.md).
- **Fonts** (Bricolage Grotesque, DM Sans) are bundled with `@fontsource-variable`, so nothing loads from Google.

```
src/
├── data/
│   ├── profile.js        hero text, stats, experience, links
│   └── projects.js       projects
├── lib/
│   ├── Nav.svelte
│   ├── Hero.svelte
│   ├── Stats.svelte
│   ├── ProjectFeature.svelte   one project row
│   ├── Experience.svelte
│   └── Contact.svelte
├── App.svelte            puts the sections together
├── app.css               colours, buttons, shared styles
└── main.js
public/
├── art/                  project cover art (16:10 SVGs)
└── Adithya_Prakash_CV.pdf
```

## Adding a project

Add an entry to `src/data/projects.js`. Projects are numbered and alternate sides automatically.

```js
{
  kind: 'Game',                          // small label above the title
  title: 'My Project',
  pitch: 'What it is and why it is interesting.',
  chips: ['Godot', 'GDScript'],          // the first one is highlighted
  art: 'art/my-project.png',             // 16:10 image in public/art/
  artAlt: 'Screenshot of …',
  source: 'https://github.com/AdiP1353/my-project', // or note: 'Studio · 2026'
},
```

Real screenshots or GIFs can replace the illustrations in `public/art/` at any time.

## Editing everything else

- **Hero, stats, experience, links:** `src/data/profile.js`.
- **CV:** replace `public/Adithya_Prakash_CV.pdf`, keeping the name.
- **Colours and type:** `src/app.css`, following `THEME.md`.

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/
```

Pushing to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).
