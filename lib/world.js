const Ball = require('./ball');
const Paddle = require('./paddle.js');
const Block = require('./Block');
const canvas = document.getElementById('game');
const scoreCount = document.querySelector('.score');
const livesCount = document.querySelector('.lives');
const levelCount = document.querySelector('.level');


class World {
  constructor () {
    this.width = 600;
    this.height = 500;
    this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 400, "rgba(0, 255, 0, 1)");
    this.paddle = new Paddle(300, 450, '#C84848');
    this.blocksArray = createBlocks();
    this.score = 0;
    this.lives = 3;
    this.level = 1;
  }
  newLevel () {
    this.blocksArray = createBlocks();
    this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 400, "rgba(0, 255, 0, 1)");

  }

  blockCollide() {
    for ( var i  = 0; i < this.blocksArray.length; i++){
      if (this.blockCollisionTop(this.blocksArray[i]) ||
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
  }

  blockCollisonLeft (block) {
    if (this.ball.x + this.ball.radius >= block.x &&
      this.ball.x + this.ball.radius <= block.x + 7 &&
      this.ball.y + this.ball.radius >= block.y &&
      this.ball.y - this.ball.radius <= block.y + block.height)
    return true;
  }

  blockCollisonRight (block) {
    if (this.ball.x + this.ball.radius >= block.x + 60 &&
      this.ball.x + this.ball.radius <= block.x + block.width &&
      this.ball.y + this.ball.radius >= block.y &&
      this.ball.y - this.ball.radius <= block.y + block.height)
    return true;
  }

  blockCollisionBottom (block) {
    if (this.ball.x + this.ball.radius >= block.x  &&
      this.ball.x - this.ball.radius <= block.x + block.width &&
      this.ball.y - this.ball.radius >= block.y + 10 &&
      this.ball.y - this.ball.radius <= block.y + block.height)
    return true;
  }

  blockCollisionTop (block) {
    if (this.ball.x + this.ball.radius >= block.x  &&
      this.ball.x - this.ball.radius <= block.x + block.width &&
      this.ball.y + this.ball.radius >= block.y &&
      this.ball.y + this.ball.radius <= block.y + 5)
    return true;
  }

  drawScore (ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = 'yellow';
    ctx.fillText("score: "+ this.score, 20, 140);
  }

  wallCollision () {
    if(this.ball.x + this.ball.vx > canvas.width - 5 ||
      this.ball.x + this.ball.vx < 5){
      this.ball.vx = -this.ball.vx;
    }
  }

  bottomCollision (ctx) {
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


  startGame (ctx) {
    if (this.ball.vx === 0 && this.ball.vy === 0){
      ctx.font = "25px 'Press Start 2P'";
      ctx.fillStyle = 'yellow';
      ctx.fillText("CLICK TO START", 130, 240);
    }
    document.querySelector('canvas').addEventListener('click', () => {
      // console.log('levelCount', this.level)
        if(this.ball.vx === 0){
        this.ball.vx = (3 + this.level);
        this.ball.vy = (-3 - this.level);
      }
    })
  }
}


function restartGame () {
  document.querySelector("canvas").addEventListener("click",function(){
    location.reload();
    });
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


module.exports = World;
