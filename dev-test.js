// const Block = require('./blockchain/block');
// // const block = new Block ('hcb','deu','edud','edh');
// // console.log(block.toString());
// // console.log(Block.genesis().toString());

// const fooBlock = Block.mineblock(Block.genesis(), 'foo');
// console.log(fooBlock.toString());


//checking wallet functionality
const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());


//checking with 10 blocks
// const Blockchain = require('./blockchain');
// const bc = new Blockchain();

// for(let  i= 0 ; i < 10 ; i++)
// {
//     console.log(bc.addBlock(`foo ${i}`).toString());
// }