class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.frameInterval = 100;
    this.timer = 0;
    this.markForDelition = false
  }
  draw(ctx) {
    //  debug mode
    if (this.game.debug)
      ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.img,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    this.timer += deltaTime;
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.frameX = Math.floor(this.timer / this.frameInterval) % this.frames;
    if (this.x + this.width < 0 || this.y + this.height < 0) this.markForDelition = true
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.img = document.getElementById('enemy_fly');
    this.spriteWidth = 60;
    this.spriteHeight = 44;
    this.sizeModifier = 1;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width + Math.random() * this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.frames = 6;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.spriteWidth = 60;
    this.spriteHeight = 87;
    this.sizeModifier = 1;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.img = document.getElementById('enemy_plant');
    this.speedX = 0;
    this.speedY = 0;
    this.frames = 2;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.spriteWidth = 120;
    this.spriteHeight = 144;
    this.sizeModifier = 1;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width;
    this.y = (this.game.height - this.height) * 0.5;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.frames = 6;
    this.img = document.getElementById('enemy_spider_big');
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y + this.height > this.game.height - this.game.groundMargin)
      this.speedY *= -1;
  }
  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width * 0.5, 0);
    ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5);
    ctx.stroke();
    super.draw(ctx);
  }
}
