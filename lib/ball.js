var Paddle = require('./paddle');
var World = require('./world');
var gameCanvas = document.querySelector('#game');

var Ball = function(x, y, color){
  this.vx= 3;
  this.vy = -3;
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

//  function invertVertical() {
//     this.vy = -this.vy;
//  }
 Ball.prototype.move = function (paddle) {
  this.x += this.vx;
  this.y += this.vy;

  // collision detection for walls
  if(this.x + this.vx > gameCanvas.width - 5 ||
      this.x + this.vx < 5){

   this.vx = -this.vx;
  }

  // collision detection for ceiling
  if( this.y + this.vy < 5 ){
    this.vy = -this.vy;
    // invertVertical.bind(ball);
  }

  //  console.log(paddle.x - 20)
  //  bouncing on the Paddle

  // collision detection for paddle
  var paddleHeight = 450;

  if( this.x + this.radius >= paddle.x &&// are we below or even w paddle height
      this.x - this.radius <= paddle.x + paddle.width &&
      this.y + this.radius  > paddle.y &&
      this.y + this.radius <= paddle.y + paddle.height){

    this.vy = (this.vy) *- 1;

    // this.x - this.vx < paddle.x + 40
  }

   return this;
};


module.exports = Ball;
