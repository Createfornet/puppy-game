export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Creepster';
    this.fontColor = '#000';
    this.imgLive = document.getElementById('live')
  }
  draw(ctx) {
    ctx.font = this.fontSize + 'px ' + this.fontFamily;
    ctx.textAlign = 'left';
    ctx.fillStyle = this.fontColor;
    
    // score
    ctx.fillText(`Score: ${this.game.score}`, 10, 30);
    
    // timer
    ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
    ctx.fillText(
      `Time: ${((this.game.maxTime - this.game.time)* .001).toFixed(0)}`,
      10,
      60
    );

    // lives
    ctx.drawImage(document.getElementById('live'), 10, 90, 25, 25)
    console.log(this.imgLive);
  }
  sendGameOverMessage(ctx) {
    ctx.save()
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowColor = '#fff'
    ctx.textAlign = 'center';
    if (this.game.score > 5) {
      ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      ctx.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5);
      ctx.font = this.fontSize * 0.75 + 'px ' + this.fontFamily;
      ctx.fillText(
        'What are creatures of the night afraid of? YOU!!!',
        this.game.width * 0.5,
        this.game.height * 0.6
      );
    } else {
      ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
      ctx.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5);
      ctx.font = this.fontSize * 0.75 + 'px ' + this.fontFamily;
      ctx.fillText(
        'Noppe. Better luck next time!',
        this.game.width * 0.5,
        this.game.height * 0.6
      );
    }
    ctx.restore()
  }
}
