'use strict';
const can = document.querySelector('.canvas');
const ctx = can.getContext('2d');
const canvas_width = (can.width = window.innerWidth);
const canvas_height = (can.height = window.innerHeight);
const collision = document.querySelector('.collision');
const ctxCollision = collision.getContext('2d');
let RavenInterval = 500;
let timeToNextRaven = 0;
let lastTime = 0;
let score = 0;
let ravens = [];
let explosions = [];
let particles = [];
let gameOver = false;

collision.width = window.innerWidth;
collision.height = window.innerHeight;
ctx.font = '30px Impact';

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.3 + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas_width;
    this.y = Math.random() * (canvas_height - this.height);
    this.directionX = Math.random() * 5 + 2;
    this.directionY = Math.random() * 5 - 2.5;
    this.markForDelition = false;
    this.img = new Image();
    this.img.src = 'pic/raven.png';
    this.frame = 0; // frame x
    this.maxFrame = 6;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
    this.rgb = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}`;
    this.hasTrail = Math.random() > .5
  }
  update(deltaTime) {
    // collision to up or down
    if (this.y <= 0 || this.y > canvas_height - this.height) {
      this.directionY *= -1;
    }

    this.x -= this.directionX;
    this.y += this.directionY;

    // change deletion mark
    if (this.x + 2 * this.width < 0) this.markForDelition = true;
    this.frame =
      Math.floor(this.timeSinceFlap / this.flapInterval) % this.maxFrame;
    this.timeSinceFlap += deltaTime;

    // game over
    if (this.x + this.width < 0) gameOver = true;

    if (this.hasTrail) 
    particles.push(new Partcle(this.x, this.y, this.width, this.color));
  }
  draw() {
    // ctx.fillStyle = this.color;
    ctxCollision.fillStyle = this.color;
    ctxCollision.fillRect(this.x, this.y, this.width, this.height);
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    return this;
  }
}

const imgExplosion = new Image();
imgExplosion.src = 'pic/boom.png';

class Explosion {
  constructor(x, y, size) {
    this.img = imgExplosion;
    // this.img.src = 'pic/boom.png';
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.x = x;
    this.y = y;
    this.size = size;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = '...';
    this.time = 0;
    this.frameInerval = 100;
    this.markForDelition = false;
  }
  update(deltaTime) {
    // if (this.frame === 0) this.sound.play();
    this.time += deltaTime;
    this.frame = Math.floor(this.time / this.frameInerval);
    if (this.frame > 5) this.markForDelition = true;
  }
  draw() {
    ctx.drawImage(
      this.img,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.size,
      this.size
    );
    return this;
  }
}

class Partcle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size * 0.5;
    this.y = y + this.size * 0.3;
    this.radius = Math.random() * this.size * 0.1;
    this.maxRadius = Math.random() * 10 + 25;
    this.markForDelition = false;
    this.speedX = Math.random() + 0.5;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.8;
    if (this.radius > this.maxRadius) this.markForDelition = true;
  }
  draw() {
    ctx.save()
    ctx.globalAlpha = 1 - this.radius / this.maxRadius
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore()
    return this;
  }
}

const drawScore = function () {
  ctx.fillStyle = '#000';
  ctx.fillText(`score: ${score}`, 50, 75);
  ctx.fillText(`score: ${score}`, 50, 75);
  ctx.fillStyle = '#fff';
  ctx.fillText(`score: ${score}`, 52, 77);
};

const drwGameOver = function () {
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000';
  ctx.fillText(
    `GAME OVER, your score is ${score}`,
    canvas_width / 2,
    canvas_height / 2
  );
  ctx.fillStyle = '#fff';
  ctx.fillText(
    `GAME OVER, your score is ${score}`,
    canvas_width / 2 + 2,
    canvas_height / 2 + 2
  );
};

window.addEventListener('click', function (e) {
  const detectPixelColor = ctxCollision.getImageData(
    e.offsetX,
    e.offsetY,
    1,
    1
  );
  const pixelColor = detectPixelColor.data.slice(0, 3);
  ravens.forEach(raven => {
    if (
      raven.rgb[0] === pixelColor[0] &&
      raven.rgb[1] === pixelColor[1] &&
      raven.rgb[2] === pixelColor[2]
    ) {
      raven.markForDelition = true;
      explosions.push(new Explosion(raven.x, raven.y, raven.width));
      console.log(explosions);
      ++score;
    }
  });
});

const animate = function (timeStamp) {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  ctxCollision.clearRect(0, 0, canvas_width, canvas_height);
  let deltaTime = Math.floor(timeStamp - lastTime);
  lastTime = timeStamp;
  timeToNextRaven += deltaTime;
  if (timeToNextRaven > RavenInterval) {
    ravens.push(new Raven());
    ravens.sort((a, b) => a.width - b.width);
    timeToNextRaven = 0;
  }
  drawScore();
  [...particles, ...ravens, ...explosions].forEach(obj => {
    obj.draw().update(deltaTime);
  });
  ravens = ravens.filter(raven => !raven.markForDelition);
  explosions = explosions.filter(explosion => !explosion.markForDelition);
  particles = particles.filter(particle => !particle.markForDelition);
  if (!gameOver) requestAnimationFrame(animate);
  else drwGameOver();
};
animate(0);
