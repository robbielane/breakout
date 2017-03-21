
import World from '../lib/world';
import Ball from '../lib/ball';
import {assert} from 'chai';

describe('Ball', () => {
  let ball;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  before(() => {
    ball = new Ball(300, 300, 'red');
  });

  context('instantiate', () => {

    it('should be a function', () =>{
      assert.isFunction(Ball);
    });

    it('should instantiate a new ball with default values', () => {
      assert.isObject(ball);
      assert.equal(ball.radius, 10);
      assert.equal(ball.vx, 0);
      assert.equal(ball.vy, 0);
    });

    it('should instantiate ball object with defined x, y, and color', () => {
      assert.equal(ball.x, 300);
      assert.equal(ball.y, 300);
      assert.equal(ball.color, 'red');
    });

  });

  context('#move', () => {

    it('should move x and y coordinates based on current velocity', () => {

      /* ========== velocity 3 ========== */

      ball.vx = 3;
      ball.vy = -3;
      ball.move();

      assert.equal(ball.x, 303);
      assert.equal(ball.y, 297);

      /* ========== velocity 6 ========== */

      ball.vx = 6;
      ball.vy = -6;
      ball.move();

      assert.equal(ball.x, 309);
      assert.equal(ball.y, 291);

      /* ========== velocity 10 ========== */

      ball.vx = 10;
      ball.vy = -10;
      ball.move();

      assert.equal(ball.x, 319);
      assert.equal(ball.y, 281);
    });

    it('should return its self', () => {
      assert.instanceOf(ball.move(), Ball)
    });


  });


  // ########### Move these methods to a Collision class?? 
  //
  // it('should change Y velocity when hitting the paddle', () =>{
  //   assert.equal(ball.vy, -4);
  //   ballCollidePaddle();
  //   assert.equal(ball.vy, 4)
  // })
  //
  //
  // it.skip('should dissappear when hitting the bottom', ()=> {
  //   ballCollideBottom();
  //   assert.isNotObject(ball);
  // })

})
