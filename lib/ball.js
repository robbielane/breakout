var Paddle = require('./paddle');
var World = require('./world');
// var gameCanvas = document.querySelector('#game');

class Ball {
  constructor (x, y, color) {
    this.vx= 0;
    this.vy = 0;
    this.x = x;
    this.y= y;
    this.radius = 10;
    this.color = color;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    return this;
  }

  move () {
    this.x += this.vx;
    this.y += this.vy;
    return this;
  }

  ceilingCollision () {
    if( this.y + this.vy < 5 ){
      this.vy = -this.vy;
    }
  }

  paddleCollision (paddle) {
    if( this.x + this.radius >= paddle.x && //ball inside paddle left end
      this.x - this.radius <= paddle.x + paddle.width && //ball inside paddle right end
      this.y + this.radius  > paddle.y &&  //ball below paddle top
      this.y + this.radius <= paddle.y + paddle.height){ //ball above paddle bottom

        this.vy = (this.vy) *- 1;
    }
  }

  sidePaddleCollision (paddle) {
    if( this.x + this.radius <= paddle.x && //ball inside paddle left end
      this.x - this.radius >= paddle.x + paddle.width && //ball inside paddle right end
      this.y + this.radius >= paddle.y &&  //ball bellow paddle top
      this.y + this.radius <= paddle.y + paddle.height){ //ball above paddle bottom

      this.vx = (this.vx) *- 1;
    }
  }

}







module.exports = Ball;
