'use strict';
window.addEventListener('load', function () {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  let lastTime = 0;
  let enemies = [];
  let enemyTimer = 0
  const enemyInterval = 2000

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', e => {
        if (e.key.includes('Arrow') && !this.keys.includes(e.key)) {
          this.keys.push(e.key);
        }
      });

      window.addEventListener('keyup', e => {
        if (e.key.includes('Arrow')) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 10;
      this.y = this.gameHeight - this.height;
      this.img = document.getElementById('imgPlayer');
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
      this.frames = 9;
      this.frameInterval = 100;
      this.timer = 0;
    }
    draw(ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.img,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.width,
        this.x,
        this.y,
        this.width,
        this.height
      );
      return this;
    }
    update(inp, deltaTime) {
      this.timer += deltaTime;

      // arrow keys
      if (inp.keys.includes('ArrowRight')) this.speed = 5;
      else if (inp.keys.includes('ArrowLeft')) this.speed = -5;
      else if (inp.keys.includes('ArrowUp') && this.onGround) this.vy -= 30;
      else this.speed = 0;

      // horizontal movement
      this.frameX = Math.floor(this.timer / this.frameInterval) % this.frames;
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      // vertical movement
      this.y += this.vy;
      if (!this.onGround) {
        this.vy += this.weight;
        this.frameY = 1;
        this.frames = 7;
      } else {
        this.vy = 0;
        this.frameY = 0;
        this.frames = 9;
      }

      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }
    get onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.img = document.getElementById('imgBackground');
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.speed = 0.1;
    }
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.img,
        this.x + this.width - 1,
        this.y,
        this.width,
        this.height
      );
      return this;
    }
    update(deltaTime) {
      // this.speed *= deltaTime
      this.x -= this.speed * deltaTime;
      if (this.x <= -this.width) this.x = 0;
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.img = document.getElementById('imgEnemy');
      this.spriteWidth = 160;
      this.spriteHeight = 119;
      this.modifier = 0.5;
      this.width = this.spriteWidth * this.modifier;
      this.height = this.spriteHeight * this.modifier;
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.frames = 6;
      this.frameInterval = 100;
      this.timer = 0;
      this.speed = .4
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
      return this;
    }
    update(deltaTime) {
      this.x -= this.speed * deltaTime;
      this.timer += deltaTime;
      this.frameX = Math.floor(this.timer / this.frameInterval) % this.frames;
    }
  }

  const handleEnemies = function (deltaTime) {
    enemyTimer += deltaTime
    if (enemyTimer > (enemyInterval + (Math.random() * 100000))){
      enemies.push(new Enemy(canvas.width, canvas.height))
      enemyTimer = 0
    }
    enemies.forEach(enemy => enemy.draw(ctx).update(deltaTime))
  };
  const displayStatusText = function () {};

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);
  const enemy1 = new Enemy(canvas.width, canvas.height);

  const animate = function (timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // draw
    background.draw(ctx)
    .update(deltaTime);
    player.draw(ctx).update(input, deltaTime);
    handleEnemies(deltaTime)
    requestAnimationFrame(animate);
  };
  animate(0);
});
