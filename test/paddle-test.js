const World = require('../lib/world')
const Paddle = require('../lib/paddle')
const Ball = require('../lib/ball')
const assert = require('chai').assert

describe('Paddle', () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const world = new World(canvas);

  it('should be a function', () =>{
    assert.isFunction(Paddle)
  })


  it.skip('should work', () => {
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x + world.ball.radius == 200;
    world.ball.x - world.ball.radius == 180;
    world.ball.y + world.ball.radius == 451;
    world.paddle.x = 190;
    world.paddleCollision();
    assert.equal(world.ball.vy, 4);
  })

})
