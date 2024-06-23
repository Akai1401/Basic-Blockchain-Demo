// Blockchain Basic
const { Blockchain2 } = require('./blockchain.js');

function implementPoW() {
  // Init blockchain
  const myChain = new Blockchain2(4);
  console.log('myChain Init', myChain.chain);

  // Add block
  myChain.addBlock({ from: '0x123', to: '0x345', amount: 100 });
  myChain.addBlock({ from: '0x111', to: '0x222', amount: 200 });
  myChain.addBlock({ data: 'my data...' });
  console.log('myChain after add block', myChain.chain);
}

module.exports = implementPoW;
