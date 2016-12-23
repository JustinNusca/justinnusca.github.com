import Animation from './animation';
import { ACTOR_ANIMATION_DATA, ANIMATION_SEQUENCES } from './animation_data';
import { PROP_DATA } from './props';
import { SPRITE_REFERENCES } from './sprites';

const ACTIVITIES = [ACTOR_ANIMATION_DATA.STAND.reference, 'IDLE', PROP_DATA.COFFEE.reference, PROP_DATA.DESK.reference];

class Justin {
  constructor(canvas) {
    this.activityStarted = false;
    this.enteredScene = false;
    this.facingRight = true;
    this.inTransit = false;
    this.moveSpeed = canvas.width / 400;
    this.spriteReference = SPRITE_REFERENCES.JUSTIN;
    this.x = canvas.width / 2;
    this.xScale = 0.1; // 400 / 4000
    this.y = 0.02; // 20 / 1000
    this.yScale = 0.98; // 980 / 1000
    this.maxX = canvas.width - (this.xScale * 2);
    this.minX = this.xScale;
  }

  atActivityLocation() {
    return this.activityLocation === this.x;
  }

  chooseActivity(deltaTime, props) {
    const nextActivityIndex = Math.floor(Math.random() * (ACTIVITIES.length));
    const nonPropActivities = [ACTOR_ANIMATION_DATA.STAND.reference, 'IDLE'];
    const requiresProp = nonPropActivities.indexOf(ACTIVITIES[nextActivityIndex]) < 0;

    if (requiresProp) {
      const activityProp = props.find(prop => prop.reference === ACTIVITIES[nextActivityIndex]);

      this.setActivity(activityProp.reference, activityProp.x, nextActivityIndex);
    } else {
      this.setActivity(ACTIVITIES[nextActivityIndex], this.randomXPosition, nextActivityIndex);
    }
  }

  draw(canvasContext) {
    if (!this.enteredScene) { return; }
    const yPosition = canvasContext.canvas.height - this.animation.getDrawHeight(canvasContext);

    this.animation.play(canvasContext, this.x, yPosition, this.facingRight);
  }

  enterScene(props) {
    if (this.enteredScene) { return; }

    const doorProp = props.find(prop => prop.isDoorProp());

    if (doorProp) {
      const doorPropIndex = props.indexOf(doorProp);

      this.enteredScene = true;
      this.x = doorProp.x;
      this.setActivity(doorProp.reference, doorProp.x, doorPropIndex);
    }
  }

  updateAnimation() {
    const animReference = this.animationReference;

    if (this.animation) { this.animation.stop(); }

    this.animation = new Animation(ANIMATION_SEQUENCES[animReference], () => {
      this.setActivity();
    });
    this.animation.start();
  }

  moveToActivity(deltaTime) {
    if (!this.enteredScene || !this.activityLocation) { return; }

    const facingRight = this.activityLocation - this.x > 0;
    const translateAmount = this.moveSpeed * deltaTime;
    const newPosition = facingRight ?
      Math.min(this.x + translateAmount, this.activityLocation) :
      Math.max(this.x - translateAmount, this.activityLocation);

    this.facingRight = facingRight;
    this.x = newPosition;
  }

  setActivity(reference, location, propIndex) {
    this.activityLocation = location;
    this.activityReference = reference;
    this.activityPropIndex = propIndex;
    this.activityStarted = this.atActivityLocation();
    this.inTransit = this.activityLocation && !this.activityStarted;

    this.updateAnimation();
  }

  setScale(scaleAmount) {
    this.activityLocation = this.activityLocation ? this.activityLocation * scaleAmount : null;
    this.maxX *= scaleAmount;
    this.minX *= scaleAmount;
    this.moveSpeed *= scaleAmount;
    this.x *= scaleAmount;
    this.y *= scaleAmount;
  }

  startActivity() {
    if (!this.activityStarted) {
      this.activityStarted = true;
      this.inTransit = false;
      this.updateAnimation();
    }
  }

  update(deltaTime, props) {
    if (this.atActivityLocation()) {
      this.startActivity();
    } else if (this.inTransit) {
      this.moveToActivity(deltaTime);
    } else if (this.enteredScene) {
      this.chooseActivity(deltaTime, props);
    } else {
      this.enterScene(props);
    }
  }

  get animationReference() {
    if (this.atActivityLocation()) {
      return this.activityReference;
    }

    return this.inTransit ?
      ACTOR_ANIMATION_DATA.WALK.reference : ACTOR_ANIMATION_DATA.STAND.reference;
  }

  get randomXPosition() {
    const newX = Math.floor((Math.random() * (this.maxX - this.minX)) + this.minX);

    if (newX >= this.x) {
      const minX = this.x + this.minX;
      return Math.floor((Math.random() * (this.maxX - minX)) + minX);
    }

    const maxX = this.x - this.minX;
    return Math.floor((Math.random() * (maxX - this.minX)) + this.minX);
  }
}

export default Justin;
