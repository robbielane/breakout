const Ball = require('./ball');
const Paddle = require('./paddle.js');
const Block = require('./Block');
const canvas = document.getElementById('game');
const scoreCount = document.querySelector('.score');
const livesCount = document.querySelector('.lives');
const levelCount = document.querySelector('.level');


class World {
  constructor (ctx) {
    this.width = 600;
    this.height = 500;
    this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 430, "rgba(0, 255, 0, 1)");
    this.paddle = new Paddle(300, 450, '#C84848');
    this.blocksArray = createBlocks();
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.win = false;
  }
  newLevelDraw (ctx) {
    this.blocksArray = createBlocks();
    this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 430, "rgba(0, 255, 0, 1)");

  }

  newLevel (ctx) {
    if ((this.score == 5  &&
      this.level == 1) ||
      (this.score == 10 && this.level == 2)) {
      this.level ++;
      this.levelUpdate()
      this.newLevelDraw(ctx);
    // } if (this.score == 10 && this.level == 2) {
    //   this.level ++;
    //   this.levelUpdate()
    //   this.newLevelDraw();
    // } if (this.score == 15 && this.level == 3) {
    //   this.level ++;
    //   this.levelUpdate()
    //   this.newLevelDraw();
    // }
  } else if (this.score == 15 && this.level == 3) {
    this.winGame(ctx)
  }
  }



  ceilingCollision () {
    if ( this.ball.y + this.ball.vy < 5 ) {
      this.ball.vy = -this.ball.vy;
    }
  }

  blockCollide(ctx) {
    for ( var i  = 0; i < this.blocksArray.length; i++) {
      if (this.blockCollisionTop(this.blocksArray[i]) ||
      this.blockCollisionBottom(this.blocksArray[i])) {
        this.ball['vy'] = this.ball['vy'] *- 1;
        this.blocksArray.splice(i, 1);
        this.score ++;
        this.scoreUpdate()
        this.newLevel(ctx)
      } else if (this.blockCollisonLeft(this.blocksArray[i]) ||
      this.blockCollisonRight(this.blocksArray[i])) {
        this.ball['vx'] = this.ball['vx'] *- 1;
        this.blocksArray.splice(i, 1);
        this.score ++;
        this.scoreUpdate()
        this.newLevel(ctx)
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

  paddleCollision () {
    if ( this.ball.x + this.ball.radius >= this.paddle.x && //ball inside paddle left end
      this.ball.x - this.ball.radius <= this.paddle.x + this.paddle.width && //ball inside paddle right end
      this.ball.y + this.ball.radius  > this.paddle.y &&  //ball below paddle top
      this.ball.y + this.ball.radius <= this.paddle.y + this.paddle.height) { //ball above paddle bottom

      this.ball.vy = (this.ball.vy) *- 1;
    }
  }

  sidePaddleCollision () {
    if ( this.ball.x + this.ball.radius <= this.paddle.x && //ball inside paddle left end
      this.ball.x - this.ball.radius >= this.paddle.x + this.paddle.width && //ball inside paddle right end
      this.ball.y + this.ball.radius >= this.paddle.y &&  //ball bellow paddle top
      this.ball.y + this.ball.radius <= this.paddle.y + this.paddle.height) { //ball above paddle bottom

      this.ball.vx = (this.ball.vx) *- 1;
    }
  }

  drawScore (ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = 'yellow';
    ctx.fillText("score: "+ this.score, 20, 140);
  }

  wallCollision () {
    if (this.ball.x + this.ball.vx > this.width - 5 ||
      this.ball.x + this.ball.vx < 5) {
      this.ball.vx = -this.ball.vx;
    }
  }

  bottomCollision (ctx) {
    this.livesUpdate()
    if (this.ball.y - 11 + this.ball.vy > canvas.height &&
        this.lives === 1) {
        this.gameOver(ctx)
    } else if (this.ball.y - 11 + this.ball.vy > canvas.height) {
      this.lives --;
      this.livesUpdate()
      this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 430, "rgba(0, 255, 0, 1)");
    }
  }

  gameOver(ctx) {
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = 'yellow';
    ctx.fillText("GAME OVER", 170, 240);
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillText("click to restart", 210, 270);
    restartGame();
  }

  winGame (ctx) {
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = 'yellow';
    ctx.fillText("You Win", 170, 240);
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillText("click to restart", 210, 270);
    this.win = true;
    // restartGame();
  }

  livesUpdate () {
    livesCount.innerText = this.lives
  }

  levelUpdate () {
    levelCount.innerText = this.level
  }

  scoreUpdate () {
    scoreCount.innerText = this.score
  }

  startGame (ctx) {
    if (this.ball.vx === 0 && this.ball.vy === 0) {
      ctx.font = "25px 'Press Start 2P'";
      ctx.fillStyle = 'yellow';
      ctx.fillText("CLICK TO START", 130, 240);
    }
    document.querySelector('canvas').addEventListener('click', () => {
      // console.log('levelCount', this.level)
      if (this.ball.vx === 0) {
        this.ball.vx = (3 + this.level);
        this.ball.vy = (-3 - this.level);
      }
    })
  }
}


function restartGame () {
  document.querySelector("canvas").addEventListener("click", function() {
    location.reload();
  });
}

function createBlocks() {
  var blokArray = [];

  for (let i = 0; i < 40; i++) {

    var x = 15+(i % 8) * 72;
    var y = 20+(i % 5) * 20;

    blokArray.push(new Block(x, y))
  }
  return blokArray;
}


module.exports = World;
