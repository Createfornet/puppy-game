import {
  StandingRight,
  StandingLeft,
  SittingRight,
  SittingLeft,
  RunnigRight,
  RunningLeft,
  JumpingRight,
  JumpingLeft,
  FallingRight,
  FallingLeft,
} from './state8.js';

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [
      new StandingRight(this),
      new StandingLeft(this),
      new SittingRight(this),
      new SittingLeft(this),
      new RunnigRight(this),
      new RunningLeft(this),
      new JumpingRight(this),
      new JumpingLeft(this),
      new FallingRight(this),
      new FallingLeft(this),
    ];
    this.currentState = this.states[0];
    this.img = document.getElementById('dog');
    this.spriteWidth = 200;
    this.spriteHeight = 181.83;
    this.modifier = 1;
    this.width = this.spriteWidth * this.modifier;
    this.height = this.spriteHeight * this.modifier;
    this.x = (this.gameWidth - this.width) * 0.5;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.frameInterval = 100
    this.allFrames = this.currentState.frames
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weight = 0.5;
    this.timer = 0
  }
  draw(ctx) {
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
    return this;
  }
  update(input, deltaTime) {
    this.timer += deltaTime

    this.currentState.handleInput(input);
    this.allFrames = this.currentState.frames

    // horizontal movement
    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;
    this.frameX = Math.floor(this.timer / this.frameInterval) % this.allFrames

    // vertical movement
    this.y += this.vy;
    if (!this.onGround) this.vy += this.weight;
    else this.vy = 0;
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  get onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
