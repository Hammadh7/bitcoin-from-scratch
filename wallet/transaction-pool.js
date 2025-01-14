class TransactionPool{
    constructor(){
        this.transactions = [];
    }
    updateoraddTransaction(transaction){
        let transactionwithid = this.transactions.find(t => t.id === transaction.id);

        if(transactionwithid)
        {
            this.transactions[this.transactions.indexOf(transactionwithid)]= transaction;

        }
        else{
            this.transactions.push(transaction);
        }
    }
    existingTransaction(adderess)
    {
        return this.transactions.find(t  => t.input.adderess === adderess);
    }

}
module.exports = TransactionPool ; // add unveriffied transactions and chk if updataed