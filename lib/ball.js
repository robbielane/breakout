var Paddle = require('./paddle');
var World = require('./world');
// var gameCanvas = document.querySelector('#game');

var Ball = function(x, y, color){
  this.vx= 0;
  this.vy = 0;
  this.x = x;
  this.y= y;
  this.radius = 10;
  this.color = color;
};

Ball.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  return this;
};

 Ball.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
  return this;
};



Ball.prototype.ceilingCollision = function () {
  if( this.y + this.vy < 5 ){
    this.vy = -this.vy;
  }
}

Ball.prototype.paddleCollision = function(paddle) {
  if( this.x + this.radius >= paddle.x && //ball inside paddle left end
      this.x - this.radius <= paddle.x + paddle.width && //ball inside paddle right end
      this.y + this.radius  > paddle.y &&  //ball below paddle top
      this.y + this.radius <= paddle.y + paddle.height){ //ball above paddle bottom

    this.vy = (this.vy) *- 1;
  }
}

Ball.prototype.sidePaddleCollision = function (paddle) {
  if( this.x + this.radius <= paddle.x && //ball inside paddle left end
      this.x - this.radius >= paddle.x + paddle.width && //ball inside paddle right end
      this.y + this.radius >= paddle.y &&  //ball bellow paddle top
      this.y + this.radius <= paddle.y + paddle.height){ //ball above paddle bottom

    this.vx = (this.vx) *- 1;
  }
}




module.exports = Ball;
