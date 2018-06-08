const NAME_ATTRIBUTE = 'data-anim-name';
const TOGGLE_TYPE = 'toggle';
const TYPE_ATTRIBUTE = 'data-anim-type';

export function hasClassName(element = {}, className = '') {
  return element.classList.contains(className);
}

export function addClassName(element = {}, className = '') {
  if (hasClassName(element, className)) { return; }
  element.classList.add(className);
}

export function removeClassName(element = {}, className = '') {
  element.classList.remove(className);
}

export function scrolledIn(element = {}) {
  const elTop = element.offsetTop;
  const elBottom = elTop + element.offsetHeight;
  const viewTop = window.pageYOffset;
  const viewBottom = viewTop + window.innerHeight;

  return elTop <= viewBottom && elBottom >= viewTop;
}

export function scrolledOut(element = {}) {
  return element.offsetTop <= window.pageYOffset;
}

export function handleScroll(element = {}) {
  const animClassName = element.getAttribute(NAME_ATTRIBUTE);
  const animType = element.getAttribute(TYPE_ATTRIBUTE);
  const didScrollIn = scrolledIn(element);
  const hasClass = hasClassName(element, animClassName);
  const shouldAdd = didScrollIn && !hasClass;
  const shouldRemove = animType === TOGGLE_TYPE && hasClass && !didScrollIn;

  if (shouldAdd) {
    addClassName(element, animClassName);
  } else if (shouldRemove) {
    removeClassName(element, animClassName);
  }
}
