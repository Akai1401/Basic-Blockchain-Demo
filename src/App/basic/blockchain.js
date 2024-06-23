const hash = require('crypto-js/sha256');

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = new Date();

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return hash(
      this.prevHash + this.timestamp + JSON.stringify(this.data),
    ).toString();
  }
}

class Blockchain {
  constructor() {
    const genesisBlock = new Block('0', { isGenesis: true });
    this.chain = [genesisBlock];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const lastBock = this.getLatestBlock();
    const newBlock = new Block(lastBock.hash, data);
    this.chain.push(newBlock);
  }

  // purpose of saving hash and prev hash: prevent modifying data
  // because
  // +) if DATA is modified -> hash saved will be different with hash calculated again
  // +) if HASH is modified -> prev hash of next block will be different with hash of previous block
  // -> we have to modify all chain -> not possible
  // BUT WHY not possible? sha256 is fast algorithm? -> "PROOF OF WORK"

  // check
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      // hash đã lưu phải bằng hash mới được tính toán lại
      if (currentBlock.hash !== currentBlock.calculateHash()) return false;
      // prev hash của block hiện tại phải bằng hash của block trước
      if (currentBlock.prevHash !== prevBlock.hash) return false;
    }
    return true;
  }
}

module.exports = { Blockchain, Block };
