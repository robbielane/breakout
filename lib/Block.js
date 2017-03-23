class Block {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.height = 15;
    this.width = 67;
  }

  draw (ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}


module.exports = Block;
