// eslint-disable-next-line
import 'static-loader!./CNAME?output=CNAME';

import DomAnimManager from './js/dom_animator';
import Scene from './js/scene';
import onFormSubmit, { formClassName } from './js/form';

import './css/app.scss';

(function header() {
  const canvas = document.getElementById('canvas');
  const form = document.querySelector(formClassName);
  const scene = new Scene(canvas, window.devicePixelRatio, 60, Date.now());

  DomAnimManager.init();

  form.addEventListener('submit', event => onFormSubmit(event));
  window.addEventListener('load', () => scene.load());
  window.addEventListener('resize', () => scene.updateScale());
  window.addEventListener('resize', () => scene.updateScale());
}());
