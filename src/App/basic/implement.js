const { Blockchain } = require('./blockchain.js');

function implementBasic() {
  // Init blockchain
  const myChain = new Blockchain();
  console.log('myChain Init', myChain.chain);

  // Add block
  myChain.addBlock({ from: '0x123', to: '0x345', amount: 100 });
  myChain.addBlock({ from: '0x111', to: '0x222', amount: 200 });
  myChain.addBlock({ data: 'my data...' });
  console.log('myChain after add block', myChain.chain);

  // Hacking
  myChain.chain[1].data.to = '0x999'; // Modify data
  console.log('myChain after hack data', myChain.chain);
  console.log('myChain isValid', myChain.isValid());
  myChain.chain[1].hash = myChain.chain[1].calculateHash(); // Modify hash
  console.log('myChain after hack hash', myChain.chain);
  console.log('myChain isValid', myChain.isValid());
}

module.exports = implementBasic;
