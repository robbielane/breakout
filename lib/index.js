var World = require('./world');

var world = new World();

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.ball.move(this.x, this.y).draw(ctx);
  world.paddle.draw(ctx);

  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('mousemove', function(e) {
  world.paddle.x = e.offsetX -40;
})
