var Ball = require('./ball');
var Paddle = require('./paddle.js');
var Block = require('./Block');


var World = function() {
  this.width = 600;
  this.height = 500;
  this.ball = new Ball(400, 400, "rgba(0, 255, 0, 1)");
  this.paddle = new Paddle(300, 450, '#C84848');
  this.blocksArray = createBlocks();
  this.score = 0;
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




// World.prototype.blockCollide = function() {
//     for ( var i = 0; i < this.blocksArray.length; i++){
//         if ( this.ball.x + this.ball.radius >= this.blocksArray[i].x &&
//           this.ball.y + this.ball.radius >= this.blocksArray[i].y &&
//           this.ball.x - this.ball.radius <= this.blocksArray[i].x + this.blocksArray[i].width &&
//           this.ball.y - this.ball.radius <= this.blocksArray[i].y + this.blocksArray[i].height){
//
//             this.ball['vy'] = this.ball['vy'] *- 1;
//             // this.ball['vx'] = this.ball['vx'] *- 1;
//             console.log('collison', this.blocksArray[i])
//             this.blocksArray.splice(i, 1);
//           }
//     }
// };

World.prototype.blockCollide = function(){
  for ( var i  = 0; i < this.blocksArray.length; i++){
    if (this.blockCollisionBottom(this.blocksArray[i])){
      this.ball['vy'] = this.ball['vy'] *- 1;
      this.blocksArray.splice(i, 1);
      this.score ++;
    } else if (this.blockCollisionBottom(this.blocksArray[i])){
      this.ball['vy'] = this.ball['vy'] *- 1;
      this.blocksArray.splice(i, 1);
      this.score ++;
    } else if (this.blockCollisonRight(this.blocksArray[i])){
      this.ball['vx'] = this.ball['vx'] *- 1;
      this.blocksArray.splice(i, 1);
      this.score ++;
    } else if (this.blockCollisonLeft(this.blocksArray[i])){
      this.ball['vx'] = this.ball['vx'] *- 1;
      this.blocksArray.splice(i, 1);
      this.score ++;
    } if (this.score === 40) {
      console.log('win function')
      alert("YOU WON!");
      document.location.reload();
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


// World.prototype.blockCollisonSide = function () {
//     for (var i = 0; i < this.blocksArray.length; i++){
//       if (this.ball.x + this.ball.radius >= this.blocksArray[i].x &&
//           this.ball.x - this.ball.radius <= this.blocksArray[i].x){
//             this.ball['vx'] = this.ball['vx'] *- 1;
//             this.blocksArray.splice(i, 1);
//           }
//         }
//       }
      //check if ball below block y  &&
      //check if ball above block y + block height
      //check if ball right of block x
      //check if ball left of block x + block width
      //problem is this seems same as original blockCollide function, need
      //to differentiate





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
