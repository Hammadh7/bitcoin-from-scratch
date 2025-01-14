const Blockchain = require('./index'); 
const Block = require('./block');

describe('Blockchain', () => { 
    let bc,bc2;

beforeEach(() => 
    { bc = new Blockchain();
        bc2 = new Blockchain();
     });

it('starts with genesis block', () => 
    { expect(bc.chain [0]).toEqual(Block.genesis()); });

it('adds a new block', () => {

const data = 'foo';

bc.addBlock(data);

expect(bc.chain [bc.chain.length-1].data).toEqual(data); });

it('validates a valid chain', () => {
    bc2.addBlock('foo')
    // console.log("v1");
     expect(bc.isvalidchain(bc2.chain)).toBe(true); });

     it('invalidates a chain with curropt genesis block', () => {
        bc2.chain[0].data ='bad data';
        // console.log("v2");

         expect(bc2.isvalidchain(bc.chain)).toBe(false); });  // works opposite   
         it('invalidates a curropt chain', () => {
            // console.log("v3");

            bc2.addBlock('foo');
            bc2.chain[1].data ='bad data';
    
             expect(bc2.isvalidchain(bc.chain)).toBe(false); });     
    
             it('replaces the chain with a valid chain', () => {

                bc2.addBlock('goo');
                
                bc.replaceChain(bc2.chain);
                
                expect(bc.chain).toEqual(bc2.chain);
                
                });
                it('does not replace the chain with one of less than or equal to len', () => {

                    bc.addBlock('foo');
                    
                    bc.replaceChain(bc2.chain);
                    
                    expect(bc.chain).not.toEqual(bc2.chain);
                    
                    })
});