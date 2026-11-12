/**
 * Tiny building blocks for synthesised sound effects. Each one schedules a
 * single sound on an output node (see engine.js `createOutput`) at time `start`
 * (in AudioContext seconds).
 */

/**
 * A note: an oscillator with a quick attack and an exponential fade.
 * `to` makes the pitch glide from `freq` to `to` over the note.
 */
export function tone(output, { freq, to = freq, start, duration, type = 'sine', peak = 0.5, attack = 0.005 }) {
  const ctx = output.context;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, start + duration);

  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain).connect(output);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

/**
 * Filtered white noise — clicks, swishes and whooshes.
 * shape 'decay': sharp hit that fades;  shape 'swell': rises then falls.
 * `to` sweeps the filter frequency from `freq` to `to`.
 */
export function noise(
  output,
  { start, duration, filter = 'bandpass', freq, to = freq, q = 1, peak = 0.3, shape = 'decay' },
) {
  const ctx = output.context;
  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);

  const biquad = ctx.createBiquadFilter();
  biquad.type = filter;
  biquad.Q.value = q;
  biquad.frequency.setValueAtTime(freq, start);
  if (to !== freq) biquad.frequency.exponentialRampToValueAtTime(to, start + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, start);
  if (shape === 'swell') {
    gain.gain.linearRampToValueAtTime(peak, start + duration * 0.45);
    gain.gain.linearRampToValueAtTime(0, start + duration);
  } else {
    gain.gain.linearRampToValueAtTime(peak, start + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  }

  source.connect(biquad).connect(gain).connect(output);
  // Start somewhere random in the buffer so repeated sounds don't sound identical.
  source.start(start, Math.random() * (source.buffer.duration - duration - 0.05));
  source.stop(start + duration + 0.02);
}

let noiseBuffer;

function getNoiseBuffer(ctx) {
  if (!noiseBuffer || noiseBuffer.sampleRate !== ctx.sampleRate) {
    const seconds = 2;
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}
