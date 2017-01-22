class DomAnimationElement {
  constructor(element) {
    this.animClass = element.getAttribute('data-anim-name');
    this.direction = element.getAttribute('data-anim-direction');
    this.element = element;
    this.originY = element.offsetTop;
    this.type = element.getAttribute('data-anim-type');
  }

  addClass() {
    if (this.hasClass()) { return; }
    this.element.classList.add(this.animClass);
  }

  handleClass(triggered) {
    if (triggered) {
      this.addClass();
    } else if (this.type === 'toggle' && this.hasClass()) {
      this.removeClass();
    }
  }

  animate() {
    if (this.direction === 'in') {
      this.handleClass(this.scrolledIn());
    } else {
      this.handleClass(this.scrolledOut());
    }
  }

  removeClass() {
    this.element.classList.remove(this.animClass);
  }

  hasClass() {
    return this.element.classList.contains(this.animClass);
  }

  resetOffsetY() {
    this.removeClass();
    this.originY = this.element.offsetTop;
    this.animate();
  }

  scrolledIn() {
    const viewTop = window.pageYOffset;
    const viewBottom = viewTop + window.innerHeight;

    return this.originY <= viewBottom;
  }

  scrolledOut() {
    const viewTop = window.pageYOffset;

    return this.originY <= viewTop;
  }

  toggleClass() {
    if (this.hasClass()) {
      this.removeClass();
    } else {
      this.addClass();
    }
  }
}

const domAnimationCache = [];

class DomAnimManager {
  static init() {
    if (document.readyState in ['interactive', 'complete']) {
      this.start();
    } else {
      document.addEventListener('DOMContentLoaded', () => this.start());
    }
  }

  static resetOffsets() {
    domAnimationCache.forEach(element => requestAnimationFrame(() => element.resetOffsetY()));
  }

  static scrollCallback() {
    if (this.scrolled) {
      this.scrolled = false;
      domAnimationCache.forEach(element => requestAnimationFrame(() => element.animate()));
    }
  }

  static scrollHandler() {
    this.scrolled = true;
  }

  static start() {
    const elements = document.querySelectorAll('[data-anim-name]');
    Array.from(elements).forEach(element =>
      domAnimationCache.push(new DomAnimationElement(element)));

    window.addEventListener('scroll', () => this.scrollHandler());
    window.addEventListener('resize', () => {
      this.scrollHandler();
      this.resetOffsets();
    });

    this.scrolled = true;
    this.interval = setInterval(() => {
      this.scrollCallback();
    }, 50);
  }
}

export default DomAnimManager;
