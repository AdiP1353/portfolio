<script>
  import KeyIndicator from './KeyIndicator.svelte';
  import YoshiToggle from './YoshiToggle.svelte';
  import EscHint from './EscHint.svelte';
  import { KONAMI_CODE, normalizeKey, sequenceProgress } from './konami.js';
  import { setTheme } from './theme.js';
  import { createBackgroundMusic } from './backgroundMusic.js';
  import { playThemeSound } from './themeSound.js';
  import { playUiSound } from '../audio/uiSounds.js';

  /*
   * Konami code easter egg: entering ↑ ↑ ↓ ↓ ← → ← → B A toggles Yoshi mode —
   * the Yoshi theme (bursting out from the centre of the screen, with a chime)
   * plus quiet background music.
   *
   * Once found, a "Yoshi mode" switch stays in the bottom-right (remembered per
   * visitor) so you can flip back and forth. Pressing Esc twice also leaves.
   * Every key press shows as a keycap above it; pausing for a few seconds clears the input.
   */
  const THEME = 'yoshi';
  const music = createBackgroundMusic('audio/bg_music.mp3', { level: 0.15 }); // × master volume
  const MUSIC_DELAY_MS = 1200; // let the switch animation and chime finish first
  const MAX_VISIBLE_KEYS = 10;
  const IDLE_RESET_MS = 3000; // stop typing this long and the entered keys reset
  const DOUBLE_ESC_MS = 500; // max gap between the two Esc presses
  const HINT_DELAY_MS = 1300; // show the Esc tip once the transition has settled…
  const HINT_DURATION_MS = 4500; // …for this long
  const UNLOCKED_KEY = 'yoshi-unlocked';

  const KEY_LABELS = {
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    ' ': 'Space',
    Escape: 'Esc',
    Backspace: '⌫',
    Delete: 'Del',
  };

  // Ignored entirely, so e.g. Shift + B still counts as just "B".
  const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'CapsLock', 'Fn', 'OS']);

  let keys = $state([]); // what the indicator shows: [{ id, label, matched }]
  let history = []; // normalised recent keys, for matching the code
  let indicatorVisible = $state(false);
  let yoshiMode = $state(false);
  let unlocked = $state(readUnlocked());
  let showEscHint = $state(false);

  let nextKeyId = 0;
  let idleTimer;
  let hintTimer;
  let lastEscapeAt = 0;

  function handleKeydown(event) {
    if (event.repeat || MODIFIER_KEYS.has(event.key) || isTypingIn(event.target)) return;

    // The indicator faded out after the last idle reset — start a fresh row.
    if (!indicatorVisible) keys = [];

    history = [...history, normalizeKey(event.key)].slice(-KONAMI_CODE.length);
    const progress = sequenceProgress(history);

    // The last `progress` keys on screen are the part of the code entered so far.
    const recent = [...keys, { id: nextKeyId++, label: keyLabel(event.key) }].slice(-MAX_VISIBLE_KEYS);
    keys = recent.map((key, i) => ({ ...key, matched: i >= recent.length - progress }));

    if (progress === KONAMI_CODE.length) {
      history = [];
      unlock();
      setYoshiMode(!yoshiMode);
    } else {
      playUiSound('key', progress);
      if (event.key === 'Escape' && yoshiMode) {
        if (event.timeStamp - lastEscapeAt < DOUBLE_ESC_MS) setYoshiMode(false);
        lastEscapeAt = event.timeStamp;
      }
    }

    indicatorVisible = true;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(resetInput, IDLE_RESET_MS);
  }

  // After a pause in typing, forget the entered keys and fade the indicator out.
  function resetInput() {
    history = [];
    indicatorVisible = false;
  }

  function setYoshiMode(on) {
    yoshiMode = on;
    playThemeSound(on);
    setTheme(on ? THEME : null);
    if (on) music.play(MUSIC_DELAY_MS);
    else music.stop();

    clearTimeout(hintTimer);
    showEscHint = false;
    if (on) {
      hintTimer = setTimeout(() => {
        showEscHint = true;
        hintTimer = setTimeout(() => (showEscHint = false), HINT_DURATION_MS);
      }, HINT_DELAY_MS);
    }
  }

  function unlock() {
    unlocked = true;
    try {
      localStorage.setItem(UNLOCKED_KEY, '1');
    } catch {
      // Not remembered across visits, but still works now.
    }
  }

  function readUnlocked() {
    try {
      return localStorage.getItem(UNLOCKED_KEY) === '1';
    } catch {
      return false;
    }
  }

  function keyLabel(key) {
    return KEY_LABELS[key] ?? (key.length === 1 ? key.toUpperCase() : key);
  }

  function isTypingIn(target) {
    return target instanceof Element && target.closest('input, textarea, select, [contenteditable]');
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="corner">
  <KeyIndicator {keys} visible={indicatorVisible} />
  {#if showEscHint}
    <EscHint />
  {/if}
  {#if unlocked}
    <YoshiToggle on={yoshiMode} ontoggle={() => setYoshiMode(!yoshiMode)} />
  {/if}
</div>

<style>
  .corner {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    max-width: calc(100vw - 32px);
    pointer-events: none;
  }
</style>
