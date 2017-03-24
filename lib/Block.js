class Block {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.height = 15
    this.width = 67
    this.image = new Image()
  }

  draw (ctx) {

    this.image.src = 'images/burritorb.jpg'
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

    return this
  }
}


module.exports = Block
