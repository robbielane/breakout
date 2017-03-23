const Block = require('../lib/Block')
const World = require('../lib/world')
// const Ball = require('../lib/ball')
const assert = require('chai').assert

describe('Block', () => {
  let world = new World();
  let block = new Block(200, 100);


  it('should be a function', () => {
    assert.isFunction(Block)
  })

  it('should instantiate Block', () => {
    let block = new Block();

    assert.isObject(block);
  })

  it('should take an argument', () => {
    let block = new Block(200, 100);

    assert.equal(block.x, 200);
  })

  it('should have a method called draw', () => {

    assert.isFunction(block.draw)
  })

  it('should reverse velocity when block is hit', () =>{
    world.ball.vy = -4;
    assert.equal(world.ball.vy, -4);
    world.ball.x = 17;
    world.ball.y = 105;

    world.blockCollide();
    assert.equal(world.ball.x, 17);
    assert.equal(world.ball.vy, 4);
  })

  it('should take a block out of the array when the ball hits the block', () => {
    let world = new World();

    assert.equal(world.blocksArray.length, 40)
    world.ball.y = 105
    world.ball.x = 17
    world.blockCollide()
    assert.equal(world.blocksArray.length, 39)
  })


})
