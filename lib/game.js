

class Game {
  constructor (world) {
    this.world = world;
    requestAnimationFrame(this.gameLoop.bind(this));

  }
  gameLoop() {
    this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);

    this.world.paddle.draw(this.world.ctx);
    this.world.wallCollision();
    this.world.ceilingCollision();
    this.world.bottomCollision(this.world.ctx);
    this.world.ball.paddleCollision(this.world.paddle);
    this.world.ball.sidePaddleCollision(this.world.paddle);

    this.world.ctx.fillStyle = "#556BFC";
    for(var i=0; i<this.world.blocksArray.length; i++) {
        this.world.blocksArray[i].draw(this.world.ctx);
    }
    this.world.startGame(this.world.ctx)
    this.world.ball.move().draw(this.world.ctx);
    this.world.blockCollide();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

module.exports = Game;
