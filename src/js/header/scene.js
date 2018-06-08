// ==== ENTITIES ===============================================================
// import Actor from './entities/actor';
import Prop from './entities/prop';

// ==== SPRITE LOADER ==========================================================
import { drawRenderable, loadRenderable } from './sprites';

const UPDATE_INTERVAL = 17; // ie. 60 FPS, Math.round(1000 / 60)

export default class Scene {
  constructor(canvas = {}, actors = [], props = []) {
    this.actors = actors.map(actor => new Prop(actor));
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.dpi = window.devicePixelRatio;
    this.lastUpdate = 0;
    this.props = props.map(prop => new Prop(prop));

    this.loop = this.loop.bind(this);
    this.start = this.start.bind(this);
  }

  draw() {
    if (this.currentAnimationFrame) { return; }

    requestAnimationFrame(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.props.forEach(prop => drawRenderable(this.context, prop.animState));
      this.actors.forEach(actor => drawRenderable(this.context, actor.animState));
      this.currentAnimationFrame = null;
    });
  }

  updateCanvasScale() {
    const canvasRect = this.canvas.getBoundingClientRect();
    this.canvas.height = canvasRect.height * this.dpi;
    this.canvas.width = canvasRect.width * this.dpi;
  }

  get interactiveProps() {
    return this.props.filter(prop => prop.interactive);
  }

  load() {
    const renderables = this.props.concat(this.actors);
    const spritePromises = renderables.reduce((promises, renderable) => {
      const animationReferences = renderable.actions
        .map(action => action.animationReference);

      return [...promises, ...loadRenderable(animationReferences)];
    }, []);

    Promise.all(spritePromises).then(this.start);
  }

  loop() {
    this.update();
    this.draw();
  }

  start() {
    this.lastUpdate = performance.now();
    this.loopInterval = setInterval(this.loop, UPDATE_INTERVAL);
  }

  update() {
    const now = performance.now();
    const deltaTime = now - this.lastUpdate;

    this.updateCanvasScale();
    this.props.forEach(prop => prop.update({ deltaTime, scene: this }));
    this.actors.forEach(actor => actor.update({ deltaTime, scene: this }));
    this.lastUpdate = now;
  }
}
