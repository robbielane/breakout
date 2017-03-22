
const World = require('../lib/world')
const Ball = require('../lib/ball')
const assert = require('chai').assert

describe('ball', () => {
  let ball = new Ball();
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const world = new World(canvas);
  let livesCount = document.createElement('h3').classList += 'lives'
  var newContent = document.createTextNode("1");

  livesCount.innerText = "1"

  // livesCount.appendChild(newContent);

  it('should be a function', () =>{
    assert.isFunction(Ball)
  })

  it('should instantiate a new ball', () => {
    var ball = new Ball();
    assert.isObject(ball);
  })

  it('should have a radius', () => {
    assert.equal(world.ball.radius, 10)
  })

  it('should have a default x velocity', () =>{
    var ball = new Ball();
    assert.equal(ball.vx, 0)
  })

  it('should have a default y velocity', () =>{
    var ball = new Ball();
    assert.equal(ball.vy, 0)
  })


  it('should dissappear when hitting the bottom', ()=> {
    world.bottomCollision();
    assert.isNotObject(ball);
  })

})

// module.exports = Ball;




  // it('deck creator is function', () => {
  //   assert.isFunction(Deck);
  // });
