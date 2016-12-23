import Justin from './justin';
import Prop, { PROP_DATA } from './props';
import SpriteLoader from './sprites';

class Scene {
  constructor(canvas, dpi, framesPerSeccond, lastUpdate) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.dpi = dpi;
    this.framesPerSecond = 1000 / framesPerSeccond;
    this.lastUpdate = lastUpdate;
    this.actors = [];
    this.props = [];
  }

  createActor() {
    this.actors.push(new Justin(this.canvas));
    this.updateScale();
  }

  draw() {
    if (this.currentAnimationFrame) { return; }

    this.currentAnimationFrame = requestAnimationFrame(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.props.forEach(prop => prop.draw(this.context));
      this.actors.forEach(actor => actor.draw(this.context));

      this.currentAnimationFrame = null;
    });
  }

  populateScene() {
    const props = Object.keys(PROP_DATA).map(propKey => PROP_DATA[propKey]);
    props.forEach(prop => this.props.push(new Prop(prop, this.canvas)));
    this.createActor();
  }

  load() {
    this.populateScene();

    const scenePopulation = this.actors.concat(this.props);
    const sceneSpriteReferences = scenePopulation.map(populant => populant.spriteReference);

    SpriteLoader.load(sceneSpriteReferences, () => this.start());
  }

  start() {
    this.lastUpdate = Date.now();
    this.updateScale();

    this.updateInterval = setInterval(() => this.update(), this.framesPerSecond);
    this.drawInterval = setInterval(() => this.draw(), this.framesPerSecond);
  }

  update() {
    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / this.framesPerSecond;

    this.props.forEach(prop => prop.update(deltaTime, this.actors));
    this.actors.forEach(actor => actor.update(deltaTime, this.props));

    this.lastUpdate = now;
  }

  updateScale() {
    const canvasClientRect = this.canvas.getBoundingClientRect();
    const prevWidth = this.canvas.width;
    const scaleAmount = (canvasClientRect.width / prevWidth) * this.dpi;

    this.canvas.width *= scaleAmount;
    this.canvas.height *= scaleAmount;

    this.props.forEach(prop => prop.setScale(scaleAmount));
    this.actors.forEach(actor => actor.setScale(scaleAmount));
  }
}

export default Scene;
