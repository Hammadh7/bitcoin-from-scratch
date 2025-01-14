const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pserver = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const tp = new TransactionPool(); 
const p2pserver = new P2pserver(bc,tp);
const wallet = new Wallet();

app.use(bodyParser.json());

app.get('/blocks',(req,res)=>{
    res.json(bc.chain);
});

app.post('/mine',(req,res)=> {
    const block = bc.addBlock(req.body.data);
    console.log('New block added:', block.toString());

    p2pserver.syncChain();

    res.redirect('/blocks');
})
app.get('/transactions',(req,res) => {
    res.json(tp.transactions);
})

app.post('/trasact',(req,res)=>{
    const { recipientid , amount} = req.body;
    const transaction = wallet.createtransaction(recipientid,amount,tp);
    res.redirect('/transaction');
})

app.listen(HTTP_PORT,()=> console.log(`LISTENING ON PORT ${HTTP_PORT}`));
p2pserver.listen();