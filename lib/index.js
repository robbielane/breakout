var World = require('./world');

var world = new World();

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.paddle.draw(ctx);
  world.ball.move().draw(ctx);
  world.ball.wallCollision();
  world.ball.ceilingCollision();
  world.ball.paddleCollision(world.paddle);
  world.ball.sidePaddleCollision(world.paddle);

  for(var i=0; i<world.blocksArray.length; i++) {
      world.blocksArray[i].draw(ctx);
  }

  requestAnimationFrame(gameLoop);
});

document.addEventListener('mousemove', function(e) {
  if (e.offsetX < world.width - 80){
  world.paddle.x = e.offsetX;
} else if (e.offsetX > world.width - 80){
  world.paddle.x = world.width-80;
}
})
