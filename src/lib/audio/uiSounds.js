import { createOutput, enableAudioOnFirstInteraction } from './engine.js';
import { tone, noise } from './synth.js';

/**
 * Subtle interface sounds ("game juice"): soft ticks on hover, a tactile thock
 * on press, a swish when a project tile opens out, and so on.
 *
 * Wiring is declarative — `installUiSounds()` listens on the whole page:
 *   - links, buttons, inputs and clickable cards get the default sounds;
 *   - data-hover-sound="open" / data-press-sound="toggle" pick a different sound;
 *   - data-sound="none" silences an element and everything inside it.
 */
const LEVEL = 0.4; // relative to the master volume
const HOVER_GAP_MS = 40; // ignore hovers closer together than this (no machine-gunning)

// Rising notes for each correct key of the Konami code.
const CODE_NOTES = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760];

const SOUNDS = {
  hover: (out, t) => tone(out, { freq: 1800, to: 1500, start: t, duration: 0.035, type: 'triangle', peak: 0.12 }),

  press: (out, t) => {
    tone(out, { freq: 480, to: 240, start: t, duration: 0.08, peak: 0.5 });
    noise(out, { start: t, duration: 0.02, filter: 'highpass', freq: 2500, peak: 0.12 });
  },

  open: (out, t) => {
    noise(out, { start: t, duration: 0.18, freq: 500, to: 2000, q: 0.9, peak: 0.12, shape: 'swell' });
    tone(out, { freq: 660, to: 990, start: t, duration: 0.12, peak: 0.07 });
  },

  toggle: (out, t) => {
    tone(out, { freq: 880, start: t, duration: 0.06, type: 'triangle', peak: 0.25 });
    tone(out, { freq: 1318.51, start: t + 0.055, duration: 0.08, type: 'triangle', peak: 0.25 });
  },

  // Landing on a section after clicking a nav link.
  arrive: (out, t) => {
    tone(out, { freq: 1318.51, start: t, duration: 0.6, peak: 0.14 });
    tone(out, { freq: 1975.53, start: t + 0.06, duration: 0.5, peak: 0.08 });
  },

  // A key press: a rising note while it matches the Konami code, otherwise a soft click.
  key: (out, t, codeProgress = 0) => {
    if (codeProgress > 0) {
      tone(out, { freq: CODE_NOTES[codeProgress - 1], start: t, duration: 0.12, type: 'triangle', peak: 0.28 });
    } else {
      noise(out, { start: t, duration: 0.025, filter: 'highpass', freq: 3000, peak: 0.15 });
      tone(out, { freq: 1100, to: 900, start: t, duration: 0.03, type: 'triangle', peak: 0.08 });
    }
  },

  // Played while dragging the volume slider, so you hear the new level.
  preview: (out, t) => tone(out, { freq: 988, start: t, duration: 0.09, type: 'triangle', peak: 0.3 }),
};

/** Play one of the sounds above by name (extra args are passed through). */
export function playUiSound(name, ...args) {
  const sound = SOUNDS[name];
  const output = sound && createOutput(LEVEL, 1500);
  if (output) sound(output, output.context.currentTime + 0.005, ...args);
}

const INTERACTIVE = 'a[href], button, input, article.clickable, [data-hover-sound], [data-press-sound]';

function soundFor(element, kind, fallback) {
  if (!element || element.closest('[data-sound="none"]')) return null;
  return element.dataset[kind] ?? fallback;
}

/** Hook up hover / press sounds for the whole page. Returns a cleanup function. */
export function installUiSounds() {
  // Registered first, so audio is unlocked before the press sound below tries to play.
  const stopUnlocking = enableAudioOnFirstInteraction();
  let hovered = null;
  let lastHoverAt = 0;

  function onPointerOver(event) {
    if (event.pointerType !== 'mouse') return; // no hover sounds on touch
    const element = event.target.closest(INTERACTIVE);
    if (element === hovered) return;

    // Moving from e.g. a link back out onto the card that contains it isn't a new hover.
    const backToParent = element && hovered && element.contains(hovered);
    hovered = element;
    if (!element || backToParent) return;

    if (event.timeStamp - lastHoverAt < HOVER_GAP_MS) return;
    lastHoverAt = event.timeStamp;
    const sound = soundFor(element, 'hoverSound', 'hover');
    if (sound) playUiSound(sound);
  }

  function onPointerDown(event) {
    const sound = soundFor(event.target.closest(INTERACTIVE), 'pressSound', 'press');
    if (sound) playUiSound(sound);
  }

  window.addEventListener('pointerover', onPointerOver, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });

  return () => {
    window.removeEventListener('pointerover', onPointerOver);
    window.removeEventListener('pointerdown', onPointerDown, { capture: true });
    stopUnlocking();
  };
}
