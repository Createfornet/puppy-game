const can = document.querySelector('canvas');
const ctx = can.getContext('2d');
const canvas_width = (can.width = 500);
const canvas_height = (can.height = 700);
const canPosition = can.getBoundingClientRect();
const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteheight = 179;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteheight * 0.5;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = 'pic/boom.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
  }
  update() {
    this.timer++;
    if (this.timer % 10 === 0) this.frame++;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.img,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteheight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
    return this;
  }
}

const boom = new Explosion(50, 50).draw();
const animate = function () {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  explosions.forEach((explosion, i) => {
    explosion.draw().update();
    if (explosion.frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  });
  requestAnimationFrame(animate);
};
animate();

const createAnimation = e =>
  explosions.push(new Explosion(e.offsetX, e.offsetY));

can.addEventListener('click', createAnimation);
// can.addEventListener('mousemove', createAnimation);
