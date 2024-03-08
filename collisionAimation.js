export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.sizeModifier = Math.random() * 0.25 + .4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.img = document.getElementById('collision');
    this.frameX = 0;
    this.frames = 5;
    this.frameInterval = Math.random() * 130 + 70;
    this.timer = 0;
    this.markForDelition = false;
  }
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    return this
  }
  update(deltaTime) {
    this.x -= this.game.speed
    if (this.timer > this.frameInterval) {
      if (this.frameX < this.frames) this.frameX++;
      else this.markForDelition = true;
    } else this.timer += deltaTime;
  }
}
