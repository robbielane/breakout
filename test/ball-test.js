
import World from '../lib/world'
import Ball from '../lib/ball'
import {assert} from 'chai'

describe('ball', () => {
  let ball = new Ball();
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  it('should be a function', () =>{
    assert.isFunction(Ball)
  })

  it('should instantiate a new ball', () => {
    var ball = new Ball();
    assert.isObject(ball);
  })

  it('should have a default x velocity', () =>{
    var ball = new Ball();
    assert.equal(ball.vx, 0)
  })

  it('should have a default y velocity', () =>{
    var ball = new Ball();
    assert.equal(ball.vy, 0)
  })



  it.skip('should change Y velocity when hitting the paddle', () =>{
    assert.equal(ball.vy, -4);
    ballCollidePaddle();
    assert.equal(ball.vy, 4)
  })


  it.skip('should dissappear when hitting the bottom', ()=> {
    ballCollideBottom();
    assert.isNotObject(ball);
  })

})

// module.exports = Ball;




  // it('deck creator is function', () => {
  //   assert.isFunction(Deck);
  // });
