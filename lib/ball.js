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

 Ball.prototype.move = function (direction) {
   //if statement (this.x > canvas.width)
   //then this.x -= this.direction.x

  //  this.x += direction.x;
  //  this.y += direction.y;
  this.x += this.vx;
  this.y += this.vy;

// function to bounce from video
   if(this.x + this.vx > gameCanvas.width || this.x + this.vx < 0){
     this.vx = -this.vx;
   }

   if(this.y + this.vy > gameCanvas.height || this.y + this.vy < 0){
     this.vy = -this.vy;
   }


//    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
//   ball.vx = -ball.vx;
// }
   //
  //  this.center.x += this.speedX;
  //  this.locationX += this.speedX;

   return this;
};

module.exports = Ball;
