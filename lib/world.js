var Ball = require('./ball');
var Paddle = require('./paddle.js');
var Block = require('./Block');


var World = function() {
  this.width = 600;
  this.height = 500;
  this.ball = new Ball(400, 400, "rgba(0, 255, 0, 1)");
  this.paddle = new Paddle(300, 450, '#C84848');
  this.blocksArray = createBlocks();
}


function createBlocks() {
  var blok = [];
  for (var i = 0; i < 24; i++){

    var x = 30+(i % 6) * 50;
    var y =30+(i % 4) *20;
    blok.push(new Block({ x: x, y: y}));
    console.log(blok);
  };
  return blok;
};


module.exports = World;
