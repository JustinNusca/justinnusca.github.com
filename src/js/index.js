// ==== MODULES ================================================================
import Peekaboo from './peekaboo';
import Scene from './header/scene';
import onFormSubmit, { formClassName } from './form';

// ==== DATA ===================================================================
import { ACTOR_DATA } from './header/data/actors';
import { PROP_DATA } from './header/data/props';

/**
 * start - Starts Peekaboo, canvas header, and attaches form event listener.
 *
 * @return {void}
 */
(function start() {
  const canvas = document.getElementById('canvas');
  const form = document.querySelector(formClassName);
  const scene = new Scene(canvas, ACTOR_DATA, PROP_DATA);
  window.scene = scene;

  Peekaboo.start();

  form.addEventListener('submit', event => onFormSubmit(event));
  window.addEventListener('load', () => scene.load());
}());
