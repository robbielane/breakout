function Block (options) {
  this.x = options.x;
  this.y = options.y;
  this.height = 15;
  this.width = 50;
  // this.blocksRows = 3;
	// this.blocksColumns = 6;
	// this.blockWidth = 50;
	// this.blockHeight = 20;
	// this.blockPadding = 10;
}






Block.prototype.draw = function (ctx) {
  // ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

//
// let blocks = [];
// for(c=0; c<blocksColumns; c++) {
//   blocks[c] = [];
//   for r=0; r<blocksRows; r++) {
//     blocks[c][r] = {x:0, y:0};
//   }
// }




module.exports = Block;
