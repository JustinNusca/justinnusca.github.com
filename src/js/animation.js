import SpriteLoader from './sprites';

const MAX_ACTIVITY_DURATION = 8000;
const MIN_ACTIVITY_DURATION = 3000;

class Animation {
  constructor(animations, onAnimationEnd) {
    this.animations = animations;
    this.onAnimationEnd = onAnimationEnd;
  }

  drawFlippedFrame(
    canvasContext,
    offsetX,
    offsetY,
    offsetWidth,
    offsetHeight,
    xPosition,
    yPosition,
    drawWidth,
    drawHeight,
  ) {
    canvasContext.save();
    canvasContext.translate(canvasContext.canvas.width, 0);
    canvasContext.scale(-1, 1);

    canvasContext.drawImage(
      this.spriteAsset,
      offsetX,
      offsetY,
      offsetWidth,
      offsetHeight,
      xPosition,
      yPosition,
      drawWidth,
      drawHeight,
    );
    canvasContext.restore();
  }

  drawFrame(
    canvasContext,
    offsetX,
    offsetY,
    offsetWidth,
    offsetHeight,
    xPosition,
    yPosition,
    drawWidth,
    drawHeight,
  ) {
    canvasContext.drawImage(
      this.spriteAsset,
      offsetX,
      offsetY,
      offsetWidth,
      offsetHeight,
      xPosition,
      yPosition,
      drawWidth,
      drawHeight,
    );
  }

  static getRandomDuration() {
    return Math.floor((
      Math.random() * (MAX_ACTIVITY_DURATION - MIN_ACTIVITY_DURATION)
    ) + MIN_ACTIVITY_DURATION);
  }

  getCurrAnimDuration() {
    if (this.duration) { return this.duration; }

    const currAnim = this.animations[this.currAnimIndex];

    return currAnim.looping
      ? this.getRandomDuration()
      : (1000 / 60) * currAnim.totalFrames * currAnim.frameRate;
  }

  getDrawHeight(canvasContext) {
    const currAnim = this.animations[this.currAnimIndex];

    return canvasContext.canvas.height / currAnim.yScale;
  }

  incrementFrame() {
    const currAnim = this.animations[this.currAnimIndex];

    if (this.frameCount + 1 === currAnim.frameRate) {
      this.currFrame = (this.currFrame + 1) % currAnim.totalFrames;
    }

    this.frameCount = (this.frameCount + 1) % currAnim.frameRate;
  }

  play(canvasContext, xPosition, yPosition, facingRight) {
    const currAnim = this.animations[this.currAnimIndex];

    const drawWidth = canvasContext.canvas.width / currAnim.xScale;
    const drawHeight = canvasContext.canvas.height / currAnim.yScale;

    const offsetHeight = this.spriteAsset.height / currAnim.totalRows;
    const offsetWidth = this.spriteAsset.width / currAnim.totalCols;
    const offsetX = offsetWidth * this.currFrame;
    const offsetY = offsetHeight * currAnim.spriteRow;

    if (!facingRight && currAnim.flippable) {
      const inverseXPosition = (drawWidth * (currAnim.xScale - 1)) - xPosition;
      this.drawFlippedFrame(
        canvasContext,
        offsetX,
        offsetY,
        offsetWidth,
        offsetHeight,
        inverseXPosition,
        yPosition,
        drawWidth,
        drawHeight,
      );
    } else {
      this.drawFrame(
        canvasContext,
        offsetX,
        offsetY,
        offsetWidth,
        offsetHeight,
        xPosition,
        yPosition,
        drawWidth,
        drawHeight,
      );
    }

    this.incrementFrame();
  }

  progress() {
    const nextAnimationIndex = this.currAnimIndex + 1;
    clearTimeout(this.animTimer);

    if (nextAnimationIndex >= this.animations.length && this.onAnimationEnd) {
      this.animTimer = null;
      this.onAnimationEnd();
    } else {
      this.setCurrAnim(nextAnimationIndex);
    }
  }

  setCurrAnim(index = 0) {
    const currAnim = this.animations[index];

    this.currAnimIndex = index;
    this.currFrame = 0;
    this.frameCount = 0;
    this.spriteAsset =
      SpriteLoader.getSpriteForReference(currAnim.spriteReference);

    if (!currAnim.static) {
      this.duration = this.getCurrAnimDuration();
      this.setAnimTimer(this.duration);
    }
  }

  setAnimTimer(duration) {
    this.animTimer = setTimeout(() => {
      this.progress();
    }, duration);
  }

  start() { this.setCurrAnim(0); }

  stop() { clearTimeout(this.animTimer); }
}

export default Animation;
