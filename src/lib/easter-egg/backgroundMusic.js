import { getAudioContext, getMasterOutput } from '../audio/engine.js';

/**
 * Looping background music that fades in and out. It plays through the shared
 * audio engine, so the site's volume control applies to it too.
 * The audio file is only downloaded the first time `play()` is called.
 *
 * const music = createBackgroundMusic('audio/bg_music.mp3', { level: 0.15 });
 * music.play();      // fade in
 * music.play(1000);  // start silently now, fade in after 1 s
 * music.stop();      // fade out, then pause
 */
export function createBackgroundMusic(src, { level = 0.15, fadeMs = 2500 } = {}) {
  let audio;
  let gain;
  let pauseTimer;

  function setup() {
    const ctx = getAudioContext();
    if (!ctx) return false;
    audio = new Audio(src);
    audio.loop = true;
    gain = ctx.createGain();
    gain.gain.value = 0;
    ctx.createMediaElementSource(audio).connect(gain).connect(getMasterOutput());
    return true;
  }

  /** Hold the current level for `delayMs`, then glide to `value` over `fadeMs`. */
  function fadeTo(value, delayMs = 0) {
    const now = gain.context.currentTime;
    const from = gain.gain.value;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(from, now);
    gain.gain.setValueAtTime(from, now + delayMs / 1000);
    gain.gain.linearRampToValueAtTime(value, now + (delayMs + fadeMs) / 1000);
  }

  return {
    play(delayMs = 0) {
      if (!audio && !setup()) return;
      clearTimeout(pauseTimer); // cancel a pending pause from an earlier stop()
      // Start right away, while we're still handling the user's input — some
      // browsers (Safari) only allow audio to start inside a user interaction.
      audio.play().catch(() => {});
      fadeTo(level, delayMs);
    },

    stop() {
      if (!audio) return;
      fadeTo(0);
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => audio.pause(), fadeMs);
    },
  };
}
