/** ↑ ↑ ↓ ↓ ← → ← → B A — letters are matched case-insensitively. */
export const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/** Single characters are lower-cased so 'B' and 'b' match; named keys stay as-is. */
export function normalizeKey(key) {
  return key.length === 1 ? key.toLowerCase() : key;
}

/**
 * How far into `sequence` the recent key `history` has got: the length of the
 * longest tail of `history` that matches the start of `sequence`.
 * Equal to `sequence.length` when the whole code has just been entered.
 *
 * e.g. history […, ↑, ↑, ↓] → 3,   history […, ↑, ↑, ↑] → 2
 */
export function sequenceProgress(history, sequence = KONAMI_CODE) {
  for (let length = Math.min(history.length, sequence.length); length > 0; length--) {
    const tail = history.slice(-length);
    if (tail.every((key, i) => key === sequence[i])) return length;
  }
  return 0;
}
