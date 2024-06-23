const hash = require('crypto-js/sha256');
const { Block, Blockchain } = require('../basic/blockchain.js');

class Block2 extends Block {
  constructor(prevHash, data) {
    super(prevHash, data);
    this.nonce = 0;
  }

  // Override
  calculateHash() {
    return hash(
      this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce,
    ).toString();
  }

  mine(difficulty) {
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

// Proof of Work: Finding a hash that satisfies a condition
// Example: Hash must start with 0000
// => Need to spend a lot of computing resources
// => Extremely hard to change all blocks in the chain

// Difficulty: The Difficulty of the Proof of Work
// Example: Hash must start with 0000
// => difficulty = 4

class Blockchain2 extends Blockchain {
  constructor(difficulty) {
    super();
    this.difficulty = difficulty;
  }

  // Override
  addBlock(data) {
    const lastBock = this.getLatestBlock();
    const newBlock = new Block2(lastBock.hash, data);

    console.log('Mining block...');
    console.time('Block mined');

    newBlock.mine(this.difficulty);

    console.timeEnd('Block mined');

    console.log(newBlock);

    this.chain.push(newBlock);
  }
}

module.exports = { Blockchain2, Block2 };
