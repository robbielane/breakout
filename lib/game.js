export default class Game {
  constructor (canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = world;
    this.started = false;

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  showStart () {
    this.ctx.font = "25px 'Press Start 2P'";
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText("CLICK TO START", 130, 240);
  }

  gameLoop () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.started) this.showStart();

    this.drawWorld();
    this.checkCollisons();
    this.world.levelWon();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  start () {
    this.started = true;
    this.world.ball.init(this.world.level);
  }

  drawWorld () {
    this.world.paddle.draw(this.ctx);
    this.world.ball.move().draw(this.ctx);

    this.ctx.fillStyle = "#556BFC";
    for (var i = 0; i < this.world.blocksArray.length; i++) {
      this.world.blocksArray[i].draw(this.ctx);
    }
  }

  checkCollisons () {
    this.world.wallCollision();
    this.world.ceilingCollision();
    this.world.bottomCollision(this.ctx);
    this.world.ball.paddleCollision(this.world.paddle);
    this.world.ball.sidePaddleCollision(this.world.paddle);
    this.world.blockCollide();
  }

};
