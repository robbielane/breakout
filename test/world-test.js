import World from '../lib/world'
import {assert} from 'chai'

describe('World', () => {
  const canvas = document.createElement('canvas')
  // const ctx = canvas.getContext('2d')
  const world = new World(canvas);
  // const livesCount = document.createElement('h3').classList += 'lives'


  it('startGame changes the balls velocity from 0 to 4 on click', () => {
    assert.equal(world.ball.vx, 0);
    assert.equal(world.ball.vy, 0);
    canvas.onClick = () => {
      assert.equal(world.ball.vx, 4)
      assert.equal(world.ball.vy, -4)
    }



  })

  it('wallCollision doesnt change velocity unless there is a collision', () =>{

    assert.equal(world.ball.vx, 0);
    assert.equal(world.ball.vy, 0);
    world.wallCollision();
    assert.equal(world.ball.vx, 0)
    assert.equal(world.ball.vy, 0);
  })

  it('wallCollision should change x velocity when there is a left wall collision', () => {
    world.ball.vx = -4
    world.ball.x = -1
    world.wallCollision();
    assert.equal(world.ball.vx, 4 )
  })

  it('wallCollision should change x velocity when there is a right wall collision', () => {
    world.ball.vx = 4
    world.ball.x = 601
    world.wallCollision();
    assert.equal(world.ball.vx, -4 )
  })

  it('should change Y velocity when hitting the top wall', () =>{
    world.ball.vy = -4
    world.ball.y = -1
    world.ceilingCollision();
    assert.equal(world.ball.vy, 4)
  })

  it('should decrement one life when the ball hits the bottom and lives are > 1', () => {
    assert.equal(world.lives, 3)
    world.ball.y = 512
    world.bottomCollision(world.ctx)
    assert.equal(world.lives, 2)

  })

  it.skip('should print game over when out of lives and ball hits the bottom', () => {
    //assert lives = 1
    //have ball hit bottom
  })

})
