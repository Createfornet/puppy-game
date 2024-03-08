class Layer {
  constructor(game, width, height, speedModifier, img) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.img = img;
    this.x = 0;
    this.y = 0;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.imgLayer1 = document.getElementById('layer1');
    this.imgLayer2 = document.getElementById('layer2');
    this.imgLayer3 = document.getElementById('layer3');
    this.imgLayer4 = document.getElementById('layer4');
    this.imgLayer5 = document.getElementById('layer5');
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.imgLayer1
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.imgLayer2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.imgLayer3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.imgLayer4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.imgLayer5
    );
    this.layers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  draw(ctx) {
    this.layers.forEach(layer => layer.draw(ctx));
  }
  update(deltaTime) {
    this.layers.forEach(layer => layer.update(deltaTime));
  }
}
