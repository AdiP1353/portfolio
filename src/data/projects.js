/**
 * Portfolio projects — rendered in this order on the page.
 *
 * To add a project, copy one of the objects below and edit it.
 *
 * Fields:
 *   title        (required) Display name.
 *   description  (required) One or two sentences about the project.
 *   tags         (required) Tech used; shown as chips.
 *   source       (optional) Link to the source code. Clicking anywhere on the tile opens it.
 *   demo         (optional) Link to a live demo / build / video.
 *   images       (optional) Screenshots revealed when the tile is hovered. The first one
 *                is shown large. Put files in public/images/<project>/ and keep the
 *                paths relative (no leading slash).
 */
export const projects = [
  {
    title: 'Terrarium',
    description:
      'A self-contained terrarium project. Replace this text with a short summary of what it does and what you learned building it.',
    tags: ['Godot', 'GDScript'],
    source: 'https://github.com/AdiP1353/Terrarium',
    images: ['images/terrarium/1.svg', 'images/terrarium/2.svg', 'images/terrarium/3.svg'],
  },
  {
    title: 'Octagon',
    description:
      'A fast-paced, reflex-driven defence game built in Unity. Hold one of eight directional shields to block incoming bombs while letting apples through to the core, across learning, disruption and flow difficulty phases with stream, pincer and chaos spawn patterns.',
    tags: ['Unity', 'C#', 'HLSL', 'ShaderLab'],
    source: 'https://github.com/AdiP1353/CSC3231',
    images: ['images/octagon/1.svg', 'images/octagon/2.svg', 'images/octagon/3.svg'],
  },
  {
    title: '3D Unity Experimentation',
    description:
      'A 3D Unity prototype exploring game physics: rigidbody projectiles fired with impulses, SUVAT-based gravity on a custom player controller, multi-collider enemies with headshots, terrain colliders and trigger-driven particle effects.',
    tags: ['Unity', 'C#', 'Physics'],
    source: 'https://github.com/AdiP1353/CSC3232-Coursework',
    images: ['images/unity-3d/1.svg', 'images/unity-3d/2.svg', 'images/unity-3d/3.svg'],
  },
];
