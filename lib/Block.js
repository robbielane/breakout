function Block (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Block.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Block.prototype.move = function() {
  if (this.x == canvas.width -10) {
    context.fillRect(this.x--, this.y, this.width, this.height)
  }
  return this;
}


module.exports = Block;
