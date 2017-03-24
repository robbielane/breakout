class Ball {
  constructor (x, y, color) {
    this.vx = 0
    this.vy = 0
    this.x = x
    this.y= y
    this.radius = 10
    this.color = color
    this.image = new Image()
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()

    this.image.src = 'images/jhun.png'
    ctx.drawImage(this.image, this.x -10, this.y -10, 20, 20)

    return this;
  }

  move () {
    this.x += this.vx
    this.y += this.vy
    return this
  }

}


module.exports = Ball
