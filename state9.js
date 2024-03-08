import { Dust, Splash, Fire } from './particle.js';

const states = {
  standing: 0,
  jumping: 1,
  falling: 2,
  running: 3,
  dizzing: 4,
  sitting: 5,
  rolling: 6,
  biting: 7,
  KO: 8,
  hitting: 9,
};

class State {
  constructor(game, state, frames) {
    this.game = game;
    this.state = state;
    this.frames = frames;
  }
}

export class Standing extends State {
  constructor(game) {
    super(game, 'standing', 7);
  }
  enter() {
    this.game.player.frameY = 0;
  }
  handleInput(input) {
    if (input.includes('ArrowRight')) this.game.player.setState(states.running);
    else if (input.includes('ArrowDown'))
      this.game.player.setState(states.sitting);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.jumping);
  }
}

export class Jumping extends State {
  constructor(game) {
    super(game, 'standing', 7);
  }
  enter() {
    this.game.player.frameY = 1;
    if (this.game.player.onGround) this.game.player.vy -= 25;
  }
  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight)
      this.game.player.setState(states.falling, 1);
    else if (input.includes('Enter'))
      this.game.player.setState(states.rolling, 2);
  }
}

export class Falling extends State {
  constructor(game) {
    super(game, 'standing', 7);
  }
  enter() {
    this.game.player.frameY = 2;
  }
  handleInput(input) {
    if (this.game.player.onGround) this.game.player.setState(states.running, 1);
  }
}

export class Running extends State {
  constructor(game) {
    super(game, 'standing', 9);
  }
  enter() {
    this.game.player.frameY = 3;
  }
  handleInput(input) {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes('ArrowDown'))
      this.game.player.setState(states.sitting, 0);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.jumping, 1);
    else if (input.includes('Enter'))
      this.game.player.setState(states.rolling, 2);
  }
}

export class Dizzing extends State {
  constructor(game) {
    super(game, 'standing', 11);
  }
  enter() {
    this.game.player.frameY = 4;
  }
  handleInput(input) {
    if (input.includes('ArrowRight')) this.game.player.setState(states.running);
    else if (input.includes('ArrowDown'))
      this.game.player.setState(states.sitting);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.jumping);
  }
}

export class Sitting extends State {
  constructor(game) {
    super(game, 'standing', 5);
  }
  enter() {
    this.game.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes('ArrowRight') || input.includes('ArrowLeft'))
      this.game.player.setState(states.running, 1);
    else if (input.includes('Enter'))
      this.game.player.setState(states.rolling, 2);
  }
}

export class Rolling extends State {
  constructor(game) {
    super(game, 'standing', 7);
  }
  enter() {
    this.game.player.frameY = 6;
  }
  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (!input.includes('Enter') && this.game.player.onGround)
      this.game.player.setState(states.running, 1);
    else if (!input.includes('Enter') && !this.game.player.onGround)
      this.game.player.setState(states.falling, 1);
    else if (
      input.includes('Enter') &&
      input.includes('ArrowUp') &&
      this.game.player.onGround
    )
      this.game.player.vy -= 25;
  }
}

export class Biting extends State {
  constructor(game) {
    super(game, 'standing', 7);
  }
  enter() {
    this.game.player.frameY = 7;
  }
  handleInput(input) {
    if (input.includes('ArrowRight')) this.game.player.setState(states.running);
    else if (input.includes('ArrowDown'))
      this.game.player.setState(states.sitting);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.jumping);
  }
}

export class KO extends State {
  constructor(game) {
    super(game, 'standing', 12);
  }
  enter() {
    this.game.player.frameY = 8;
  }
  handleInput(input) {
    if (input.includes('ArrowRight')) this.game.player.setState(states.running);
    else if (input.includes('ArrowDown'))
      this.game.player.setState(states.sitting);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.jumping);
  }
}

export class Hitting extends State {
  constructor(game) {
    super(game, 'standing', 4);
  }
  enter() {
    this.game.player.frameY = 9;
  }
  handleInput(input) {
    if (input.includes('ArrowRight')) this.game.player.setState(states.running);
    else if (input.includes('ArrowDown'))
      this.game.player.setState(states.sitting);
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.jumping);
  }
}
