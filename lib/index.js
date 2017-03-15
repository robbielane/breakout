var Ball = require('./ball')
var Paddle = require('./paddle')

var ball = new Ball(300, 450, "rgba(0, 255, 0, 1)");
var paddle = new Paddle(300, 450, 'black');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


// var paddle = new Block(x, y, 70, 15);

requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.move(this.x, this.y).draw(ctx);
  paddle.draw(ctx);


  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('mousemove', function(e) {
  paddle.x = e.offsetX -40;
})
