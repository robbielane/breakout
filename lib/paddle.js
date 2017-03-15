
var Paddle = function (x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.height = 15;
  this.width = 80;
}

Paddle.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Paddle.prototype.move = function() {

  return this;
}




module.exports = Paddle;
