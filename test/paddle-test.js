const World = require('../lib/world')
const Paddle = require('../lib/paddle');
const assert = require('chai').assert

describe('Paddle', () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let world = new World(canvas);

  it('should be a function', () =>{
    assert.isFunction(Paddle)
  })

  it('should have a standard y value', () => {
    assert.equal(world.paddle.y, 450)
  })

  it('should have a width', () => {
    assert.equal(world.paddle.width, 80)
  })

  it('should have a height', () => {
    assert.equal(world.paddle.height, 15)
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

  it('should not change ball velocity if the ball is above the paddle', () => {
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x = 301;
    world.ball.y = 400;
    world.paddleCollision();
    assert.equal(world.ball.vy, -4);
  })

  it('should not change ball velocity if the ball is right of the paddle', () => {
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x = 400;
    world.ball.y = 441;
    world.paddleCollision();
    assert.equal(world.ball.vy, -4);
  })

  it('should not change ball velocity if the ball is left of the paddle', () => {
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x = 100;
    world.ball.y = 441;
    world.paddleCollision();
    assert.equal(world.ball.vy, -4);
  })

  it('should not change ball velocity if the ball is under the paddle', () => {
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x = 301;
    world.ball.y = 470;
    world.paddleCollision();
    assert.equal(world.ball.vy, -4);
  })


})
