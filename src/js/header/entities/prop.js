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
    alive = false,
    actions = [],
    interactive = false,
    moveSpeed = 0,
    reference = '',
    x = 0,
    xScale = 0,
    y = 0,
    yScale = 0,
  } = {}) {
    this.alive = alive;
    this.actions = actions;
    this.animState = this.getInitialAnimState();
    this.interactive = interactive;
    this.moveSpeed = moveSpeed;
    this.reference = reference;
    this.x = x;
    this.xScale = xScale;
    this.y = y;
    this.yScale = yScale;
  }

  /**
   * getInitialAnimState - Returns an object describing the state of the current
   * animation for the Prop. Includes pointers for animation & parent sequence,
   * as well as elapsed/total duration, and current frame.
   *
   * @returns {Object} currAnimState - The current animation state
   */
  getInitialAnimState(animStateConfig = {}) {
    const reference =
      animStateConfig.reference
      || Prop.getRandomAction(this.actions).animationReference;
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

  /**
   * getNextActivity — Given the current scene (with list of available props),
   * and the list of actions available to the actor, returns
   * a randomized action reference.
   *
   * @param   {Array}  actions - List of Prop's actions
   * @param   {Array}  availableProps - List of Props available in scene
   * @returns {Object} options - The next planned action reference & location
   */
  static getNextActivity(actions = [], availableProps = []) {
    const propReferences = availableProps.map(prop => prop.reference);
    const accessibleActions = actions.filter(({ propReference }) => (
      propReference ? propReferences.includes(propReference) : true
    ));

    const nextActivity = Prop.getRandomAction(accessibleActions);
    const destinationProp = availableProps
      .find(({ reference }) => reference === nextActivity.propReference);

    return {
      nextActivity,
      nextDestination: destinationProp ? destinationProp.x : this.x,
    };
  }

  /**
   * getRandomAction - Returns a random item from an array.
   * @param  {Array}  actions - An array
   * @return {}       item    - An item from the array
   */
  static getRandomAction(actions = []) {
    return actions[Math.floor(Math.random() * actions.length)];
  }

  updateLocation(deltaTime = 0) {
    const isFacingRight = this.nextDestination - this.x > 0;
    const translateAmount = this.moveSpeed ? this.moveSpeed * deltaTime : 0;
    const nextPosition = isFacingRight
      ? Math.min(this.x + translateAmount, this.nextDestination)
      : Math.max(this.x - translateAmount, this.nextDestination);

    this.shouldFlip = !isFacingRight;
    this.x = nextPosition;
  }

  update({ deltaTime = 0, scene = {} }) {
    // if (this.alive) {
    //   if (!this.nextActivity) {
    //     const { nextActivity, nextDestination } =
    //       Prop.getNextActivity(this.actions, scene.interactiveProps);
    //     this.nextActivity = nextActivity;
    //     this.nextDestination = nextDestination;
    //   } else if (this.nextActivity && this.nextDestination) {
    //     this.updateLocation(deltaTime);
    //   }
    // }

    // if (this.atActivityLocation()) {
    //   this.startActivity();
    // } else if (this.inTransit) {
    //   this.moveToActivity(deltaTime);
    // } else if (this.enteredScene) {
    //   this.chooseActivity(deltaTime, props);
    // } else {
    //   this.enterScene(props);
    // }

    this.animState = this.getNextAnimState(this.animState, deltaTime);
  }
}
