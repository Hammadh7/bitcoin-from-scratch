const {DIFFICULTY,MINE_RATE} = require('../config');
const ChainUtil = require('../chain-util');

class Block
{
    constructor(timestamp,lasthash,hash,data,nonce,difficulty)
    {
       this.timestamp = timestamp ;
       this.lasthash = lasthash;
       this.hash = hash;
       this.data = data;
       this.nonce = nonce ; //the unique val
       this.difficulty = difficulty || DIFFICULTY;

    }
    toString()
    {
        return `Block -
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lasthash.substring(0,10)}
        Hash      : ${this.hash.substring(0,10)}
        Data      : ${this.data}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
`;
    }
    //start dummy block
    static genesis()
    {
        return new this('Genesis time','-----','nfrvir',[],0,DIFFICULTY);
    }
    //to generate new blocks
    static mineblock(lastblock,data)
    {
        let hash , timestamp ;
        // const timestamp = Date.now();
        const lasthash = lastblock.hash;
        let {difficulty} = lastblock ; //extract difficulty from last block
        let nonce = 0 ; 
        
        do{
            nonce++;
            timestamp=Date.now();
            difficulty= Block.adjustDifficulty(lastblock,timestamp);
            hash = Block.hash(timestamp,lasthash,data,nonce,difficulty); }
            while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
        
        return new this(timestamp,lasthash,hash,data,nonce,difficulty);
    }
    //creting hash value
    static hash(timestamp,lasthash,data,nonce,difficulty)
    {
        return ChainUtil.hash(`${timestamp}${lasthash}${data}${nonce}${difficulty}`).toString();
    }
    // we create hash val with just passing the block
    static blockhash(block)
    {
        const { timestamp , lasthash , data , nonce,difficulty} = block;
        return Block.hash(timestamp,lasthash,data,nonce,difficulty);
    }

    static adjustDifficulty(lastblock,currenTime)
{
    let {difficulty}=lastblock;
    difficulty = lastblock.timestamp+MINE_RATE > currenTime ? difficulty+1 : difficulty-1;
    return difficulty ; 
}

}

module.exports  = Block ;