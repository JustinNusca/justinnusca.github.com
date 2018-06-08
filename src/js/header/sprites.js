// ==== DATA ===================================================================
import { ANIMATION_DATA } from './data/animations';
import { SPRITE_DATA, SPRITE_REFERENCES } from './data/sprites';

const cache = {};

export function getSpriteForReference(reference = '') {
  return cache[reference];
}

export function getAnimationForReference(reference = '') {
  return ANIMATION_DATA[reference];
}

/**
 * getUnitForAnimation - Returns the current animation unit
 * for a given animation state.
 *
 * @param   {String} options.reference - Reference value for an Animation
 * @param   {Number} options.unitIndex - Index of unit in an Animation
 * @returns {Object} animationUnit     - An Animation's Unit
 */
export function getUnitForAnimation({ reference = '', unitIndex = 0 }) {
  const animation = ANIMATION_DATA[reference];
  return animation[unitIndex];
}

/**
 * getSpritesForAnimation - Given a list of animation references,
 * returns an array of sprite data objects for each animation.
 *
 * @param  {Array} animationReferences - Array of animation references
 * @return {Array} sprites             - Array of sprites
 */
function getSpritesForAnimation(animationReferences = []) {
  return animationReferences
    .map(animationReference => ANIMATION_DATA[animationReference])
    .reduce((sprites = [], animation = []) => {
      const animationSprites = animation
        .map(({ spriteReference }) => SPRITE_DATA[spriteReference])
        .filter(animationSprite => !sprites.find(sprite =>
          sprite.reference === animationSprite.reference));

      return [...sprites, ...animationSprites];
    }, []);
}

export function drawRenderable(canvasContext = {}, renderableState = {}) {
  const animUnit = getUnitForAnimation(renderableState);
  const sprite = getSpriteForReference(animUnit.spriteReference);
  const drawHeight = animUnit.yScale * canvasContext.canvas.height;
  const drawWidth = animUnit.xScale * canvasContext.canvas.width;
  const offsetHeight = sprite.height / animUnit.totalRows;
  const offsetWidth = sprite.width / animUnit.totalCols;
  const offsetX = offsetWidth * renderableState.frame;
  const offsetY = offsetHeight * animUnit.spriteRow;
  const positionX = renderableState.drawFlipped
    ? (drawWidth * (animUnit.xScale - 1)) -
      (renderableState.x * canvasContext.canvas.width)
    : renderableState.x * canvasContext.canvas.width;
  const positionY = renderableState.y * canvasContext.canvas.height;

  if (renderableState.drawFlipped) {
    canvasContext.save();
    canvasContext.translate(canvasContext.canvas.width, 0);
    canvasContext.scale(-1, 1);
  }

  canvasContext.drawImage(
    sprite,
    offsetX,
    offsetY,
    offsetWidth,
    offsetHeight,
    positionX,
    positionY,
    drawWidth,
    drawHeight,
  );

  if (renderableState.drawFlipped) {
    canvasContext.restore();
  }
}

/**
 * getSpriteLoadPromise - For a given sprite, returns a promise that resolves
 * when its given asset is loaded. It will resolve immediately if the asset
 * already exists in the cache (ie, it has been loaded).
 *
 * @param   {String}  sprite.asset     - URL for sprite asset.
 * @param   {String}  sprite.reference - Reference value for asset.
 * @returns {Promise}                  - Resolves on image load.
 */
function getSpriteLoadPromise({ asset = '', reference = '' }) {
  return new Promise((resolve, reject) => {
    if (cache[reference]) {
      resolve();
      return;
    }

    if (!SPRITE_REFERENCES[reference]) {
      reject(new Error(`No Sprite exists with Reference: ${reference}`));
      return;
    }

    const imgEl = document.createElement('img');

    cache[reference] = imgEl;
    imgEl.onload = resolve;
    imgEl.src = asset;
  });
}

/**
 * loadRenderable - Creates img elements for all of a renderable's
 * animations; returns an array of promises that resolve on image load.
 *
 * @param   {Array} animationReferences - Array of animation references
 * @returns {Array} spritePromises      - Array of sprite loading promises
 */
export function loadRenderable(animationReferences = []) {
  const sprites = getSpritesForAnimation(animationReferences);

  return sprites.map(getSpriteLoadPromise);
}
