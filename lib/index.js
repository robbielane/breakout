const World = require('./world');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const world = new World(ctx);
const newGameBtn = document.getElementById('start-new-game');

function gameFrame () { requestAnimationFrame(function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.paddle.draw(ctx);
  world.wallCollision();
  world.ceilingCollision();
  world.bottomCollision(ctx);
  world.paddleCollision(world.paddle);
  world.sidePaddleCollision(world.paddle);

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
}
gameFrame()

document.addEventListener('mousemove', function(e) {

  let worldX = canvas.getBoundingClientRect().left;

  if (e.clientX < worldX) {
    world.paddle.x = 0;
  } else if (e.offsetX > world.width - 80) {
    world.paddle.x = world.width-80;
  } else if (e.offsetX < world.width - 80 ) {
    world.paddle.x = e.offsetX;
  }
})

newGameBtn.addEventListener('click', function() {
  window.location.reload();
})

document.addEventListener('click', function(e) {
  console.log(e.offsetX, "x")
  console.log(e.offsetY, 'y')

})
