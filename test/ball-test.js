var assert = require('chai').assert;
var Ball = require('../lib/ball')
var World = require('../lib/world')

describe('ball', () => {

it('should be a function', ()=>{
  assert.isFunction(Ball)
})

it('should instantiate a new ball', () => {
  var ball = new Ball();
  assert.isObject(ball);
})

it('should have a default x velocity', ()=>{
  var ball = new Ball();
  assert.equal(ball.vx, 3)
})

it('should have a default y velocity', ()=>{
  var ball = new Ball();
  assert.equal(ball.vy, -3)
})

it('should change X velocity when hitting the side wall', ()=>{
  var ball = new Ball();
  assert.equal(ball.vx, 3);
  ball.wallCollision();
  assert.equal(ball.vx, -3)
})

it.skip('should change Y velocity when hitting the top wall', ()=>{
  var ball = new Ball();
  assert.equal(ball.vy, -3);
  ceilingCollision();
  assert.equal(ball.vy, 3)
})

it.skip('should change Y velocity when hitting the paddle', ()=>{
  var ball = new Ball();
  assert.equal(ball.vy, -4);
  ballCollidePaddle();
  assert.equal(ball.vy, 4)
})


it.skip('should dissappear when hitting the bottom', ()=> {
  var ball = new Ball();
  ballCollideBottom();
  assert.isNotObject(ball);
})

})

module.exports = Ball;




  // it('deck creator is function', () => {
  //   assert.isFunction(Deck);
  // });
