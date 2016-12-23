const coffeeSprite = require('../assets/coffee.svg');
const deskSprite = require('../assets/desk.svg');
const doorSprite = require('../assets/door.svg');
const justinSprite = require('../assets/justin.svg');
const windowSprite = require('../assets/window.svg');

export const SPRITE_REFERENCES = {
  COFFEE: 'COFFEE',
  DESK: 'DESK',
  DOOR: 'DOOR',
  JUSTIN: 'JUSTIN',
  WINDOW: 'WINDOW',
};

export const SPRITES = {
  [SPRITE_REFERENCES.COFFEE]: coffeeSprite,
  [SPRITE_REFERENCES.DESK]: deskSprite,
  [SPRITE_REFERENCES.DOOR]: doorSprite,
  [SPRITE_REFERENCES.JUSTIN]: justinSprite,
  [SPRITE_REFERENCES.WINDOW]: windowSprite,
};

const spriteCache = {};

class SpriteLoader {
  static load(spriteRefs, onLoad) {
    spriteRefs.forEach((spriteRef) => {
      if (spriteCache[spriteRef] || !SPRITES[spriteRef]) { return; }

      const imgEl = document.createElement('img');

      imgEl.onload = () => {
        spriteCache[spriteRef] = imgEl;

        if (Object.keys(spriteCache).length >= spriteRefs.length) {
          onLoad();
        }
      };

      imgEl.src = SPRITES[spriteRef];
    });
  }

  static getSpriteForReference(spriteRef) {
    return spriteCache[spriteRef];
  }
}

export default SpriteLoader;
