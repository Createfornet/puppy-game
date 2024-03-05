export default class InputHandler {
  constructor() {
    this.lastKey = '';
    window.addEventListener('keydown', e => {
      if (e.key.includes('Arrow')) this.lastKey ='PRESS ' + e.key.slice(5).toLowerCase();
    });
    window.addEventListener('keyup', e =>{
      if (e.key.includes('Arrow')) this.lastKey ='RELEASE ' + e.key.slice(5).toLowerCase()
    })
  }
}
