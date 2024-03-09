import { CollisionAnimation } from './collisionAimation.js';
import {
  Standing,
  Jumping,
  Falling,
  Running,
  Dizzing,
  Sitting,
  Rolling,
  Biting,
  KO,
  Hitting,
  Diving,
} from './state9.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.img = document.getElementById('player');
    this.states = [
      new Standing(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Running(this.game),
      new Dizzing(this.game),
      new Sitting(this.game),
      new Rolling(this.game),
      new Biting(this.game),
      new KO(this.game),
      new Hitting(this.game),
      new Diving(this.game),
    ];
    this.currentState = this.states[5];
    this.spriteWidth = 575;
    this.spriteHeight = 523;
    this.modifier = 0.2;
    this.width = this.spriteWidth * this.modifier;
    this.height = this.spriteHeight * this.modifier;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.speed = 0;
    this.maxSpeed = 6;
    this.vy = 0;
    this.weight = 1;
    this.frameX = 0;
    this.frameY = this.states.indexOf(this.currentState);
    this.frameInterval = 100;
    this.allFrames = this.currentState.frames;
    this.timer = 0;
  }
  draw(ctx) {
    //  debug mode
    if (this.game.debug) {
      ctx.beginPath();
      ctx.arc(
        this.x + this.width * 0.5,
        this.y + this.height * 0.5,
        this.width * 0.4,
        0,
        360
      );
      ctx.stroke();
    }

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
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);

    // sprite animate
    if (this.timer > this.frameInterval) {
      if (this.frameX < this.allFrames - 1) {
        this.frameX++;
        this.timer = 0;
      } else this.frameX = 0;
    } else this.timer += deltaTime;

    // horizontal movement
    this.x += this.speed;
    if (
      this.currentState !== this.states[4] &&
      this.currentState !== this.states[5]
    ) {
      if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
      else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
      else this.speed = 0;
    } else this.speed = 0;
    // horizontal boundries
    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.vy;
    if (this.onGround) this.vy = 0;
    else if (!this.onGround) this.vy += this.weight;
    // vertical boundries
    if (this.y < 0) this.y = 0;
    else if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;
  }
  get onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state, speed) {
    this.frameX = 0;
    this.currentState = this.states[state];
    this.currentState.enter();
    this.game.speed = speed * this.game.maxSpeed;
    this.allFrames = this.currentState.frames;
  }
  checkCollision() {
    this.game.enemies.forEach(enemy => {
      let dx = (enemy.x + enemy.width * .5) - (this.x + this.width * 0.5)
      let dy = (enemy.y + enemy.height * .5) - (this.y + this.height * .5)
      let distance = Math.sqrt(dx ** 2 + dy ** 2)
      if (
        // enemy.x < this.x + this.width &&
        // enemy.x + enemy.width > this.x &&
        // enemy.y < this.y + this.width &&
        // enemy.y + enemy.height > this.y
        distance < this.width * 0.4 + enemy.width * 0.5
      ) {
        enemy.markForDelition = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          this.currentState === this.states[6] ||
          this.currentState === this.states[10]
        ) {
          ++this.game.score;
        } else this.setState(4, 0);
      }
    });
  }
}
