/**
 * Projects, shown as large feature rows in this order (numbered automatically).
 * To add one, copy an entry and edit it.
 *
 *   kind     Short label above the title, e.g. 'Graphics' or 'Shipped on Steam'.
 *   title    Project name.
 *   pitch    One or two sentences on what it is and why it's interesting.
 *   chips    Highlights and tech. The first chip is drawn in the accent colour.
 *   art      Cover image in public/art/ (16:10). Screenshots work too.
 *   artAlt   Description of the image, for screen readers.
 *   source   Link to the code (optional). The image and title link here.
 *   note     Text shown instead of a source link, e.g. the studio and dates (optional).
 */
export const projects = [
  {
    kind: 'Shipped on Steam',
    title: 'Uttaraku Islands, Samsara',
    pitch:
      'A five-minute area in a souls-like action RPG, live in Early Access. Two routes for two kinds of player: fighters earn a stronger weapon, climbers earn speed. Greyboxed in UE5, then playtested until it felt right.',
    chips: ['Level design', 'Unreal Engine 5', 'Playtesting', 'Perforce'],
    art: 'art/uttaraku.svg',
    artAlt: 'Illustration: islands with a dashed platforming route and a solid combat route',
    note: 'Infinity27 · 2025–26',
  },
  {
    kind: 'Graphics',
    title: 'A renderer lit by 150 fireflies',
    pitch:
      'Real-time OpenGL in C++17 and GLSL. Every firefly lights the scene through a deferred pass, with a day/night shadow map, HDR bloom and a GPU-occluded lens flare, at 120+ FPS on integrated graphics.',
    chips: ['120+ FPS', 'C++17', 'GLSL', 'Deferred lighting'],
    art: 'art/renderer.svg',
    artAlt: 'Illustration: a night scene lit by 150 fireflies under a moon',
    source: 'https://github.com/AdiP1353/CSC8502-Coursework',
  },
  {
    kind: 'Hackathon',
    title: 'BirdSong',
    pitch:
      'An offline mesh network for internet shutdowns. Encrypted messages are hidden in synthetic birdsong and passed phone to phone through speakers and microphones. Built as a pair at DurHack in under 24 hours.',
    chips: ['24 hours', 'Docker', 'Reed–Solomon', 'Fountain codes'],
    art: 'art/birdsong.svg',
    artAlt: 'Illustration: a birdsong spectrogram passed between devices',
    note: 'DurHack · Nov 2026',
  },
  {
    kind: 'Procedural',
    title: 'Terrarium',
    pitch:
      'A 3D procedural terrarium. Poisson-disc sampling scatters the plants; a state machine framework, signal bus and dependency provider keep the systems apart. Cel-shaded.',
    chips: ['Godot', 'GDScript', 'Procedural generation'],
    art: 'art/terrarium.svg',
    artAlt: 'Illustration: a glass dome with procedurally scattered plants',
    source: 'https://github.com/AdiP1353/Terrarium',
  },
  {
    kind: 'Game',
    title: 'Octagon',
    pitch:
      'A reflex defence game. Hold one of eight shields to block bombs, and let the apples through. Three difficulty phases and three spawn patterns.',
    chips: ['Unity', 'C#', 'HLSL'],
    art: 'art/octagon.svg',
    artAlt: 'Illustration: an octagon core with eight shields and incoming projectiles',
    source: 'https://github.com/AdiP1353/CSC3231',
  },
  {
    kind: 'Prototype',
    title: 'Unity physics playground',
    pitch:
      'Impulse-driven projectiles, SUVAT gravity on a custom controller and enemies with separate head and body colliders.',
    chips: ['Unity', 'C#', 'Physics'],
    art: 'art/physics.svg',
    artAlt: "Illustration: projectile arcs hitting an enemy's head collider",
    source: 'https://github.com/AdiP1353/CSC3232-Coursework',
  },
];
