export const states = {
  standingLeft: 0,
  standingRight: 1,
};

class State {
  constructor(state){
    this.state = state
  }
}

class StandingLeft extends State{
  constructor(player){
    super('standing left')
    this.player = player
  }
  enter(){
    this.player.frameY = 1
  }
  handleInput(input){
    if (input === 'PRESS left') 1
  }
}

class StandingRight extends State{
  constructor(player){
    super('standing right')
    this.player = player
  }
  enter(){
    this.player.frameY = 0
  }
  handleInput(){
    if (input === 'PRESS right') 1
  }
}