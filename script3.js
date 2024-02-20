const can = document.querySelector('canvas');
const ctx = can.getContext('2d');
const canvas_width = (can.width = 350);
const canvas_height = (can.height = 700);
const spriteWidth = 293;
const spriteHeight = 155;

const imgEnemy1 = new Image();
imgEnemy1.src = 'pic/enemy1.png';
const imgEnemy2 = new Image();
imgEnemy2.src = 'pic/enemy2.png';
const imgEnemy3 = new Image();
imgEnemy3.src = 'pic/enemy3.png';
const imgEnemy4 = new Image();
imgEnemy4.src = 'pic/enemy4.png';

const enemyState = [
  {
    src: 'pic/enemy1.png',
    frame: 6,
    spriteWidth: 293,
    spriteHeight: 155,
  },
  {
    src: 'pic/enemy2.png',
    frame: 6,
    spriteWidth: 266,
    spriteHeight: 188,
  },
  {
    src: 'pic/enemy3.png',
    frame: 6,
    spriteWidth: 218,
    spriteHeight: 177,
  },
  {
    src: 'pic/enemy4.png',
    frame: 9,
    spriteWidth: 213,
    spriteHeight: 212,
  },
];

class Enemy {
  constructor(src, w, h, frame) {
    this.img = new Image();
    this.img.src = src;
    this.speed = Math.random() + 3;
    // this.angle = Math.random() * 500; //3
    // this.angleSpeed = Math.random() * .5 + 0.5; //3
    // this.curve = Math.random() * 3 + 2;
    this.ran = Math.random() * 0.2 + 0.2;
    this.width = this.ran * spriteWidth;
    this.height = this.ran * spriteHeight;
    this.x = Math.random() * (canvas_width - this.width);
    this.y = Math.random() * (canvas_height - this.height);
    this.newX = Math.random() * (canvas_width - this.width);
    this.newY = Math.random() * (canvas_height - this.width);
    this.spriteWidth = w;
    this.spriteHeight = h;
    this.gameFrame = 0;
    this.frame = frame;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200) + 50;
  }
  update() {
    // this.x = 0
    // this.y = 0
    // this.x =
    //   (canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) +
    //   canvas_width / 2 -
    //   this.width / 2; //3
    // this.y =
    //   (canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) +
    //   canvas_height / 2 -
    //   this.width / 2; //3
    // this.x -= this.speed; //2
    if (this.x + this.width < 0) this.x = canvas_width;
    // this.y += Math.random() * 5 - 2.5; //1
    // this.y += Math.sin(this.angle) * this.curve; //2
    this.gameFrame++;
    // this.angle += this.angleSpeed; //3
    if (this.gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas_width - this.width);
      this.newY = Math.random() * (canvas_height - this.width);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    console.log(dx);
  }
  draw() {
    ctx.drawImage(
      this.img,
      (Math.floor(this.gameFrame / this.flapSpeed) % this.frame) *
        this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    return this;
  }
}
const enemiesArray = [];
for (let i = 0; i < 40; i++) {
  let pos = 2;
  enemiesArray.push(
    new Enemy(
      enemyState.at(pos).src,
      enemyState.at(pos).spriteWidth,
      enemyState.at(pos).spriteHeight,
      enemyState.at(pos).frame
    )
  );
}

const animate = function () {
  ctx.clearRect(0, 0, canvas_width, canvas_height);

  enemiesArray.forEach(enemy => enemy.draw().update());

  requestAnimationFrame(animate);
};
animate();
