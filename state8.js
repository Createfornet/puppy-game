export const states = {
  standingRight: 0,
  standingLeft: 1,
  sittingRight: 2,
  sittingLeft: 3,
  runningRight: 4,
  runningLeft: 5,
  jumpingRight: 6,
  jumpingLeft: 7,
  fallingRight: 8,
  fallingLeft: 9,
};

class State {
  constructor(state, frames) {
    this.state = state;
    this.frames = frames
  }
}

export class StandingRight extends State {
  constructor(player) {
    super('standing right', 7);
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS left') this.player.setState(states.standingLeft);
    else if (input === 'PRESS right') this.player.setState(states.runningRight);
    else if (input === 'PRESS down') this.player.setState(states.sittingRight);
    else if (input === 'PRESS up') this.player.setState(states.jumpingRight);
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super('standing left', 7);
    this.player = player;
  }
  enter() {
    this.player.frameY = 1;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.standingRight);
    else if (input === 'PRESS left') this.player.setState(states.runningLeft);
    else if (input === 'PRESS down') this.player.setState(states.sittingLeft);
    else if (input === 'PRESS up') this.player.setState(states.jumpingLeft);
  }
}

export class RunnigRight extends State {
  constructor(player) {
    super('running right', 9);
    this.player = player;
  }
  enter() {
    this.player.frameY = 6;
    this.player.speed = this.player.maxSpeed;
  }
  handleInput(input) {
    if (input === 'PRESS left') this.player.setState(states.runningLeft);
    else if (input === 'RELEASE right')
      this.player.setState(states.standingRight);
    else if (input === 'RELEASE down')
      this.player.setState(states.standingRight);
  }
}

export class RunningLeft extends State {
  constructor(player) {
    super('running left', 9);
    this.player = player;
  }
  enter() {
    this.player.frameY = 7;
    this.player.speed = -this.player.maxSpeed;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.runningRight);
    else if (input === 'RELEASE left')
      this.player.setState(states.standingLeft);
    else if (input === 'RELEASE down')
      this.player.setState(states.standingLeft);
  }
}

export class SittingRight extends State {
  constructor(player) {
    super('sitting right', 5);
    this.player = player;
  }
  enter() {
    this.player.frameY = 8;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS left') this.player.setState(states.sittingLeft);
    else if (input === 'PRESS up') this.player.setState(states.standingRight);
    else if (input === 'RELEASE down')
      this.player.setState(states.standingRight);
  }
}
export class SittingLeft extends State {
  constructor(player) {
    super('sitting left', 5);
    this.player = player;
  }
  enter() {
    this.player.frameY = 9;
    this.player.speed = 0;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.sittingRight);
    else if (input === 'PRESS up') this.player.setState(states.standingLeft);
    else if (input === 'RELEASE down')
      this.player.setState(states.standingLeft);
  }
}

export class JumpingRight extends State {
  constructor(player) {
    super('jumping right', 7);
    this.player = player;
  }
  enter() {
    this.player.frameY = 2;
    if (this.player.onGround) this.player.vy -= 20;
    this.player.speed = this.player.maxSpeed * 0.5;
  }
  handleInput(input) {
    // this.player.frameY = this.player.vy <= 0 ? 2 : 4;
    if (input === 'PRESS left') this.player.setState(states.jumpingLeft);
    else if (!this.player.vy) this.player.setState(states.fallingRight);
  }
}

export class JumpingLeft extends State {
  constructor(player) {
    super('jumping left', 7);
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
    if (this.player.onGround) this.player.vy -= 20;
    this.player.speed = -this.player.maxSpeed * 0.5;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.jumpingRight);
    else if (!this.player.vy) this.player.setState(states.fallingLeft);
  }
}

export class FallingRight extends State {
  constructor(player) {
    super('falling right', 7);
    this.player = player;
  }
  enter() {
    this.player.frameY = 4;
  }
  handleInput(input) {
    if (input === 'PRESS left') this.player.setState(states.fallingLeft);
    else if (this.player.onGround) this.player.setState(states.standingRight);
  }
}

export class FallingLeft extends State {
  constructor(player) {
    super('falling left', 7);
    this.player = player;
  }
  enter() {
    this.player.frameY = 5;
  }
  handleInput(input) {
    if (input === 'PRESS right') this.player.setState(states.jumpingRight);
    else if (this.player.onGround) this.player.setState(states.standingLeft);
  }
}
