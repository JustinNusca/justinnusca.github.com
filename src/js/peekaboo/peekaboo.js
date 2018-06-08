import { handleScroll } from './animate';

let animElementsCache = [];
let interval = null;
let scrolled = false;
let started = false;

export function setScrolled(value = true) {
  scrolled = value;
}

export const EVENT_HANDLERS = [{ event: 'scroll', handler: setScrolled }];

export function getInterval() {
  return interval;
}

export function isScrolled() {
  return scrolled;
}

/**
 * onScroll - Resets scroll marker and iterates through
 * each animElement, and checks it with shouldAnimate.
 * @returns {void}
 */
export function onScroll() {
  if (scrolled) {
    scrolled = false;
    animElementsCache.forEach((animElement) => {
      requestAnimationFrame(() => { handleScroll(animElement); });
    });
  }
}

/**
 * assignEventListeners - Adds event listeners for Scrolling and
 * Resizing events, an interval for debouncing events.
 * @param   {Array} events - array of event name and associated handlers.
 * @returns {void}
 */
function assignEventListeners(events = []) {
  if (started) { return; }
  started = true;
  scrolled = true;

  events.forEach(({ event, handler }) => {
    window.addEventListener(event, handler);
  });

  interval = setInterval(() => {
    onScroll();
  }, 50);
}

/**
 * removeEventListeners - Removes listeners for given events,
 * and clears interval.
 * @param   {Array} events - array of event name and associated handlers.
 * @returns {void}
 */
function removeEventListeners(events = []) {
  events.forEach(({ event, handler }) => {
    window.removeEventListener(event, handler);
  });

  clearInterval(interval);

  interval = null;
  scrolled = false;
  started = false;
}

/**
 * getAnimationElements - Gets elements with matching attr and returns array.
 * @returns {Array} - An array of matching elements.
 */
function getAnimationElements() {
  return Array.from(document.querySelectorAll('[data-anim-name]'));
}

/**
 * init - Wrapper function for calling getAnimationElements and
 * assignEventListeners. Called by start or via readystatechange handler.
 * @returns {void}
 */
function init() {
  assignEventListeners(EVENT_HANDLERS);
  animElementsCache = getAnimationElements();
  window.animEls = animElementsCache;
}

/**
 * start - Starts Peekaboo when page is ready.
 * @returns {void}
 */
export function start() {
  if (started) {
    return;
  } else if (document.readyState === 'complete') {
    init();
    return;
  }

  document.onreadystatechange = () => {
    document.onreadystatechange = null;
    start();
  };
}

/**
 * reset - Removes all eventListeners, timers, and cached elements.
 * @returns {void}
 */
export function reset() {
  if (!started) { return; }

  removeEventListeners(EVENT_HANDLERS);

  animElementsCache = [];
}
