
class Paddle {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.height = 15;
    this.width = 80;
  }

  draw(ctx) {

    ctx.fillStyle = '#C84847';
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = '#B47A31';
    ctx.fillRect (this.x + 25, this.y, 30, this.height)

    return this;
  }
}

module.exports = Paddle;
