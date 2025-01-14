const Block = require('./block');

//the blockchain concept
class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];//functionality of chain
    }
    addBlock(data)
    {
        const block = Block.mineblock(this.chain[this.chain.length -1], data);
        this.chain.push(block);

        return block ; 
    }
    isvalidchain()
    {
        if(JSON.stringify(this.chain[0]) !== JSON.stringify(Block.genesis()))
            {
                // console.log("a");
            return false ;
             } 
        for(let i = 1 ; i < this.chain.length;i++)
        {
            const block = this.chain[i];
            const lastblock = this.chain[i-1];

            if(block.lasthash !== lastblock.hash ||
                 block.hash !== Block.blockhash(block))
                 return false;
                }
                // console.log("b");
        
                return true ; 
    }

    replaceChain(newChain) {

        if (newChain.length <= this.chain.length) {
        
        console.log('Received chain is not longer than the current chain.');
        
        return;
        
        } else if (!this.isvalidchain (newChain)) {
        
        console.log('The received chain is not valid.');
        
        return;}
        
        console.log('Replacing blockchain with the new chain.');
        
        this.chain = newChain;
        
        }
}

module.exports = Blockchain ; 
