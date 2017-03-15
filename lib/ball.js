var Paddle = require('./paddle');

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

 Ball.prototype.move = function (paddle) {

  //  function invertVertical() {
  //     this.vy = -this.vy;
  //  }

  this.paddle = paddle;

  this.x += this.vx;
  this.y += this.vy;

   if(this.x + this.vx > gameCanvas.width - 5 || this.x + this.vx < 5){
     this.vx = -this.vx;
   }

   if( this.y + this.vy < 5 ){
     this.vy = -this.vy;
    // invertVertical.bind(ball);
   }

  //  bouncing on the Paddle
    if( this.y + this.vy > 445 && (this.x + this.vx < paddle.x && this.x + this.vx > paddle.x + 80)){

     this.vy = -this.vy;


   }




   return this;
};


module.exports = Ball;
