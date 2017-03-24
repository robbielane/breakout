/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const World = __webpack_require__(1);
	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');
	const world = new World(ctx);
	const newGameBtn = document.getElementById('start-new-game');

	requestAnimationFrame(function gameLoop() {

	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  world.paddle.draw(ctx);
	  world.wallCollision();
	  world.ceilingCollision();
	  world.bottomCollision(ctx);
	  world.paddleCollision(world.paddle);

	  ctx.fillStyle = "#556BFC";
	  for (var i = 0; i < world.blocksArray.length; i++) {
	    world.blocksArray[i].draw(ctx);
	  }
	  world.startGame(ctx);
	  world.ball.move().draw(ctx);
	  world.blockCollide(ctx);

	  if (world.win == false) {
	    requestAnimationFrame(gameLoop);
	  }
	});

	world.movePaddle();

	newGameBtn.addEventListener('click', function () {
	  window.location.reload();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ball = __webpack_require__(2);
	const Paddle = __webpack_require__(3);
	const Block = __webpack_require__(4);
	const canvas = document.getElementById('game');
	const scoreCount = document.querySelector('.score');
	const livesCount = document.querySelector('.lives');
	const levelCount = document.querySelector('.level');

	class World {
	  constructor() {
	    this.width = 600;
	    this.height = 500;
	    this.ball = new Ball(Math.floor(Math.random() * (599 - 1)) + 1, 430, "rgba(0, 255, 0, 1)");
	    this.paddle = new Paddle(300, 450, '#C84848');
	    this.blocksArray = createBlocks();
	    this.score = 0;
	    this.lives = 3;
	    this.level = 1;
	    this.win = false;
	    this.image = new Image();
	    this.blockDestroySound = new Audio("/breakout/sounds/hoha.mp3");
	    this.paddleSound = new Audio("/breakout/sounds/suh.mp3");
	    this.winSound = new Audio("/breakout/sounds/lit.mp3");
	  }

	  movePaddle() {
	    document.addEventListener('mousemove', function (e) {

	      let worldX = canvas.getBoundingClientRect().left;

	      if (e.clientX < worldX) {
	        this.paddle.x = 0;
	      } else if (e.offsetX > this.width - 80) {
	        this.paddle.x = this.width - 80;
	      } else if (e.offsetX < this.width - 80) {
	        this.paddle.x = e.offsetX;
	      }
	    }.bind(this));
	  }

	  //canvas borders collision
	  ceilingCollision() {
	    if (this.ball.y + this.ball.vy < 5) {
	      this.ball.vy = -this.ball.vy;
	    }
	  }

	  wallCollision() {
	    if (this.ball.x + this.ball.vx > this.width - 5 || this.ball.x + this.ball.vx < 5) {
	      this.ball.vx = -this.ball.vx;
	    }
	  }

	  bottomCollision(ctx) {
	    this.livesUpdate();
	    if (this.ball.y - 11 + this.ball.vy > canvas.height && this.lives === 1) {
	      this.gameOver(ctx);
	    } else if (this.ball.y - 11 + this.ball.vy > canvas.height) {
	      this.lives--;
	      this.livesUpdate();
	      this.ball = new Ball(Math.floor(Math.random() * (599 - 1)) + 1, 430, "rgba(0, 255, 0, 1)");
	    }
	  }

	  //blocks collision
	  blockCollide(ctx) {
	    for (var i = 0; i < this.blocksArray.length; i++) {
	      if (this.blockCollisionTop(this.blocksArray[i]) || this.blockCollisionBottom(this.blocksArray[i])) {
	        this.ball['vy'] = this.ball['vy'] * -1;
	        this.blocksArray.splice(i, 1);
	        this.blockDestroySound.play();
	        this.resultsUpdate(ctx);
	      } else if (this.blockCollisonLeft(this.blocksArray[i]) || this.blockCollisonRight(this.blocksArray[i])) {
	        this.ball['vx'] = this.ball['vx'] * -1;
	        this.blocksArray.splice(i, 1);
	        this.blockDestroySound.play();
	        this.resultsUpdate(ctx);
	      }
	    }
	  }

	  resultsUpdate(ctx) {
	    this.score++;
	    this.scoreUpdate();
	    this.newLevel(ctx);
	  }

	  blockCollisonLeft(block) {
	    let blockLeftZone = block.x + 7;

	    if (this.ball.x + this.ball.radius >= block.x && this.ball.x + this.ball.radius <= blockLeftZone && this.ball.y + this.ball.radius >= block.y && this.ball.y - this.ball.radius <= block.y + block.height) return true;
	  }

	  blockCollisonRight(block) {
	    let blockRightZone = block.x + 60;

	    if (this.ball.x + this.ball.radius >= blockRightZone && this.ball.x + this.ball.radius <= block.x + block.width && this.ball.y + this.ball.radius >= block.y && this.ball.y - this.ball.radius <= block.y + block.height) return true;
	  }

	  blockCollisionBottom(block) {
	    let blockBottomZone = block.y + 10;

	    if (this.ball.x + this.ball.radius >= block.x && this.ball.x - this.ball.radius <= block.x + block.width && this.ball.y - this.ball.radius >= blockBottomZone && this.ball.y - this.ball.radius <= block.y + block.height) return true;
	  }

	  blockCollisionTop(block) {
	    let blockTopZone = block.y + 5;

	    if (this.ball.x + this.ball.radius >= block.x && this.ball.x - this.ball.radius <= block.x + block.width && this.ball.y + this.ball.radius >= block.y && this.ball.y + this.ball.radius <= blockTopZone) return true;
	  }

	  //paddle collision
	  paddleCollision() {
	    let radius = this.ball.radius;

	    if (this.ball.y + radius >= this.paddle.y && this.ball.y - radius <= this.paddle.y + this.paddle.height) {
	      this.paddleCollisionTop();
	      this.paddleCollisionTopLeft();
	      this.paddleCollisionTopRight();
	    }
	  }

	  paddleCollisionTop() {
	    if (this.ball.x + this.ball.radius >= this.paddle.x - 1 && this.ball.x - this.ball.radius <= this.paddle.x + this.paddle.width + 1) {
	      this.ball.vy = this.ball.vy * -1;
	      this.paddleSound.play();
	    }
	  }

	  paddleCollisionTopLeft() {
	    let paddleLeftZone = 25;
	    let radius = this.ball.radius;

	    if (this.ball.x + radius >= this.paddle.x && this.ball.x + radius < this.paddle.x + paddleLeftZone && this.ball.vx > 0) {
	      this.ball.vx = this.ball.vx * -1;
	      this.paddleSound.play();
	    }
	  }

	  paddleCollisionTopRight() {
	    let paddleRightZone = 55;
	    let radius = this.ball.radius;

	    if (this.ball.x - radius <= this.paddle.x + this.paddle.width && this.ball.x - radius > this.paddle.x + paddleRightZone && this.ball.vx < 0) {
	      this.ball.vx = this.ball.vx * -1;
	      this.paddleSound.play();
	    }
	  }

	  //scores
	  livesUpdate() {
	    livesCount.innerText = this.lives;
	  }

	  levelUpdate() {
	    levelCount.innerText = this.level;
	  }

	  scoreUpdate() {
	    scoreCount.innerText = this.score;
	  }

	  newLevel(ctx) {
	    if (this.score == 40 && this.level == 1 || this.score == 80 && this.level == 2) {
	      this.level++;
	      this.levelUpdate();
	      this.newLevelDraw(ctx);
	    } else if (this.score == 120 && this.level == 3) {
	      this.winGame(ctx);
	    }
	  }

	  newLevelDraw() {
	    this.blocksArray = createBlocks();
	    this.ball = new Ball(Math.floor(Math.random() * (599 - 1)) + 1, 430, "rgba(0, 255, 0, 1)");
	  }

	  gameOver(ctx) {
	    ctx.font = "30px 'Just Me Again Down Here'";
	    ctx.fillStyle = '#FEC325';
	    ctx.fillText("GAME OVER", 170, 240);
	    ctx.font = "12px 'Just Me Again Down Here'";
	    ctx.fillText("click to restart", 210, 270);
	    restartGame();
	  }

	  winGame(ctx) {

	    ctx.font = "40px 'Just Me Again Down Here'";
	    ctx.fillStyle = '#FEC325';
	    ctx.fillText("Suh Dude,You Win", 180, 240);
	    ctx.font = "24px 'Just Me Again Down Here'";
	    ctx.fillText("Click the button below to restart fam", 150, 290);
	    ctx.font = "30px 'Just Me Again Down Here'";
	    ctx.fillText("it's so lit right now", 200, 330);

	    this.win = true;
	    this.winSound.play();
	  }

	  startGame(ctx) {
	    if (this.ball.vx === 0 && this.ball.vy === 0) {
	      ctx.font = "25px 'Just Me Again Down Here'";
	      ctx.fillStyle = '#FEC325';
	      ctx.fillText("CLICK TO START FAM", 200, 240);
	    }
	    document.querySelector('canvas').addEventListener('click', () => {
	      if (this.ball.vx === 0) {
	        this.ball.vx = 3 + this.level;
	        this.ball.vy = -3 - this.level;
	      }
	    });
	  }
	}

	function restartGame() {
	  document.querySelector("canvas").addEventListener("click", function () {
	    location.reload();
	  });
	}

	function createBlocks() {
	  var blokArray = [];

	  for (let i = 0; i < 40; i++) {

	    var x = 15 + i % 8 * 72;
	    var y = 20 + i % 5 * 20;

	    blokArray.push(new Block(x, y));
	  }
	  return blokArray;
	}

	module.exports = World;

/***/ },
/* 2 */
/***/ function(module, exports) {

	class Ball {
	  constructor(x, y, color) {
	    this.vx = 0;
	    this.vy = 0;
	    this.x = x;
	    this.y = y;
	    this.radius = 10;
	    this.color = color;
	    this.image = new Image();
	  }

	  draw(ctx) {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();

	    this.image.src = '/breakout/images/jhun.png';
	    ctx.drawImage(this.image, this.x - 10, this.y - 10, 20, 20);

	    return this;
	  }

	  move() {
	    this.x += this.vx;
	    this.y += this.vy;
	    return this;
	  }

	}

	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	class Paddle {
	  constructor(x, y, color) {
	    this.x = x;
	    this.y = y;
	    this.color = color;
	    this.height = 15;
	    this.width = 80;
	    this.image = new Image();
	  }

	  draw(ctx) {
	    ctx.fillStyle = '#FEC325';
	    ctx.fillRect(this.x, this.y, this.width, 3);
	    ctx.fillStyle = '#000000';
	    ctx.fillRect(this.x + 25, this.y, 30, 3);
	    this.image.src = '/breakout/images/skateboard.png';
	    ctx.drawImage(this.image, this.x, this.y - 13, this.width, 45);

	    return this;
	  }
	}

	module.exports = Paddle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	class Block {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.height = 15;
	    this.width = 67;
	    this.image = new Image();
	  }

	  draw(ctx) {

	    this.image.src = '/breakout/images/burritorb.jpg';
	    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

	    return this;
	  }
	}

	module.exports = Block;

/***/ }
/******/ ]);