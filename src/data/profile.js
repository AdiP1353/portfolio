/**
 * Personal details shown in the nav, hero, terminal card and contact section.
 *
 * `facts` render as lines in the terminal card:
 *   - a string value renders as  "value"
 *   - an array renders as        ["a", "b"]
 *   - an item may be a link:     { label: 'GitHub', href: 'https://...' }
 */
const links = {
  github: 'https://github.com/AdiP1353',
  linkedin: 'https://www.linkedin.com/in/adithya-prakash-2b4869245/',
  cv: 'Adithya_Prakash_CV.pdf', // file in /public
};

export const profile = {
  name: 'Adithya Prakash',
  handle: 'Adithya', // used as the object name in the terminal card, e.g. Adithya.languages
  cv: links.cv,

  intro: [
    'I am a programmer who enjoys building games and interactive experiments.',
    'I like turning ideas into things people can play with.',
  ],

  facts: [
    { key: 'location', value: 'Newcastle upon Tyne, UK' },
    {
      key: 'contact',
      value: [
        { label: 'LinkedIn', href: links.linkedin },
        { label: 'Github', href: links.github },
      ],
    },
    { key: 'resume', value: { label: 'Adithya_Prakash_CV.pdf', href: links.cv } },
    { key: 'languages', value: ['C#', 'C++', 'Python', 'GDScript', 'HLSL', 'OpenGL'] },
    { key: 'tools', value: ['Unity', 'Godot', 'Git'] },
  ],

  contact: {
    email: '', // e.g. 'you@example.com' — leave empty to hide
    links: [
      { label: 'LinkedIn', href: links.linkedin },
      { label: 'GitHub', href: links.github },
      { label: 'CV', href: links.cv },
    ],
  },
};
