
class Paddle {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.height = 15;
    this.width = 80;
  }

  draw (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

}

module.exports = Paddle;
