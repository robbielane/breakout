export default class Block {
  constructor (options) {
    this.x = options.x;
    this.y = options.y;
    this.height = 15;
    this.width = 67;
  }

  draw (ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  collision (ball) {
    if (this.collisonLeft(ball)) return 'left';
    if (this.collisonRight(ball)) return 'right';
    if (this.collisonBottom(ball)) return 'bottom';
    if (this.collisonTop(ball)) return 'top';
  }

  collisonLeft (ball) {
    if (ball.x + ball.radius >= this.x &&
      ball.x + ball.radius <= this.x + 7 &&
      ball.y + ball.radius >= this.y &&
      ball.y - ball.radius <= this.y + this.height)
    return true;
  }

  collisonRight (ball) {
    if (ball.x + ball.radius >= this.x + 60 &&
      ball.x + ball.radius <= this.x + this.width &&
      ball.y + ball.radius >= this.y &&
      ball.y - ball.radius <= this.y + this.height)
    return true;
  }

  collisonBottom (ball) {
    if (ball.x + ball.radius >= this.x  &&
      ball.x - ball.radius <= this.x + this.width &&
      ball.y - ball.radius >= this.y + 10 &&
      ball.y - ball.radius <= this.y + this.height)
    return true;
  }

  collisonTop (ball) {
    if (ball.x + ball.radius >= this.x  &&
      ball.x - ball.radius <= this.x + this.width &&
      ball.y + ball.radius >= this.y &&
      ball.y + ball.radius <= this.y + 5)
    return true;
  }
}
