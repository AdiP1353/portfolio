/**
 * Everything about you on the page except the projects (see projects.js).
 * Text comes from the CV in public/Adithya_Prakash_CV.pdf.
 */
export const profile = {
  name: 'Adithya Prakash',
  email: 'aprakash1353@gmail.com',
  cv: 'Adithya_Prakash_CV.pdf', // file in /public

  links: [
    { label: 'GitHub', href: 'https://github.com/AdiP1353' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adithya-prakash-2b4869245/' },
  ],

  // Hero: a small status line, a two-part headline (the second part is dimmed) and a short intro.
  status: 'Open to graduate roles · 2027',
  headline: ['I make games,', 'and the systems that make them feel good.'],
  intro:
    'Final-year game engineering student at Newcastle University. Level designer on Samsara, now on Steam. Founder of a 140-member game dev society.',

  // The strip of numbers under the hero.
  stats: [
    { value: '1st', label: 'average, every year' },
    { value: '140', label: 'society members' },
    { value: '120+', label: 'FPS on integrated GPU' },
    { value: '5', label: 'game jams run' },
  ],

  experience: [
    {
      role: 'Level Designer, Infinity27',
      dates: 'Oct 2025 – Jul 2026',
      summary:
        "Freelance on Samsara after the studio's UE5 bootcamp. Designed, greyboxed and playtested Uttaraku Islands; worked with a gameplay programmer on enemy attack patterns.",
    },
    {
      role: 'Founder & President, Game Dev Society',
      dates: '2023 – present',
      summary:
        'Built it to 140 paying members and a 7-person committee. Weekly dev sessions, 5 game jams, about 10 industry speakers.',
    },
    {
      role: 'MComp Computer Science, Newcastle',
      dates: '2023 – 2027',
      summary:
        'Game Engineering. First-class average in every stage. Modules include Advanced Graphics and Advanced Programming for Games.',
    },
  ],
};
