'use strict';
const can = document.querySelector('canvas');
const ctx = can.getContext('2d');
const canvas_width = (can.width = 450);
const canvas_height = (can.height = 700);
let lastTime = 0;

ctx.lineWidth = 3

class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.enemyTypes = ['worm', 'ghost', 'spider'];
    this.#addNewEnemy();
    this.enemyInterval = 1000;
    this.timer = 0;
  }

  update(deltaTime) {
    this.enemies.forEach(obj => obj.update(deltaTime));
    this.timer += deltaTime;
    if (this.timer > this.enemyInterval) {
      this.#addNewEnemy();
      this.timer = 0;
    }
    this.enemies = this.enemies.filter(obj => !obj.markForDelition);
    // .sort((a, b) => a.y + a.height - (b.y + b.height));
  }

  draw() {
    this.enemies.forEach(obj => obj.draw(this.ctx));
    return this;
  }
  #addNewEnemy() {
    const ranEnemy =
      this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

    if (ranEnemy === 'worm') this.enemies.push(new Worm(this));
    else if (ranEnemy === 'ghost') this.enemies.push(new Ghost(this));
    else if (ranEnemy === 'spider') this.enemies.push(new Spider(this));
  }
}

class Enemy {
  constructor(game) {
    this.game = game;
    this.markForDelition = false;
    this.frameX = 0;
    this.frameInterval = 200;
    this.timer = 0;
    this.frames = 6;
  }
  update(deltaTime) {
    this.x -= this.speed * deltaTime;
    this.timer += deltaTime;
    this.frameX = Math.floor(this.timer / this.frameInterval) % this.frames;
    if (this.x + this.width < 0 || this.y + this.height < 0) this.markForDelition = true;
  }
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Worm extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 229;
    this.spriteHeight = 171;
    this.modifier = Math.random() * 0.1 + 0.4;
    this.width = this.spriteWidth * this.modifier;
    this.height = this.spriteHeight * this.modifier;
    this.x = this.game.width;
    this.y = this.game.height - this.height;
    this.img = worm;
    this.speed = Math.random() * 0.1 + 0.1;
  }
}

class Ghost extends Enemy {
  constructor(game) {
    super(game);
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.6;
    this.spriteWidth = 261;
    this.spriteHeight = 209;
    this.modifier = Math.random() * 0.1 + 0.4;
    this.width = this.spriteWidth * this.modifier;
    this.height = this.spriteHeight * this.modifier;
    this.img = ghost;
    this.speed = Math.random() * 0.2 + 0.1;
    this.angle = 0;
    this.curve = Math.random() * 4 + 1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.y += Math.sin(this.angle) * this.curve;
    this.angle += 0.04;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    super.draw(ctx);
    ctx.restore();
  }
}

class Spider extends Enemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 310;
    this.spriteHeight = 175;
    this.modifier = Math.random() * 0.1 + 0.4;
    this.width = this.spriteWidth * this.modifier;
    this.height = this.spriteHeight * this.modifier;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = -this.height;
    this.img = spider;
    this.speed = 0;
    this.speedY = Math.random() * .1 + .1
    this.maxLength = Math.random() * (this.game.height / 2)
  }
  update(deltaTime){
    super.update(deltaTime)
    this.y += this.speedY * deltaTime
    if (this.y > this.maxLength ) this.speedY *= -1
  }
  draw(ctx){
    ctx.beginPath()
    ctx.moveTo(this.x + this.width / 2, 0)
    ctx.lineTo(this.x + this.width / 2, this.y)
    ctx.stroke()
    super.draw(ctx)
  }
}

const game = new Game(ctx, canvas_width, canvas_height);
const animate = function (timeStamp) {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.draw().update(deltaTime);
  requestAnimationFrame(animate);
};
animate(0);
