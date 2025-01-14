const ChainUtil = require('../chain-util');

const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');

class Wallet {

constructor() {

this.balance = INITIAL_BALANCE;

this.keyPair = ChainUtil.genKeyPair();

this.publicKey = this.keyPair.getPublic().encode('hex');

}

toString() {

return `Wallet-

publicKey: ${this.publicKey.toString()}
balance  : ${this.balance}`

}
sign(dataHash)
{
    return this.keyPair.sign(dataHash);//gen sign from imported module

}
createtransaction(recipientid,amount,TransactionPool){
    if(amount > this.balance){
        console.log(`amount ${amount} exceeds balance ${this.balance}`);
        return;
    }
    let transaction = TransactionPool.existingTransaction(this.publicKey);
    if(transaction)
    {
     transaction.update(this,recipientid,amount);
    }
    else{
        transaction = Transaction.newTransaction(this,recipientid,amount);
        TransactionPool.updateoraddTransaction(transaction);
    }
    return transaction ; 
}


}

module.exports = Wallet;