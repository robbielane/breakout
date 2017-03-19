var World = require('./world');
var world = new World();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.paddle.draw(ctx);
  world.wallCollision();
  world.ball.ceilingCollision();
  world.bottomCollision(ctx);
  world.ball.paddleCollision(world.paddle);
  world.ball.sidePaddleCollision(world.paddle);

  ctx.fillStyle = "#556BFC";
  for(var i=0; i<world.blocksArray.length; i++) {
      world.blocksArray[i].draw(ctx);
  }
  world.startGame(ctx)
  world.ball.move().draw(ctx);
  world.blockCollide();

  requestAnimationFrame(gameLoop);
});

document.addEventListener('mousemove', function(e) {
    let worldX = canvas.getBoundingClientRect().left;
    if (e.clientX < worldX) {
        world.paddle.x = 0;
    } else if (e.offsetX > world.width - 80){
        world.paddle.x = world.width-80;
    } else if(e.offsetX < world.width - 80 ){
        world.paddle.x = e.offsetX;
    }
})
