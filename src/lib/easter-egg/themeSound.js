import { createOutput } from '../audio/engine.js';
import { tone, noise } from '../audio/synth.js';

/**
 * Sound for switching Yoshi mode: a sparkly arpeggio over a whoosh that sweeps
 * along with the expanding circle. Rising when entering, falling when leaving.
 */
const LEVEL = 0.2; // relative to the master volume

const NOTES_UP = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5 E5 G5 C6 E6
const NOTES_DOWN = [1046.5, 783.99, 659.25, 523.25]; // C6 G5 E5 C5
const FINAL_CHORD = [1046.5, 1318.51, 1567.98]; // C6 E6 G6
const NOTE_GAP = 0.07; // seconds between arpeggio notes

/** @param {boolean} entering  true when switching into Yoshi mode, false when leaving. */
export function playThemeSound(entering) {
  const output = createOutput(LEVEL, 3000);
  if (!output) return;

  const start = output.context.currentTime + 0.02;
  const notes = entering ? NOTES_UP : NOTES_DOWN;

  noise(output, {
    start,
    duration: 1.0,
    freq: entering ? 250 : 3500,
    to: entering ? 4500 : 250,
    q: 1.4,
    peak: entering ? 0.55 : 0.35,
    shape: 'swell',
  });

  notes.forEach((freq, i) => {
    const t = start + i * NOTE_GAP;
    tone(output, { freq, start: t, duration: 0.3, type: 'triangle', peak: 0.5, attack: 0.012 });
    tone(output, { freq: freq * 2, start: t, duration: 0.2, peak: 0.12, attack: 0.012 }); // shimmer
  });

  if (entering) {
    // A soft, ringing chord to land on.
    const t = start + notes.length * NOTE_GAP;
    FINAL_CHORD.forEach((freq) => tone(output, { freq, start: t, duration: 1.2, peak: 0.22, attack: 0.012 }));
  }
}
