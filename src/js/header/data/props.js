// ==== DATA ===================================================================
import { ANIMATION_REFERENCES } from './animations';

export const PROP_REFERENCES = {
  COFFEE: 'COFFEE',
  DESK: 'DESK',
  DOOR: 'DOOR',
  WINDOW: 'WINDOW',
};

export const PROP_DATA = [{
  actions: [{
    animationReference: ANIMATION_REFERENCES.COFFEE,
    reference: ANIMATION_REFERENCES.COFFEE,
  }],
  interactive: true,
  reference: PROP_REFERENCES.COFFEE,
  x: 0.07, // 200 / 3000
  y: 0.24, // 240 / 1000
}, {
  actions: [{
    animationReference: ANIMATION_REFERENCES.DOOR,
    reference: ANIMATION_REFERENCES.DOOR,
  }],
  reference: PROP_REFERENCES.DOOR,
  x: 0.31, // 940 / 3000
  y: 0, // 0 / 1000
}, {
  actions: [{
    animationReference: ANIMATION_REFERENCES.WINDOW,
    reference: ANIMATION_REFERENCES.WINDOW,
  }],
  reference: PROP_REFERENCES.WINDOW,
  x: 0.81, // 2420 / 3000
  y: 0.08, // 80 / 1000
}, {
  actions: [{
    animationReference: ANIMATION_REFERENCES.DESK,
    reference: ANIMATION_REFERENCES.DESK,
  }],
  interactive: true,
  reference: PROP_REFERENCES.DESK,
  x: 0.54, // 1620 / 3000
  y: 0.06, // 60 / 1000
}];
