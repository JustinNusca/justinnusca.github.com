// ==== ASSETS =================================================================
import coffeeSprite from '../../../assets/coffee.svg';
import deskSprite from '../../../assets/desk.svg';
import doorSprite from '../../../assets/door.svg';
import justinSprite from '../../../assets/justin.svg';
import windowSprite from '../../../assets/window.svg';

export const SPRITE_REFERENCES = {
  COFFEE: 'COFFEE',
  DESK: 'DESK',
  DOOR: 'DOOR',
  JUSTIN: 'JUSTIN',
  WINDOW: 'WINDOW',
};

export const SPRITE_DATA = {
  [SPRITE_REFERENCES.COFFEE]: {
    asset: coffeeSprite,
    reference: SPRITE_REFERENCES.COFFEE,
  },
  [SPRITE_REFERENCES.DESK]: {
    asset: deskSprite,
    reference: SPRITE_REFERENCES.DESK,
  },
  [SPRITE_REFERENCES.DOOR]: {
    asset: doorSprite,
    reference: SPRITE_REFERENCES.DOOR,
  },
  [SPRITE_REFERENCES.JUSTIN]: {
    asset: justinSprite,
    reference: SPRITE_REFERENCES.JUSTIN,
  },
  [SPRITE_REFERENCES.WINDOW]: {
    asset: windowSprite,
    reference: SPRITE_REFERENCES.WINDOW,
  },
};
