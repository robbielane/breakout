var Ball = require('./ball')
var Block = require('./Block.js');

var ball = new Ball(300, 450, "rgba(0, 255, 0, 1)");
console.log(ball);
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

console.log('hooked up')

// var paddle = new Block(x, y, 70, 15);

requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.move({x: .5, y: -.5}).draw(ctx)

  // context.fillRect(x++, y, 70, 15);
  // drawBall(ball);
  // ball.move({x: .5, y: 0}).draw()

  requestAnimationFrame(gameLoop);
});
