const ChainUtil = require('../chain-util');

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet, recipientid, amount) {
        const senderOutput = this.outputs.find(output => output.adderess === senderWallet.publicKey); // Kept 'adderess'
        if (amount > senderOutput.amount) {
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }
        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({ amount, adderess: recipientid }); // Kept 'adderess'
        Transaction.signTransaction(this, senderWallet);
        return this;
    }

    static newTransaction(senderWallet, recipientid, amount) {
        const transaction = new this();

        if (amount > senderWallet.balance) {
            console.log(`Amount ${amount} exceeded balance`);
            return;
        }

        // Push sender and recipient outputs
        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, adderess: senderWallet.publicKey }, // Kept 'adderess'
            { amount, adderess: recipientid } // Kept 'adderess'
        ]);

        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            adderess: senderWallet.publicKey, // Kept 'adderess'
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        };
    }

    static verifyTransaction(transaction) {
        return ChainUtil.verifySignature(
            transaction.input.adderess, // Kept 'adderess'
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }
}

module.exports = Transaction;
