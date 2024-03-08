class Particle {
  constructor(game) {
    this.game = game;
    this.markForDelition = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 1) this.markForDelition = true;
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.size = Math.random() * 10 + 10;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.arc(this.x, this.y, this.size, 0, 360);
    ctx.fill();
    return this;
  }
}

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 50;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2+ 1;
    this.gravity = 0;
    this.img = document.getElementById('fire');
  }
  update() {
    super.update();
    this.gravity += 0.2;
    this.y += this.gravity;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    return this;
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.size = Math.random() * 100 + 50;
    this.img = document.getElementById('fire');
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.2;
  }
  update() {
    super.update();
    this.angle += this.va;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.img,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    ctx.restore();
    return this;
  }
}
