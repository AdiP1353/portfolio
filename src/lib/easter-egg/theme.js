/**
 * Switches the site's colour theme by setting `data-theme` on <html>
 * (themes are defined in app.css), with a dramatic reveal built on the
 * View Transitions API:
 *
 *  - the new theme spreads out from the centre of the screen as an expanding circle,
 *  - a glowing shockwave ring rides the edge of that circle,
 *  - a flash and a spray of sparks burst out from the centre,
 *  - the old theme dims and blurs as it's swallowed.
 *
 * Browsers without View Transitions — or visitors who prefer reduced motion —
 * get an instant switch instead.
 */
const DURATION_MS = 1100;
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'; // ease-in-out: gentle start and finish
const SPARK_COUNT = 16;

/** @param {string | null} name  Theme name, or null for the default theme. */
export function setTheme(name) {
  const root = document.documentElement;
  const apply = () => {
    if (name) root.dataset.theme = name;
    else delete root.dataset.theme;
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduceMotion) {
    apply();
    return;
  }

  const burst = createBurst();

  // While switching, CSS colour transitions are paused (see .theme-switching in app.css)
  // so the circle reveals the new colours crisply instead of mid-fade.
  const transition = document.startViewTransition(() => {
    root.classList.add('theme-switching');
    document.body.append(burst.element);
    apply();
  });

  transition.finished.finally(() => {
    root.classList.remove('theme-switching');
    burst.element.remove();
  });

  transition.ready.then(() => {
    // Radius that reaches the corners from the centre.
    const radius = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
    const timing = { duration: DURATION_MS, easing: EASING };

    root.animate(
      { clipPath: ['circle(0px at 50% 50%)', `circle(${radius}px at 50% 50%)`] },
      { ...timing, pseudoElement: '::view-transition-new(root)' },
    );
    root.animate(
      { filter: ['brightness(1) blur(0px)', 'brightness(0.4) blur(3px)'] },
      { ...timing, pseudoElement: '::view-transition-old(root)' },
    );
    burst.play(radius, timing);
  });
}

/**
 * Overlay holding the ring, flash and sparks. It has its own view-transition-name
 * (see .theme-burst in app.css), so it's drawn above both themes rather than
 * being clipped by the expanding circle. It only exists during the transition.
 */
function createBurst() {
  const element = document.createElement('div');
  element.className = 'theme-burst';
  element.setAttribute('aria-hidden', 'true');

  const flash = addChild(element, 'theme-burst-flash');
  const ring = addChild(element, 'theme-burst-ring');
  const sparks = Array.from({ length: SPARK_COUNT }, () => addChild(element, 'theme-burst-spark'));

  function play(radius, timing) {
    // The ring grows with exactly the same timing as the circle, so it sits on its edge.
    ring.animate({ width: ['0px', `${radius * 2}px`], height: ['0px', `${radius * 2}px`] }, timing);
    ring.animate(
      [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }],
      { duration: timing.duration },
    );

    flash.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.2)' },
        { opacity: 0.9, transform: 'translate(-50%, -50%) scale(1)', offset: 0.25 },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(1.6)' },
      ],
      { duration: timing.duration * 0.6, easing: 'ease-out' },
    );

    sparks.forEach((spark, i) => {
      const angle = (i / SPARK_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = radius * (0.3 + Math.random() * 0.45);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      spark.animate(
        [
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' },
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1.3)', offset: 0.1 },
          {
            opacity: 1,
            transform: `translate(calc(-50% + ${x * 0.7}px), calc(-50% + ${y * 0.7}px)) scale(1)`,
            offset: 0.6,
          },
          { opacity: 0, transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.5)` },
        ],
        {
          duration: timing.duration * (0.65 + Math.random() * 0.3),
          delay: 40 + Math.random() * 80,
          easing: 'cubic-bezier(0.15, 0.8, 0.3, 1)',
          fill: 'both',
        },
      );
    });
  }

  return { element, play };
}

function addChild(parent, className) {
  const child = document.createElement('div');
  child.className = className;
  parent.append(child);
  return child;
}
