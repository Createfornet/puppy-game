export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Helvetica';
    this.fontColor = '#000'
  }
  draw(ctx) {
    ctx.font = this.fontSize + 'px ' + this.fontFamily;
    ctx.textAlign = 'left'
    ctx.fillStyle = this.fontColor
    // score
    ctx.fillText(`score: ${this.game.score}`, 10, 30)
  }
}
