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
  var blokArray = [];
  for (var i = 0; i < 40; i++){

    var x = 15+(i % 8) * 72;
    var y = 20+(i % 5) * 20;
    blokArray.push(new Block({ x: x, y: y}));
    // console.log(blok[i])
  };
  return blokArray;
};

// var notCollidingWithAnything = function(b1) {
//                     return bodies.filter(function(b2) {
//                         world.blockCollide();
//                     }).length === 0;
//                 }
//                 this.bodies = this.bodies.filter(notCollidingWithAnything);
//                 for (var i = 0; i < this.bodies.length; i++) {
//                     this.bodies[i].update();
//                 };



World.prototype.blockCollide = function() {
    for (var i = 0; i < this.blocksArray.length; i++){
        if (this.ball.x + this.ball.radius >= this.blocksArray[i].x &&
          this.ball.y + this.ball.radius >= this.blocksArray[i].y &&
          this.ball.x - this.ball.radius <= this.blocksArray[i].x + 67 &&
          this.ball.y - this.ball.radius <= this.blocksArray[i].y + 15){

            this.ball['vy'] = this.ball['vy'] *- 1;
            this.ball['vx'] = this.ball['vx'] *- 1;
            console.log('collison', this.blocksArray[i])
            this.blocksArray.splice(i, 1);
          }
    }
  };

// World.prototype.blockCollision = function () {
//   blocksArray.forEach(function(block){
//     // if (this.x + this.radius >= Block.x && //ball inside paddle left end
//     //     this.x - this.radius <= Block.x + Block.width && //ball inside paddle right end
//     //     this.y + this.radius  > Block.y &&  //ball below paddle top
//     //     this.y + this.radius <= Block.y + Block.height){ //ball above paddle bottom)
//
//
//
//
//
// // for bottom of block
//     //ball inside paddle left end
//   //ball inside paddle right end
//   //ball  paddle top
//   //ball above paddle bottom
//   // }
// }





module.exports = World;
