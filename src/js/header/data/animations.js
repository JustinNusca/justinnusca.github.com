// ==== DATA ===================================================================
import { SPRITE_REFERENCES } from './sprites';

/**
 * getWindowAnimationDataForTime - Returns a specific spriteRow from the
 * window sprite to draw from, based on the time of day (according to Date).
 *
 * @returns {Object} propAnimationData - spriteRow and totalFrames for anim
 */
function getWindowAnimationDataForTime() {
  const currHour = new Date().getHours();

  if (currHour > 6 && currHour < 16) {
    return { spriteRow: 0, totalFrames: 1 };
  } else if (currHour > 6 && currHour < 19) {
    return { spriteRow: 1, totalFrames: 4 };
  }

  return { spriteRow: 2, totalFrames: 4 };
}

export const ANIMATION_REFERENCES = {
  COFFEE: 'COFFEE',
  DESK: 'DESK',
  DOOR: 'DOOR',
  JUSTIN_COFFEE: 'JUSTIN_COFFEE',
  JUSTIN_DESK: 'JUSTIN_DESK',
  JUSTIN_DOOR: 'JUSTIN_DOOR',
  JUSTIN_PHONE: 'JUSTIN_PHONE',
  JUSTIN_STAND: 'JUSTIN_STAND',
  JUSTIN_WALK: 'JUSTIN_WALK',
  WINDOW: 'WINDOW',
};

export const ANIMATION_DATA = {
  [ANIMATION_REFERENCES.COFFEE]: [{
    duration: 1500,
    spriteReference: SPRITE_REFERENCES.COFFEE,
    spriteRow: 0,
    totalCols: 3,
    totalFrames: 3,
    totalRows: 1,
    xScale: 0.15, // 460 / 3000
    yScale: 0.76, // 760 / 1000
  }],
  [ANIMATION_REFERENCES.DESK]: [{
    duration: 1,
    spriteRow: 0,
    spriteReference: SPRITE_REFERENCES.DESK,
    totalCols: 4,
    totalFrames: 1,
    totalRows: 2,
    xScale: 0.3, // 900 / 3000
    yScale: 0.94, // 940 / 1000
  }],
  [ANIMATION_REFERENCES.DOOR]: [{
    duration: 1,
    spriteReference: SPRITE_REFERENCES.DOOR,
    spriteRow: 0,
    totalCols: 11,
    totalFrames: 1,
    totalRows: 1,
    xScale: 0.19, // 560 / 3000
    yScale: 1, // 1000 / 1000
  }],
  [ANIMATION_REFERENCES.JUSTIN_COFFEE]: [{
    duration: 2000,
    loopable: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    spriteRow: 3,
    totalCols: 9,
    totalFrames: 9,
    totalRows: 6,
    xScale: 0.13, // 400 / 3000
    yScale: 0.98, // 980 / 1000
  }],
  [ANIMATION_REFERENCES.JUSTIN_DESK]: [{
    duration: 850,
    loopable: true,
    spriteReference: SPRITE_REFERENCES.DESK,
    spriteRow: 1,
    totalCols: 4,
    totalFrames: 4,
    totalRows: 2,
    xScale: 0.3, // 900 / 3000
    yScale: 0.94, // 940 / 1000
  }],
  [ANIMATION_REFERENCES.JUSTIN_DOOR]: [{
    duration: 1800,
    spriteReference: SPRITE_REFERENCES.DOOR,
    spriteRow: 0,
    totalCols: 11,
    totalFrames: 11,
    totalRows: 1,
    xScale: 0.19, // 560 / 3000
    yScale: 1, // 1000 / 1000
  }],
  [ANIMATION_REFERENCES.JUSTIN_PHONE]: [{
    duration: 1000,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    spriteRow: 2,
    totalCols: 9,
    totalFrames: 7,
    totalRows: 6,
    xScale: 0.13, // 400 / 3000
    yScale: 0.98, // 980 / 1000
  }, {
    duration: 5000,
    loopable: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    spriteRow: 4,
    totalCols: 9,
    totalFrames: 8,
    totalRows: 6,
    xScale: 0.13, // 400 / 3000
    yScale: 0.98, // 980 / 1000
  }, {
    duration: 1000,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    spriteRow: 5,
    totalCols: 9,
    totalFrames: 7,
    totalRows: 6,
    xScale: 0.13, // 400 / 3000
    yScale: 0.98, // 980 / 1000
  }],
  [ANIMATION_REFERENCES.JUSTIN_STAND]: [{
    duration: 2000,
    loopable: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    spriteRow: 0,
    totalCols: 9,
    totalFrames: 4,
    totalRows: 6,
    xScale: 0.13, // 400 / 3000
    yScale: 0.98, // 980 / 1000
  }],
  [ANIMATION_REFERENCES.JUSTIN_WALK]: [{
    duration: 1000,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    spriteRow: 1,
    totalCols: 9,
    totalFrames: 7,
    totalRows: 6,
    xScale: 0.13, // 400 / 3000
    yScale: 0.98, // 980 / 1000
  }],
  [ANIMATION_REFERENCES.WINDOW]: [{
    duration: 5000,
    spriteReference: SPRITE_REFERENCES.WINDOW,
    totalCols: 4,
    totalRows: 3,
    xScale: 0.17, // 520 / 3000
    yScale: 0.5, // 500 / 1000
    ...getWindowAnimationDataForTime(),
  }],
};
