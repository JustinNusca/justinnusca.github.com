// ==== DATA ===================================================================
import { ANIMATION_REFERENCES } from './animations';
import { PROP_REFERENCES } from './props';

export const ACTOR_REFERENCES = { JUSTIN: 'JUSTIN' };

export const ACTOR_DATA = [{
  alive: true,
  actions: [{
    animationReference: ANIMATION_REFERENCES.JUSTIN_COFFEE,
    propReference: PROP_REFERENCES.COFFEE,
    reference: ANIMATION_REFERENCES.JUSTIN_COFFEE,
  }, {
    animationReference: ANIMATION_REFERENCES.JUSTIN_DESK,
    propReference: PROP_REFERENCES.DESK,
    reference: ANIMATION_REFERENCES.JUSTIN_DESK,
  }, {
    animationReference: ANIMATION_REFERENCES.JUSTIN_PHONE,
    reference: ANIMATION_REFERENCES.JUSTIN_PHONE,
  }, {
    animationReference: ANIMATION_REFERENCES.JUSTIN_STAND,
    reference: ANIMATION_REFERENCES.JUSTIN_STAND,
  }, {
    animationReference: ANIMATION_REFERENCES.JUSTIN_WALK,
    reference: ANIMATION_REFERENCES.JUSTIN_WALK,
  }],
  moveSpeed: 0.001,
  reference: ACTOR_REFERENCES.JUSTIN,
  x: 0.31, // 940 / 3000,
  xScale: 0.1, // 400 / 4000
  y: 0.02, // 20 / 1000
  yScale: 0.98, // 980 / 1000
}];
