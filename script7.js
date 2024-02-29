'use strict';
window.addEventListener('load', function () {
  const btnFullScreen = document.getElementById('fullscreen')
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const enemyInterval = 2000;
  let lastTime = 0;
  let enemies = [];
  let enemyTimer = 0;
  let score = 0;
  let gameOver = false;

  class InputHandler {
    constructor() {
      this.keys = [];
      this.touchY = null;
      this.touchTreshold = 30;

      window.addEventListener('keydown', e => {
        if (e.key.includes('Arrow') && !this.keys.includes(e.key)) {
          this.keys.push(e.key);
        } else if (e.key === 'Enter' && gameOver) restartGame();
      });

      window.addEventListener('keyup', e => {
        if (e.key.includes('Arrow')) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });

      // touch for mobiles
      window.addEventListener('touchstart', e => {
        this.touchY = e.changedTouches[0].pageY;
      });

      window.addEventListener('touchmove', e => {
        let swipeDistance = this.touchY - e.changedTouches[0].pageY;
        if (
          swipeDistance > this.touchTreshold &&
          !this.keys.includes('swipe up')
        )
          this.keys.push('swipe up');
        else if (
          swipeDistance < -this.touchTreshold &&
          !this.keys.includes('swipe down')
        ) {
          this.keys.push('swipe down');
          if (gameOver) restartGame()
        }
      });

      window.addEventListener('touchend', e => {
        this.keys.splice(this.keys.indexOf('swipe up'), 1);
        this.keys.splice(this.keys.indexOf('swipe down'), 1);
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 100;
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
    restart() {
      this.x = 100;
      this.y = this.gameHeight - this.height;
      this.frames = 9;
      this.frameY = 0;
    }
    draw(ctx) {
      // ctx.strokeStyle = 'white';
      // ctx.lineWidth = 4;
      // ctx.beginPath();
      // ctx.arc(
      //   this.x + this.width * 0.5,
      //   this.y + this.height * 0.5 + 30,
      //   this.width * 0.33,
      //   0,
      //   Math.PI * 2
      // );
      // ctx.stroke();
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
    update(inp, deltaTime, enemies) {
      this.timer += deltaTime;

      // collition detection
      enemies.forEach(enemy => {
        let dx = enemy.x + enemy.width * 0.5 - 20 - (this.x + this.width * 0.5);
        let dy = enemy.y + enemy.width * 0.5 - (this.y + this.width * 0.5 + 30);
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= enemy.width * 0.33 + this.width * 0.33) {
          gameOver = true;
        }
      });

      // controls
      if (inp.keys.includes('ArrowRight')) this.speed = 5;
      else if (inp.keys.includes('ArrowLeft')) this.speed = -5;
      else if (
        (inp.keys.includes('ArrowUp') || inp.keys.includes('swipe up')) &&
        this.onGround
      )
        this.vy -= 30;
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
    restart() {
      this.x = 0;
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
      this.modifier = 1;
      this.width = this.spriteWidth * this.modifier;
      this.height = this.spriteHeight * this.modifier;
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.frames = 6;
      this.frameInterval = 100;
      this.timer = 0;
      this.speed = 0.4;
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
      // ctx.beginPath();
      // ctx.strokeStyle = 'white';
      // ctx.arc(
      //   this.x + this.width * 0.5 - 20,
      //   this.y + this.height * 0.5,
      //   this.width * 0.33,
      //   0,
      //   Math.PI * 2
      // );
      // ctx.stroke();
      return this;
    }
    update(deltaTime) {
      this.x -= this.speed * deltaTime;
      this.timer += deltaTime;
      this.frameX = Math.floor(this.timer / this.frameInterval) % this.frames;
      if (this.x + this.width < 0) {
        this.markForDelition = true;
        ++score;
      }
    }
  }

  const handleEnemies = function (deltaTime) {
    enemyTimer += deltaTime;
    if (enemyTimer > enemyInterval + Math.random() * 1000) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
    }
    enemies.forEach(enemy => enemy.draw(ctx).update(deltaTime));
    enemies = enemies.filter(enemy => !enemy.markForDelition);
  };

  const displayStatusText = function (ctx) {
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';
    ctx.font = '40px Helvetica';
    ctx.fillText(`score: ${score}`, 20, 50);
    if (gameOver) {
      ctx.textAlign = 'center';
      ctx.fillText(
        'GAME OVER, press Enter or swipe Down to restart',
        canvas.width * 0.5 - 2,
        198
      );
      ctx.fillStyle = 'white';
      ctx.fillText(
        'GAME OVER, press Enter or swipe Down to restart',
        canvas.width * 0.5,
        200
      );
    }
  };

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  const restartGame = function () {
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  };

  const toggleFullScreen = function(){
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement)
    canvas.requestFullscreen().then().catch()
  }
  btnFullScreen.addEventListener('click', toggleFullScreen)

  const animate = function (timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // draw
    background.draw(ctx);
    // .update(deltaTime);
    player.draw(ctx).update(input, deltaTime, enemies);

    // functions
    handleEnemies(deltaTime);
    displayStatusText(ctx);
    if (!gameOver) requestAnimationFrame(animate);
  };
  animate(0);
});
