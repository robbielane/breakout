
class Paddle {
  constructor (x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.height = 15
    this.width = 80
    this.image = new Image()
  }

  draw(ctx) {
    ctx.fillStyle = '#FEC325'
    ctx.fillRect(this.x, this.y, this.width, 3)
    ctx.fillStyle = '#000000'
    ctx.fillRect (this.x + 25, this.y, 30, 3)
    this.image.src = 'images/skateboard.png';
    ctx.drawImage(this.image, this.x, this.y -13, this.width, 45)

    return this
  }
}

module.exports = Paddle
