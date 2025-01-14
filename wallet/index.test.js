const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('Wallet', () => {
    let wallet, tp;
  
    beforeEach(() => {
      wallet = new Wallet();
      tp = new TransactionPool();
    });
  
    describe('creating a transaction', () => {
      let transaction, sendAmount, recipientid;
  
      beforeEach(() => {
        sendAmount = 50;
        recipientid = 'r4nd0m-4ddr355';
  
        transaction = wallet.createtransaction(recipientid, sendAmount, tp);
      });
  
      describe('and doing the same transaction', () => {
        beforeEach(() => {
          wallet.createtransaction(recipientid, sendAmount, tp);
        });
  
        it('doubles the `sendAmount` subtracted from the wallet balance', () => {
          // Update to use 'adderess' to match your code
          expect(
            transaction.outputs.find(output => output.adderess === wallet.publicKey).amount
          ).toEqual(wallet.balance - sendAmount * 2);
        });
  
        it('clones the `sendAmount` output for the recipient', () => {
          // Update to use 'adderess' to match your code
          expect(
            transaction.outputs
              .filter(output => output.adderess === recipientid)
              .map(output => output.amount)
          ).toEqual([sendAmount, sendAmount]);
        });
      });
    });
  });
  
  