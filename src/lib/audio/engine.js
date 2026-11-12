/**
 * Shared Web Audio setup for every sound on the site: one AudioContext and a
 * master gain node driven by the volume control. Volume/mute settings are
 * remembered per visitor.
 *
 * Browsers keep audio locked until the visitor interacts with the page (a click,
 * tap or key press — hovering and scrolling don't count), so
 * `enableAudioOnFirstInteraction()` starts it as soon as they do. Sounds
 * requested before then are simply skipped, never queued up.
 */
const STORAGE_KEY = 'sound-settings';
const DEFAULT_SETTINGS = { volume: 0.6, muted: false };

// Browsers disagree on which events may start audio (Chrome accepts the mouse
// press; Firefox waits for the release / click), so we try on all of them.
const UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'click', 'touchend', 'keydown', 'keyup'];
const UNLOCK_GRACE_MS = 250; // resume() is async — let sounds from the same click through

let context;
let master;
let lastUnlockAttempt = -Infinity;
let settings = loadSettings();

// ── Settings ────────────────────────────────────────────────────────────────

export function getSoundSettings() {
  return { ...settings };
}

/** @param {number} volume  0–1. Changing the volume also unmutes. */
export function setVolume(volume) {
  settings = { volume, muted: false };
  saveSettings();
}

export function setMuted(muted) {
  settings = { ...settings, muted };
  saveSettings();
}

function effectiveVolume() {
  return settings.muted ? 0 : settings.volume;
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage unavailable — settings just won't be remembered.
  }
  if (master) master.gain.setTargetAtTime(effectiveVolume(), context.currentTime, 0.03);
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (typeof saved?.volume === 'number') return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    // Missing or unreadable — fall back to defaults.
  }
  return { ...DEFAULT_SETTINGS };
}

// ── Audio graph ─────────────────────────────────────────────────────────────

/** The AudioContext, created on first use. Call from inside a user interaction. */
export function getAudioContext() {
  if (!context) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    context = new AudioContextClass();
    master = context.createGain();
    master.gain.value = effectiveVolume();
    master.connect(context.destination);
  }
  return context;
}

/** The master gain node every sound should feed into. */
export function getMasterOutput() {
  getAudioContext();
  return master;
}

/** Try to start audio. Only works inside a user interaction (click, key press…). */
export function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'running') return;
  lastUnlockAttempt = performance.now();
  ctx.resume().catch(() => {}); // refused this time — the next interaction tries again
}

/**
 * Starts audio on the visitor's first click / tap / key press, retrying on each
 * interaction until the browser allows it. Returns a cleanup function.
 */
export function enableAudioOnFirstInteraction() {
  const options = { capture: true, passive: true };
  const stop = () => UNLOCK_EVENTS.forEach((type) => window.removeEventListener(type, attempt, options));

  // Once audio is running, the next interaction removes these listeners.
  function attempt() {
    if (context?.state === 'running') stop();
    else unlockAudio();
  }

  UNLOCK_EVENTS.forEach((type) => window.addEventListener(type, attempt, options));
  return stop;
}

/**
 * A gain node at `level` (0–1) feeding the master output, for one short sound.
 * Returns null if audio isn't unlocked yet. Disconnects itself after `lifetimeMs`.
 */
export function createOutput(level, lifetimeMs = 3000) {
  if (!context) return null;
  const justUnlocked = performance.now() - lastUnlockAttempt < UNLOCK_GRACE_MS;
  if (context.state !== 'running' && !justUnlocked) return null;
  const output = context.createGain();
  output.gain.value = level;
  output.connect(master);
  setTimeout(() => output.disconnect(), lifetimeMs);
  return output;
}
