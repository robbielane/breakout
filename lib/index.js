const World = require('./world');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const world = new World(ctx);
const newGameBtn = document.getElementById('start-new-game');

requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.paddle.draw(ctx);
  world.wallCollision();
  world.ceilingCollision();
  world.bottomCollision(ctx);
  world.paddleCollision(world.paddle);

  ctx.fillStyle = "#556BFC";
  for (var i=0; i<world.blocksArray.length; i++) {
    world.blocksArray[i].draw(ctx);
  }
  world.startGame(ctx)
  world.ball.move().draw(ctx);
  world.blockCollide(ctx);

  if (world.win == false) {
    requestAnimationFrame(gameLoop);
  }
});


world.movePaddle()

newGameBtn.addEventListener('click', function() {
  window.location.reload();
})

document.addEventListener('click', function(e) {
  console.log(e.offsetX, "x")
  console.log(e.offsetY, 'y')

})
