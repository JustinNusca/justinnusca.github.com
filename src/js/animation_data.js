import { SPRITE_REFERENCES } from './sprites';

const getWindowAnimationDataForTime = function getWindowAnimationDataForTime() {
  const currHour = new Date().getHours();

  if (currHour > 6 && currHour < 16) {
    return { spriteRow: 0, totalFrames: 1 };
  } else if (currHour > 6 && currHour < 19) {
    return { spriteRow: 1, totalFrames: 4 };
  }

  return { spriteRow: 2, totalFrames: 4 };
};

export const ACTOR_ANIMATION_DATA = {
  COFFEE: {
    flippable: true,
    frameRate: 10,
    looping: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    reference: 'COFFEE',
    spriteRow: 3,
    totalCols: 9,
    totalFrames: 9,
    totalRows: 6,
    xScale: 7.5, // 3000 / 400
    yScale: 1.02, // 1000 / 980
  },
  DESK: {
    frameRate: 10,
    looping: true,
    spriteReference: SPRITE_REFERENCES.DESK,
    reference: 'DESK',
    spriteRow: 1,
    totalCols: 4,
    totalFrames: 4,
    totalRows: 2,
    xScale: 3.33, // 3000 / 900
    yScale: 1.06, // 1000 / 940
  },
  DOOR: {
    frameRate: 8,
    spriteReference: SPRITE_REFERENCES.DOOR,
    reference: 'DOOR',
    spriteRow: 0,
    totalCols: 11,
    totalFrames: 11,
    totalRows: 1,
    xScale: 5.36, // 3000 / 560
    yScale: 1, // 1000 / 1000
  },
  IDLE_START: {
    flippable: true,
    frameRate: 10,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    reference: 'IDLE_START',
    spriteRow: 2,
    totalCols: 9,
    totalFrames: 7,
    totalRows: 6,
    xScale: 7.5, // 3000 / 400
    yScale: 1.02, // 1000 / 980
  },
  IDLE_ACTIVE: {
    flippable: true,
    frameRate: 30,
    looping: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    reference: 'IDLE_ACTIVE',
    spriteRow: 4,
    totalCols: 9,
    totalFrames: 8,
    totalRows: 6,
    xScale: 7.5, // 3000 / 400
    yScale: 1.02, // 1000 / 980
  },
  IDLE_END: {
    flippable: true,
    frameRate: 10,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    reference: 'IDLE_END',
    spriteRow: 5,
    totalCols: 9,
    totalFrames: 7,
    totalRows: 6,
    xScale: 7.5, // 3000 / 400
    yScale: 1.02, // 1000 / 980
  },
  STAND: {
    flippable: true,
    frameRate: 20,
    looping: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    reference: 'STAND',
    spriteRow: 0,
    totalCols: 9,
    totalFrames: 4,
    totalRows: 6,
    xScale: 7.5, // 3000 / 400
    yScale: 1.02, // 1000 / 980
  },
  WALK: {
    duration: 20000,
    flippable: true,
    frameRate: 8,
    looping: true,
    spriteReference: SPRITE_REFERENCES.JUSTIN,
    reference: 'WALK',
    spriteRow: 1,
    totalCols: 9,
    totalFrames: 7,
    totalRows: 6,
    xScale: 7.5, // 3000 / 400
    yScale: 1.02, // 1000 / 980
  },
};

export const PROP_ANIMATION_DATA = {
  COFFEE: {
    frameRate: 26,
    reference: 'COFFEE',
    spriteReference: SPRITE_REFERENCES.COFFEE,
    spriteRow: 0,
    static: true,
    totalCols: 3,
    totalFrames: 3,
    totalRows: 1,
    xScale: 6.52, // 3000 / 460
    yScale: 1.32, // 1000 / 760
  },
  DESK: {
    frameRate: 1,
    reference: 'DESK',
    spriteReference: SPRITE_REFERENCES.DESK,
    spriteRow: 0,
    static: true,
    totalCols: 4,
    totalFrames: 1,
    totalRows: 2,
    xScale: 3.33, // 3000 / 900
    yScale: 1.06, // 1000 / 940
  },
  DOOR: {
    frameRate: 1,
    reference: 'DOOR',
    spriteReference: SPRITE_REFERENCES.DOOR,
    spriteRow: 0,
    static: true,
    totalCols: 11,
    totalFrames: 1,
    totalRows: 1,
    xScale: 5.36, // 3000 / 560
    yScale: 1, // 1000 / 1000
  },
  WINDOW: Object.assign({
    frameRate: 100,
    reference: 'WINDOW',
    spriteReference: SPRITE_REFERENCES.WINDOW,
    static: true,
    totalCols: 4,
    totalRows: 3,
    xScale: 5.77, // 3000 / 520
    yScale: 2, // 1000 / 500
  }, getWindowAnimationDataForTime()),
};

export const ANIMATION_SEQUENCES = {
  COFFEE: [ACTOR_ANIMATION_DATA.COFFEE],
  DESK: [ACTOR_ANIMATION_DATA.DESK],
  DOOR: [ACTOR_ANIMATION_DATA.DOOR],
  IDLE: [
    ACTOR_ANIMATION_DATA.IDLE_START,
    ACTOR_ANIMATION_DATA.IDLE_ACTIVE,
    ACTOR_ANIMATION_DATA.IDLE_END,
  ],
  STAND: [ACTOR_ANIMATION_DATA.STAND],
  WALK: [ACTOR_ANIMATION_DATA.WALK],
};
