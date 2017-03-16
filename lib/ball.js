var Paddle = require('./paddle');
var World = require('./world');


var Ball = function(x, y, color){
  this.vx= 3;
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
  var paddleWidth = this.paddle.width / 2;
   if(this.x + this.vx > gameCanvas.width - 5 || this.x + this.vx < 5){
     this.vx = -this.vx;
   }

   if( this.y + this.vy < 5 ){
     this.vy = -this.vy;
    // invertVertical.bind(ball);
   }
  //  console.log(this.paddle.x - 20)
  //  bouncing on the Paddle

    if(this.y + this.radius >= 450
      && this.x + this.vx >= this.paddle.x
      && this.x - this.vx <= this.paddle.x + 80
      && this.y + this.radius >= this.paddle.y
      && this.y + this.radius <= this.paddle.y + 15){
    // &&  && this.x + this.vx > this.paddle.x - 40 &&
      // debugger;
     this.vy = (this.vy)*-1;

      // this.x - this.vx < this.paddle.x + 40
   }

   return this;
};


module.exports = Ball;
