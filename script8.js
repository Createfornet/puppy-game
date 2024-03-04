'use strict';

import Player from './player8.js';
import InputHandler from './input8.js';
import {drawStatusText} from './utils8.js'

window.addEventListener('load', function () {
  document.getElementById('loading').style.display = 'none';
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 10;
  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();

  const animate = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw(ctx);
    drawStatusText(ctx, input)
    requestAnimationFrame(animate)
  }
  animate()
});
