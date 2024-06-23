const { Block, Blockchain } = require('../basic/blockchain.js');

class Block3 extends Block {}

class Blockchain3 extends Blockchain {
  addBlock(data) {
    const lastBock = this.getLatestBlock();
    const newBlock = new Block3(lastBock.hash, data);
    newBlock.data = [
      ...newBlock.data,
      { from: 'Master', to: 'Miner', amount: 1000, type: 'reward' }, // reward for miner
    ];
    this.chain.push(newBlock);
  }

  // get balance (read only)
  getBalance(address) {
    let balance = 0;
    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      if (block.data.isGenesis) continue; // Skip genesis block

      for (let j = 0; j < block.data.length; j++) {
        const transaction = block.data[j];
        if (transaction.from === address) {
          balance -= transaction.amount;
        }
        if (transaction.to === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  // add Token (Write data -> Gas fee)
  // Gas fee: pay for miner + prevent DDos + prioritize transactions
  // Gas fee modified because miners can choose transactions with higher gas fee
  addToken(token) {
    const lastBlock = this.getLatestBlock();
    const newBlock = new Block(lastBlock.hash, {
      type: 'addToken',
      token: token.name,
      totalSupply: token.totalSupply,
      details: token.details,
    });
    this.chain.push(newBlock);
  }
}

class Token {
  constructor(name, totalSupply, details) {
    this.name = name;
    this.totalSupply = totalSupply;
    this.details = details;
  }
}

module.exports = { Blockchain3, Token };
