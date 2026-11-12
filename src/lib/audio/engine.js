/**
 * Shared Web Audio setup for every sound on the site: one AudioContext and a
 * master gain node driven by the volume control. Volume/mute settings are
 * remembered per visitor.
 *
 * Browsers keep audio locked until the visitor interacts with the page, so
 * `unlockAudio()` is called on the first click / key press, and sounds
 * requested before then are simply skipped (never queued up).
 */
const STORAGE_KEY = 'sound-settings';
const DEFAULT_SETTINGS = { volume: 0.6, muted: false };

let context;
let master;
let resuming = false;
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

/** Call inside a click / key press handler to allow audio to play. */
export function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'suspended' || resuming) return;
  resuming = true;
  ctx.resume().finally(() => {
    resuming = false;
  });
}

/**
 * A gain node at `level` (0–1) feeding the master output, for one short sound.
 * Returns null if audio isn't unlocked yet. Disconnects itself after `lifetimeMs`.
 */
export function createOutput(level, lifetimeMs = 3000) {
  if (!context || (context.state !== 'running' && !resuming)) return null;
  const output = context.createGain();
  output.gain.value = level;
  output.connect(master);
  setTimeout(() => output.disconnect(), lifetimeMs);
  return output;
}
