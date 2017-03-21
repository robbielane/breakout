import Ball from './ball';
import Paddle from'./paddle';
import Block from './block';

const canvas = document.getElementById('game');

export default class World {
  constructor (displayScore, displayLives, displayLevel) {
    this.width = 600;
    this.height = 500;
    this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 400, "rgba(0, 255, 0, 1)");
    this.paddle = new Paddle(300, 450, '#C84848');
    this.blocksArray = this.createBlocks();
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.displayScore = displayScore;
    this.displayLives = displayLives;
    this.displayLevel = displayLevel;
  }

  createBlocks() {
    const blokArray = [];
    for (var i = 0; i < 40; i++) {
      var x = 15+(i % 8) * 72;
      var y = 20+(i % 5) * 20;

      blokArray.push( new Block( { x: x, y: y} ));
    };
    return blokArray;
  };

  newLevel () {
    this.blocksArray = this.createBlocks();
    this.ball = new Ball((Math.floor(Math.random() * (599 - 1)) + 1), 400, "rgba(0, 255, 0, 1)");
  };

  blockCollide() {
    for (var i  = 0; i < this.blocksArray.length; i++) {
      switch (this.blocksArray[i].collision(this.ball)) {
        case 'left':
        case 'right':
          this.ball['vx'] = this.ball['vx'] *- 1;
          this.blocksArray.splice(i, 1);
          this.score ++;
          this.displayScore(this.score);
          break;
        case 'top':
        case 'bottom':
          this.ball['vy'] = this.ball['vy'] *- 1;
          this.blocksArray.splice(i, 1);
          this.score ++;
          this.displayScore(this.score);
          break;
        default:
          break; // No Block Collison
      }
    }
  };

  levelWon () {
    if (this.blocksArray.length === 0) {
      console.log('win function', this.level)
      this.level ++;
      this.displayLevel(this.level);
      this.newLevel();
    }
  };

  wallCollision () {
    if (this.ball.x + this.ball.vx > this.width - 5 || this.ball.x + this.ball.vx < 5) {
      this.ball.vx = -this.ball.vx;
    }
  }

  bottomCollision (ctx) {
    if (this.ball.y - 11 + this.ball.vy > this.height && this.lives === 1) {
      this.gameOver(ctx);
    } else if (this.ball.y - 11 + this.ball.vy > this.height) {
      this.decrementLives();
    }
  }

  ceilingCollision () {
    if (this.ball.y + this.ball.vy < 5) {
      this.ball.vy = -this.ball.vy;
    }
  }

  decrementLives () {
    this.lives --;
    this.displayLives(this.lives);
    this.ball = new Ball(400, 400, "rgba(0, 255, 0, 1)");
  }

  gameOver (ctx) {
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = 'yellow';
    ctx.fillText("GAME OVER", 170, 240);
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillText("click to restart", 210, 270);
    restartGame();
  }

}


function restartGame () {
  document.querySelector("canvas").addEventListener("click",function(){
    location.reload();
  });
}
