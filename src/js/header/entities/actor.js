// ==== SPRITE HELPERS =========================================================
import { getUnitForAnimation, getAnimationForReference } from '../sprites';

const MAX_DURATION = 8000;
const MIN_DURATION = 3000;

function getRandomDuration() {
  return Math.floor((
    Math.random() * (MAX_DURATION - MIN_DURATION)) + MIN_DURATION);
}

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

export default class Prop {
  constructor({
    animations = [],
    reference = '',
    sprite = '',
    x = 0,
    xScale = 0,
    y = 0,
    yScale = 0,
  } = {}) {
    this.animations = animations || [];
    this.reference = reference;
    this.sprite = sprite;
    this.x = x;
    this.xScale = xScale;
    this.y = y;
    this.yScale = yScale;
    this.animState = this.getInitialAnimState();
  }

  /**
   * getInitialAnimState - Returns an object describing the state of the current
   * animation for the Prop. Includes pointers for animation & parent sequence,
   * as well as elapsed/total duration, and current frame.
   *
   * @returns {Object} currAnimState - The current animation state
   */
  getInitialAnimState(animStateConfig = {}) {
    const reference = animStateConfig.reference || this.getRandomAnimationRef();
    const unitIndex = animStateConfig.unitIndex || 0;
    const animUnit = getUnitForAnimation({ reference, unitIndex });
    const duration = animUnit.duration
      ? animUnit.duration : getRandomDuration();

    return {
      duration,
      elapsed: 0,
      frame: 0,
      reference,
      unitIndex,
      x: this.x,
      y: this.y,
    };
  }

  getNextAnimState(prevAnimState = {}, deltaTime = 0) {
    const {
      duration: prevDuration,
      elapsed: prevElapsed,
      frame: prevFrame,
      reference: prevReference,
      unitIndex: prevUnitIndex,
    } = prevAnimState;

    const currAnimation = getAnimationForReference(prevReference);
    const currAnimUnit = getUnitForAnimation(prevAnimState);
    const elapsed = prevElapsed + deltaTime;
    const frameDuration = Math.round(prevDuration / currAnimUnit.totalFrames);
    const frame =
      Math.floor(elapsed / frameDuration) % currAnimUnit.totalFrames;
    const finishedUnit = (prevFrame + 1) === currAnimUnit.totalFrames
      && frame === 0;

    if (finishedUnit) {
      const shouldAdvanceAnimation = prevUnitIndex + 1 < currAnimation.length;
      const shouldLoop = finishedUnit
        && currAnimUnit.loopable
        && getRandomBoolean();

      if (shouldLoop) {
        return this.getInitialAnimState(prevAnimState);
      } else if (shouldAdvanceAnimation) {
        return this.getInitialAnimState({
          reference: prevReference,
          unitIndex: prevUnitIndex + 1,
        });
      }

      return this.getInitialAnimState();
    }

    return { ...prevAnimState, elapsed, frame };
  }

  getRandomAnimationRef() {
    return this.animations[Math.floor(Math.random() * this.animations.length)];
  }

  update({ deltaTime = 0, scene = {} }) {
    this.animState = this.getNextAnimState(this.animState, deltaTime);
  }
}
