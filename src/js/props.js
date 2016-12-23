import Animation from './animation';
import { PROP_ANIMATION_DATA } from './animation_data';
import { SPRITE_REFERENCES } from './sprites';

export const PROP_REFERENCES = {
  COFFEE: 'COFFEE',
  DESK: 'DESK',
  DOOR: 'DOOR',
  WINDOW: 'WINDOW',
};

export const PROP_DATA = {
  [PROP_REFERENCES.DOOR]: {
    reference: PROP_REFERENCES.DOOR,
    spriteReference: SPRITE_REFERENCES.DOOR,
    x: 0.31, // 940 / 3000
    y: 0, // 0 / 1000
  },
  [PROP_REFERENCES.COFFEE]: {
    reference: PROP_REFERENCES.COFFEE,
    spriteReference: SPRITE_REFERENCES.COFFEE,
    x: 0.07, // 200 / 3000
    y: 0.24, // 240 / 1000
  },
  [PROP_REFERENCES.WINDOW]: {
    reference: PROP_REFERENCES.WINDOW,
    spriteReference: SPRITE_REFERENCES.WINDOW,
    x: 0.81, // 2420 / 3000
    y: 0.08, // 80 / 1000
  },
  [PROP_REFERENCES.DESK]: {
    reference: PROP_REFERENCES.DESK,
    spriteReference: SPRITE_REFERENCES.DESK,
    x: 0.54, // 1620 / 3000
    y: 0.06, // 60 / 1000
  },
};

class Prop {
  constructor(propData, canvas) {
    this.animation = new Animation([PROP_ANIMATION_DATA[propData.spriteReference]]);
    this.reference = propData.reference;
    this.spriteReference = propData.spriteReference;
    this.started = false;
    this.x = propData.x * canvas.width;
    this.y = propData.y * canvas.height;
  }

  draw(canvasContext) {
    this.animation.play(canvasContext, this.x, this.y);
  }

  isDoorProp() {
    return this.reference === PROP_DATA.DOOR.reference;
  }

  setScale(scaleAmount) {
    this.x *= scaleAmount;
    this.y *= scaleAmount;
  }

  update() {
    if (!this.started) { this.animation.start(); }
  }
}

export default Prop;
