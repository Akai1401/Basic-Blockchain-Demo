// Blockchain Basic
const { Blockchain3, Token } = require('./blockchain.js');

function implementTransaction() {
  // validator (server backend): person who runs the node or blockchain
  // in order to create p2p network, sync with other nodes

  // validator often is a miner (create new block) or a full node (store all blockchain data)
  // User is client -> sent transaction to validator -> validator create block

  //----------------------------------------------

  // Blockchain doesn't store balance, username, email, password, ... like a bank
  // It only stores transaction history (from, to, amount, timestamp, ...)

  //----------------------------------------------

  // Fake transaction???? -> Don't worry, we have "public key" and "private key"

  // FLOW: original Data (TX) -> Encrypt by publicKey -> Encrypted Data (TX) -> Decrypt by privateKey -> original Data (TX)

  // Can't be fake because encryption and decryption must match (unless private key is leaked)
  // -> Asymmetric encryption: encrypt by publicKey, decrypt by privateKey (encrypted string != decrypted string)

  // Init blockchain
  const myChain = new Blockchain3();

  // Add block (and implement transaction)
  myChain.addBlock([
    { from: 'Master', to: 'Akai', amount: 1000 },
    { from: 'Akai', to: 'Martin', amount: 500 },
    { from: 'Akai', to: 'Martin', amount: 200 },
  ]);

  myChain.addBlock([
    { from: 'Martin', to: 'Akai', amount: 100 },
    { from: 'Akai', to: 'Martin', amount: 50 },
  ]);

  // console.log("myChain after add block", myChain.chain);

  // Check balance
  console.log('Akai balance', myChain.getBalance('Akai') + ' BTC');
  console.log('Martin balance', myChain.getBalance('Martin') + ' BTC');
  console.log('Miner balance', myChain.getBalance('Miner') + ' BTC');

  // Create a new token on myChain
  const STRK = new Token('STRK', 1000000, {
    creator: 'Akai',
    creationDate: Date.now(),
  });
  myChain.addToken(STRK);

  console.log(myChain.chain);
}

module.exports = implementTransaction;
