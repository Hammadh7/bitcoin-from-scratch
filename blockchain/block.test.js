const Block = require('./block');
const {DIFFICULTY} = require('../config');

describe('Block', () => { 
    let data, lastblock, block;

    beforeEach(() => {
    
    data = 'bar';
    
    lastblock =Block.genesis();
     block =Block.mineblock(lastblock, data);
    
    });
    
    it('sets the data to match the input', () => 
        { expect(block.data).toEqual(data); });
    
    
    it('sets the `lasthash` to match the hash of the last block',() =>
         {expect(block.lasthash).toEqual(lastblock.hash); });
3
    it('GENERATE HASH that matches difficulty', () => 
        { expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty)); 
            console.log(block.toString());
        });
     it('lower difficulty of slowly mined block',()=>
    {
        expect(Block.adjustDifficulty(block,block.timestamp+36000)).toEqual(block.difficulty-1);
    }) ;  
    //similar for more difficulty
    });  
    
    