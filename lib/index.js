var Ball = require('./ball')
var Block = require('./Block.js');

var ball = new Ball(150, 20, "rgba(0, 255, 0, 1)");
console.log(ball);
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
// var x = 300;
// var y = 450;
// var dx = 4;

console.log('hooked up')

// var paddle = new Block(x, y, 70, 15);

var drawBall = function(ball){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = ball.color;
  ctx.fill();
}


requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // context.fillRect(x++, y, 70, 15);
  drawBall(ball);



  requestAnimationFrame(gameLoop);
});
