var Ball = require('./ball');
var Paddle = require('./paddle.js');
var Block = require('./Block');
var canvas = document.getElementById('game');
var scoreCount = document.querySelector('.score');
var livesCount = document.querySelector('.lives');
var levelCount = document.querySelector('.level');
var ctx = canvas.getContext('2d');




var World = function() {
  this.width = 600;
  this.height = 500;
  // this.ball = new Ball(400, 400, "rgba(0, 255, 0, 1)");
  this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 400, "rgba(0, 255, 0, 1)");
  this.paddle = new Paddle(300, 450, '#C84848');
  this.blocksArray = createBlocks();
  this.score = 0;
  this.lives = 3;
  this.level = 1;
}

function createBlocks() {
  var blokArray = [];
  for (var i = 0; i < 40; i++){

    var x = 15+(i % 8) * 72;
    var y = 20+(i % 5) * 20;
    blokArray.push(new Block({ x: x, y: y}));
  };
  return blokArray;
};

World.prototype.newLevel = function(){
  this.blocksArray = createBlocks();
  this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 400, "rgba(0, 255, 0, 1)");
}

World.prototype.blockCollide = function(){
  for ( var i  = 0; i < this.blocksArray.length; i++){
    if (this.blockCollisionBottom(this.blocksArray[i]) ||
        this.blockCollisionBottom(this.blocksArray[i])){
      this.ball['vy'] = this.ball['vy'] *- 1;
      this.blocksArray.splice(i, 1);
      this.score ++;
      scoreCount.innerText = this.score;
  } else if (this.blockCollisonLeft(this.blocksArray[i]) ||
            this.blockCollisonRight(this.blocksArray[i])) {
      this.ball['vx'] = this.ball['vx'] *- 1;
      this.blocksArray.splice(i, 1);
      this.score ++;
      scoreCount.innerText = this.score;
    } if (scoreCount.innerText == 5  && this.level == 1) {
      console.log('win function', this.level)
      this.level ++;
      levelCount.innerText = this.level;
      // alert("YOU WON!");
      // location.reload();
      this.newLevel();
    } if (scoreCount.innerText == 10 && this.level == 2){
      this.level ++;
      levelCount.innerText = this.level;
      // alert("YOU WON!");
      // location.reload();
      this.newLevel();
    } if (scoreCount.innerText == 15 && this.level == 3){
      this.level ++;
      levelCount.innerText = this.level;
      // alert("YOU WON!");
      // location.reload();
      this.newLevel();
    }

  }
};

World.prototype.blockCollisonLeft = function (block) {
  if (this.ball.x + this.ball.radius >= block.x &&
      this.ball.x + this.ball.radius <= block.x + 7 &&
      this.ball.y + this.ball.radius >= block.y &&
      this.ball.y - this.ball.radius <= block.y + block.height)
    return true;
}

World.prototype.blockCollisonRight = function (block) {
  if (this.ball.x + this.ball.radius >= block.x + 60 &&
      this.ball.x + this.ball.radius <= block.x + block.width &&
      this.ball.y + this.ball.radius >= block.y &&
      this.ball.y - this.ball.radius <= block.y + block.height)
    return true;
}

World.prototype.blockCollisionBottom = function (block) {
  if (this.ball.x + this.ball.radius >= block.x  &&
      this.ball.x - this.ball.radius <= block.x + block.width &&
      this.ball.y - this.ball.radius >= block.y + 10 &&
      this.ball.y - this.ball.radius <= block.y + block.height)
    return true;
}

World.prototype.blockCollisionTop = function (block) {
  if (this.ball.x + this.ball.radius >= block.x  &&
      this.ball.x - this.ball.radius <= block.x + block.width &&
      this.ball.y + this.ball.radius >= block.y &&
      this.ball.y + this.ball.radius <= block.y + 5)
    return true;
}

World.prototype.drawScore = function (ctx) {
  ctx.font = "16px Arial";
  ctx.fillStyle = 'yellow';
  ctx.fillText("score: "+ this.score, 20, 140);
}


World.prototype.wallCollision = function() {
  if(this.ball.x + this.ball.vx > canvas.width - 5 ||
    this.ball.x + this.ball.vx < 5){
    this.ball.vx = -this.ball.vx;
  }
}

World.prototype.bottomCollision = function(ctx) {
  livesCount.innerText = this.lives;
  if (this.ball.y - 11 + this.ball.vy > canvas.height &&
      this.lives === 1) {
        ctx.font = "30px 'Press Start 2P'";
        ctx.fillStyle = 'yellow';
        ctx.fillText("GAME OVER", 170, 240);
        ctx.font = "12px 'Press Start 2P'";
        ctx.fillText("click to restart", 210, 270);
        restartGame();
     } else if (this.ball.y - 11 + this.ball.vy > canvas.height) {
     this.lives --;
     livesCount.innerText = this.lives;
     this.ball = new Ball(400, 400, "rgba(0, 255, 0, 1)");
   }
}


World.prototype.startGame = function(ctx) {
  if (this.ball.vx === 0 && this.ball.vy === 0){
    ctx.font = "25px 'Press Start 2P'";
    ctx.fillStyle = 'yellow';
    ctx.fillText("CLICK TO START", 130, 240);
  }

  document.querySelector('canvas').addEventListener('click', () => {
    console.log('levelCount', this.level)
    this.ball.vx = (3 + this.level);
    this.ball.vy = (-3 - this.level);


  })
}

function restartGame () {
  document.querySelector("canvas").addEventListener("click",function(){
    location.reload();
    });
}




module.exports = World;
