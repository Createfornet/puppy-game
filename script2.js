const can = document.querySelector('canvas');
const ctx = can.getContext('2d');
const canvas_width = (can.width = 800);
const canvas_height = (can.height = 700);
const inpSpeed = document.querySelector('.slider');
const speedTag = document.querySelector('#showGameSpeed');
let gameSpeed = 5;

inpSpeed.value = gameSpeed;
speedTag.textContent = gameSpeed;

const bgLaye1 = new Image();
bgLaye1.src = 'pic/layer-1.png';
const bgLaye2 = new Image();
bgLaye2.src = 'pic/layer-2.png';
const bgLaye3 = new Image();
bgLaye3.src = 'pic/layer-3.png';
const bgLaye4 = new Image();
bgLaye4.src = 'pic/layer-4.png';
const bgLaye5 = new Image();
bgLaye5.src = 'pic/layer-5.png';

class Layer {
  constructor(img, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.img = img;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) this.x = 0;
    this.x = this.x - this.speed;
    return this;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
    return this;
  }
}

window.addEventListener('load', function(){
  const layer1 = new Layer(bgLaye1, 0.2);
  const layer2 = new Layer(bgLaye2, 0.4);
  const layer3 = new Layer(bgLaye3, 0.6);
  const layer4 = new Layer(bgLaye4, 0.8);
  const layer5 = new Layer(bgLaye5, 1);
  const layers = [layer1, layer2, layer3, layer4, layer5];
  
  inpSpeed.addEventListener('change', e => {
    gameSpeed = speedTag.textContent = e.target.value;
  });
  
  const animate = function () {
    ctx.clearRect(0, 0, canvas_width, canvas_width);
    layers.forEach(layer => layer.draw().update());
    requestAnimationFrame(animate);
  };
  animate();
})

