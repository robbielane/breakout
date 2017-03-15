var Ball = function(x, y, color){
  this.vx= 2;
  this.vy = -3;
  this.x = x;
  this.y= y;
  this.radius = 10;
  this.color = color;
};

var gameCanvas = document.querySelector('#game');

Ball.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  return this;
};

 Ball.prototype.move = function () {

  this.x += this.vx;
  this.y += this.vy;

   if(this.x + this.vx > gameCanvas.width - 5 || this.x + this.vx < 5){
     this.vx = -this.vx;
   }

   if( this.y + this.vy < 5 ){
     this.vy = -this.vy;
   }

   return this;
};


module.exports = Ball;
