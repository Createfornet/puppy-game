export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [];
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
    this.frameY = 0;
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
  }
  setState(state){
    this.currentState = this.states[state]
    this.currentState.enter()
  }
  update() {}
}
