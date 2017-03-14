var Ball = function(x, y, color){
  this.velocityX = 4;
  this.velocityY = 4;
  this.x = x;
  this.y= y;
  this.radius = 10;
  this.color = color;

};


module.exports = Ball;


Ball.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  return this;
};

 Ball.prototype.move = function (direction) {
   this.x += direction.x;
   this.y += direction.y;
   return this;
};
