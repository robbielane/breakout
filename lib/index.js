import World from './world';
import Game from './game';

const displayScore = (score) => document.querySelector('.score').innerText = score;
const displayLives = (lives) => document.querySelector('.lives').innerText = lives;
const displayLevel = (level) => document.querySelector('.level').innerText = level;

function init () {
  const canvas = document.createElement('canvas');
  const world = new World(displayScore, displayLives, displayLevel);
  const game = new Game(canvas, world);

  canvas.id = 'game';
  canvas.height = world.height;
  canvas.width = world.width;
  document.getElementById('game-container').appendChild(canvas)

  displayScore(world.score);
  displayLives(world.lives);
  displayLevel(world.level);

  canvas.addEventListener('mousemove', function(e) {
      let worldX = canvas.getBoundingClientRect().left;
      if (e.clientX < worldX) {
          world.paddle.x = 0;
      } else if (e.offsetX > world.width - 80){
          world.paddle.x = world.width-80;
      } else if(e.offsetX < world.width - 80 ){
          world.paddle.x = e.offsetX;
      }
  });

  canvas.addEventListener('click', () => {
    game.start();
  });
};

init();
