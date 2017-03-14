var assert = require('chai').assert;
var Ball = require('../lib/ball')

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
  assert.equal(ball.velocityX, 4)
})

it('should have a default y velocity', ()=>{
  var ball = new Ball();
  assert.equal(ball.velocityY, 4)
})

it.skip('should change X velocity when hitting the side wall', ()=>{
  var ball = new Ball();
  assert.equal(ball.velocityX, 4);
  ballCollideSide();
  assert.equal(ball.velocityX, -4)
})

it.skip('should change Y velocity when hitting the top wall', ()=>{
  var ball = new Ball();
  assert.equal(ball.velocityY, 4);
  ballCollideTop();
  assert.equal(ball.velocityY, -4)
})

it.skip('should change Y velocity when hitting the paddle', ()=>{
  var ball = new Ball();
  assert.equal(ball.velocityY, -4);
  ballCollidePaddle();
  assert.equal(ball.velocityY, 4)
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
