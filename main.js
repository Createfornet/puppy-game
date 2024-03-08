import { Player } from './player9.js';
import { ImputHandler } from './input9.js';
import { Background } from './background9.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies9.js';
import { UI } from './UI.js';
import { CollisionAnimation } from './collisionAimation.js';

window.addEventListener('load', function () {
  this.document.getElementById('loading').style.display = 'none';
  const canvas = this.document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 500;
  canvas.height = 500;
  ctx.lineWidth = 3

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 70;
      this.speed = 0;
      this.maxSpeed = 3;
      this.enemies = [];
      this.collisions = []
      this.particles = []
      this.maxParticles = 50
      this.player = new Player(this);
      this.input = new ImputHandler(this);
      this.background = new Background(this);
      this.UI = new UI(this)
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
      this.score = 0
      this.debug = true
      this.time = 0
      this.maxTime = 50000
      this.gameOver = false
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach(enemy => enemy.draw(ctx));
      this.UI.draw(ctx)
      return this;
    }
    update(deltaTime) {
      this.time += deltaTime
      if(this.time > this.maxTime) this.gameOver = true

      this.background.update(deltaTime);
      this.enemies.forEach(enemy => enemy.update(deltaTime));
      this.player.update(this.input.keys, deltaTime);

      // handle enemies
      this.enemies = this.enemies.filter(enemy => !enemy.markForDelition);
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else this.enemyTimer += deltaTime;

      // handle particles
      this.particles.forEach(particle => particle.draw(ctx).update())
      this.particles = this.particles.filter(particle => !particle.markForDelition)
      if(this.particles.length > this.maxParticles) this.particles = this.particles.splice(0, this.maxParticles)
    
      // handle collisions
      this.collisions = this.collisions.filter(collision => !collision.markForDelition)
      this.collisions.forEach(collision => collision.draw(ctx).update(deltaTime))
    }
    addEnemy() {
      this.enemies.push(new FlyingEnemy(this));
      if (this.speed > 0) {
        if (Math.random() > 0.5) this.enemies.push(new GroundEnemy(this));
        else this.enemies.push(new ClimbingEnemy(this));
      }
    }
  }
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  let deltaTime = 0;
  const animate = function (timeStamp) {
    ctx.clearRect(0, 0, game.width, game.height);
    deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.draw(ctx).update(deltaTime);
    if(!game.gameOver) requestAnimationFrame(animate);
    else game.UI.sendGameOverMessage(ctx)
  };
  animate(0);
});
