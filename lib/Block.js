class Block {
  constructor (options) {
    this.x = options.x;
    this.y = options.y;
    this.height = 15;
    this.width = 67;
  }

  draw (ctx) {
    // ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}


module.exports = Block;
