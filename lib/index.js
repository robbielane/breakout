var Block = require('./Block.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var x = 300;
var y = 450;
var dx = 4;

var player = new Block(x, y, 70, 15);

requestAnimationFrame(function gameLoop() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillRect(x++, y, 70, 15);

  if (x == canvas.width -70) {
  context.fillRect(x += dx, y, 70, 15);
} else {
  dx === -dx;
}

  requestAnimationFrame(gameLoop);
});
