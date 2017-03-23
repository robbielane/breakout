const World = require('../lib/world')
const Ball = require('../lib/ball')
const assert = require('chai').assert

describe('Ball', () => {
  let ball = new Ball(300, 400, 'green');
  const canvas = document.createElement('canvas')
  const world = new World(canvas);

  it('should be a function', () =>{
    assert.isFunction(Ball)
  })

  it('should instantiate a new ball', () => {
    assert.isObject(ball);
  })

  it('should have a radius', () => {
    assert.equal(world.ball.radius, 10)
  })

  it('should have a default x velocity', () =>{
    assert.equal(ball.vx, 0)
  })

  it('should have a default y velocity', () =>{
    assert.equal(ball.vy, 0)
  })

  it('should have a color', () => {
    assert.equal(ball.color, 'green')
  })

  it('should create a new ball when ball hits the bottom', ()=> {
    ball.y == 520
    world.bottomCollision();
    assert.equal(world.ball.y, 430);
  })

})
