export class ImputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (
        (e.key.includes('Arrow') || e.key === 'Enter') &&
        !this.keys.includes(e.key)
      )
        this.keys.push(e.key);
      else if (e.key === 'd') this.game.debug = !this.game.debug;
    });

    window.addEventListener('keyup', e => {
      if (
        (e.key.includes('Arrow') || e.key === 'Enter') &&
        this.keys.includes(e.key)
      )
        this.keys.splice(this.keys.indexOf(e.key), 1);
    });
  }
}
