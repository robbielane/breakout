var Ball = function(x, y, color){
  this.velocityX = 4;
  this.velocityY = 4;
  this.x = x;
  this.y= y;
  this.radius = 10;
  this.color = color;

};

// Ball.prototype.draw = function(){
//   ctx.beginPath();
//   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//   ctx.closePath();
//   ctx.fillStyle = this.color;
//   ctx.fill();
// }


module.exports = Ball;

//
// function Block (x, y, width, height, color) {
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.color = color;
// }
//
//
// Block.prototype.draw = function (context) {
//   context.fillStyle = this.color;
//   context.fillRect(this.x, this.y, this.width, this.height);
//   return this;
// };
//
//  Block.prototype.move = function (direction) {
//    this.x += direction.x;
//    this.y += direction.y;
//
//  return this;
// };
