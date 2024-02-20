'use strict';
const can = document.querySelector('#canvas1');
const ctx = can.getContext('2d');
const can_width = (can.width = 600);
const can_height = (can.height = 600);
const playerImg = new Image();
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5;
const dropDown = document.querySelector('select')
let playerState = dropDown.value

// ================================= Animate Dog
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

playerImg.src = 'pic/shadow_dog.png';
animationStates.forEach((state, i) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    const loc = {};
    loc.y = i * spriteHeight;
    loc.x = j * spriteWidth;
    frames.loc.push(loc);
  }
  spriteAnimations[state.name] = frames;
});

const animate = function () {
  ctx.clearRect(0, 0, can_width, can_height);

  let position =
    Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = position * spriteWidth;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    playerImg,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    can_width,
    can_height
  );

  gameFrame++;

  requestAnimationFrame(animate);
};
animate();

dropDown.addEventListener('change', () => playerState = dropDown.value)

// ================================= Paralax Background
