<script>
  import { getSoundSettings, setMuted, setVolume, unlockAudio } from './audio/engine.js';
  import { playUiSound } from './audio/uiSounds.js';

  /**
   * Bottom-left sound control, shown on every page: a mute button plus a small
   * volume slider (revealed on hover / focus on devices with a mouse).
   * Controls the master volume — music, the Yoshi chime and the UI sounds.
   */
  const PREVIEW_GAP_MS = 90;

  let settings = $state(getSoundSettings());
  let lastPreviewAt = 0;

  const shownVolume = $derived(settings.muted ? 0 : settings.volume);
  const silent = $derived(shownVolume === 0);
  const waves = $derived(silent ? 0 : settings.volume < 0.5 ? 1 : 2);

  function handleInput(event) {
    unlockAudio();
    settings.volume = Number(event.target.value);
    settings.muted = false;
    setVolume(settings.volume);

    // A short blip at the new volume, so you can hear what you're choosing.
    if (event.timeStamp - lastPreviewAt > PREVIEW_GAP_MS) {
      lastPreviewAt = event.timeStamp;
      playUiSound('preview');
    }
  }

  function toggleMute() {
    if (silent) {
      if (settings.volume === 0) {
        settings.volume = 0.6;
        setVolume(settings.volume);
      }
      settings.muted = false;
    } else {
      settings.muted = true;
    }
    setMuted(settings.muted);
  }
</script>

<div class="sound-control" style:--fill="{shownVolume * 100}%">
  <button
    type="button"
    class="mute"
    aria-label={silent ? 'Unmute sounds' : 'Mute sounds'}
    title={silent ? 'Unmute sounds' : 'Mute sounds'}
    onclick={toggleMute}
  >
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path class="speaker" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      {#if silent}
        <path class="line" d="M16 9.5l5 5m0-5l-5 5" />
      {:else}
        <path class="line" d="M15.5 9a4 4 0 0 1 0 6" />
        {#if waves > 1}<path class="line" d="M18 6.5a7.5 7.5 0 0 1 0 11" />{/if}
      {/if}
    </svg>
  </button>

  <div class="slider">
    <input
      type="range"
      min="0"
      max="1"
      step="0.05"
      value={shownVolume}
      aria-label="Volume"
      oninput={handleInput}
    />
  </div>
</div>

<style>
  .sound-control {
    position: fixed;
    left: 16px;
    bottom: 16px;
    z-index: 50;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 3px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    box-shadow: 0 8px 20px -10px var(--shadow);
    transition: border-color 0.2s ease;
  }

  .sound-control:hover,
  .sound-control:focus-within {
    border-color: var(--accent);
  }

  .mute {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .mute:hover {
    color: var(--accent);
  }

  .speaker {
    fill: currentColor;
  }

  .line {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
  }

  /* The slider tucks away until the control is hovered or focused. */
  .slider {
    display: flex;
    align-items: center;
    width: 0;
    overflow: hidden;
    transition: width 0.25s ease;
  }

  .sound-control:hover .slider,
  .sound-control:focus-within .slider {
    width: 96px;
  }

  /* Touch screens can't hover, so always show it there. */
  @media (hover: none) {
    .slider {
      width: 96px;
    }
  }

  input[type='range'] {
    appearance: none;
    -webkit-appearance: none;
    width: 80px;
    height: 4px;
    margin: 0 10px 0 4px;
    border-radius: 999px;
    background: linear-gradient(to right, var(--accent) var(--fill), var(--border) var(--fill));
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--text);
  }

  input[type='range']::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--text);
  }
</style>
