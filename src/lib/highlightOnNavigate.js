/**
 * When an in-page link (href="#section") is clicked, briefly highlight the
 * target section once the smooth scroll has settled, so it's clear where you
 * landed. The look of the highlight lives in app.css under `.flash`.
 *
 * Usage: <svelte:document onclick={highlightOnNavigate} />
 */
import { playUiSound } from './audio/uiSounds.js';

const FLASH_CLASS = 'flash';
const FLASH_DURATION_MS = 1800; // keep in sync with the animation in app.css
const SCROLL_SETTLE_MS = 120; // quiet time after the last scroll event

const timers = new WeakMap();

export function highlightOnNavigate(event) {
  const link = event.target.closest('a[href^="#"]');
  const id = link?.getAttribute('href').slice(1);
  if (!id || id === 'top') return;

  const target = document.getElementById(id);
  if (target) afterScrollSettles(() => flash(target));
}

// Resolves once no scroll event has fired for SCROLL_SETTLE_MS
// (or almost immediately if the page doesn't need to scroll at all).
function afterScrollSettles(callback) {
  let timer;
  const done = () => {
    window.removeEventListener('scroll', reset);
    callback();
  };
  const reset = () => {
    clearTimeout(timer);
    timer = setTimeout(done, SCROLL_SETTLE_MS);
  };
  window.addEventListener('scroll', reset, { passive: true });
  reset();
}

function flash(el) {
  clearTimeout(timers.get(el));
  el.classList.remove(FLASH_CLASS);
  void el.offsetWidth; // force a reflow so the animation restarts if it's already running
  el.classList.add(FLASH_CLASS);
  playUiSound('arrive');
  timers.set(
    el,
    setTimeout(() => el.classList.remove(FLASH_CLASS), FLASH_DURATION_MS),
  );
}
