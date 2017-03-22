const World = require('../lib/world')
const Paddle = require('../lib/paddle')
const Ball = require('../lib/ball')
const assert = require('chai').assert

describe('Paddle', () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let world = new World(canvas);

  it('should be a function', () =>{
    assert.isFunction(Paddle)
  })


  it('should change ball y velocity when hitting the top of the paddle', () => {
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x = 301;
    world.ball.y = 441;
    world.paddleCollision();
    assert.equal(world.ball.x, 301)
    assert.equal(world.ball.radius, 10)
    assert.equal(world.ball.vy, 4);
  })

  it('should move with the mouse', () => {
    
  })

})
