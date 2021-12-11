const SHA256 = require('crypto-js/sha256');

class Block{

    constructor(index,timestamp,data,prev_Hash=' '){
this.index=index;
this.timestamp=timestamp;
this.data=data;
this.prev_Hash=prev_Hash;
this.hash='this.calcHash()';
    }

      calcHash(){
   return SHA256(this.index + this.prev_Hash + this.timestamp + JSON.stringify(this.data)).toString();

      }
}
class Blockchain{

    constructor(){
        this.chain=[this.create_Gen_block];
    }
    // new keyword is used to create an instance of obj that has constructor fn

    create_Gen_block(){
        return new Block(0,"15/12/2021","VOTE : ","0");
    }

    get_latest_Block(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
newBlock.prev_Hash=this.get_latest_Block().hash;
newBlock.hash=newBlock.calcHash();
this.chain.push(newBlock);
    }   

    isChainValid(){
        for(let i=1; i< this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
        
        if(currentBlock.hash != currentBlock.calcHash()){
            return false;
        }
        if(currentBlock.prev_Hash!=previousBlock.hash){
            return false;
        }
        return true;
    }
    }
     
}

let viper = new Blockchain();
viper.addBlock(new Block(1,"10/12/21","hey PARLIAMENT"));
viper.addBlock(new Block(2,"15/12/21","P2P is HERE!!"));
 
// console.log("Is the Blockchain valid ?  " + viper.isChainValid());

// viper.chain[1].data="hello";

// console.log("Is the Blockchain valid ?  " + viper.isChainValid()); 


console.log(JSON.stringify(viper , null,5));