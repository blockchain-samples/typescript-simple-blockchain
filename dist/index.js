"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
let Block = /** @class */ (() => {
    class Block {
        //Constructor function.
        constructor(index, previousHash, data, timestamp) {
            this.index = index;
            this.hash = Block.calculateBlockHash(index, previousHash, data, timestamp);
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp;
        }
    }
    //Note:The method which declared by static is able to use without definning the Block class instance.
    //The hash calculating method to create a hash of block with a couple of data such as the index, previous Hash, data, timestamp.
    Block.calculateBlockHash = (index, previousHash, data, timestamp) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    //Get the timestamp on block
    Block.getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
    //The method to check out the structure of a block.
    Block.validateStructure = (aBlock) => typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';
    Block.getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);
    // The method to validate blockchain's integrity.
    Block.isBlockValid = (candidateBlock, previousBlock) => {
        if (!Block.validateStructure(candidateBlock)) {
            return false;
        }
        else if (previousBlock.index + 1 !== candidateBlock.index) {
            return false;
        }
        else if (previousBlock.hash !== candidateBlock.previousHash) {
            return false;
        }
        else if (Block.getHashforBlock(candidateBlock) !== candidateBlock.hash) {
            return false;
        }
        else {
            return true;
        }
    };
    return Block;
})();
class CrytoBlockchain {
    //Constructor function.
    constructor() {
        //Get the lastest block on the blockchain.
        this.getLastestBlock = () => this.blockchain[this.blockchain.length - 1];
        //The creating method to make new block on the blockchain.
        this.createNewBlock = (data) => {
            const previousBlock = this.getLastestBlock();
            const newIndex = previousBlock.index + 1;
            const newTimeStamp = Block.getNewTimeStamp();
            const newBlock = new Block(newIndex, previousBlock.hash, data, newTimeStamp);
            this.addBlock(newBlock);
            return newBlock;
        };
        //The method to push a block into the blockchain arrays
        this.addBlock = (candidateBlock) => {
            if (Block.isBlockValid(candidateBlock, this.getLastestBlock())) {
                this.blockchain.push(candidateBlock);
            }
        };
        this.blockchain = [this.startGenesisBlock()];
    }
    //This is initializing function to assign the first block on the blockchain.
    startGenesisBlock() {
        return new Block(0, '', 'Initial Block in the Chain', Block.getNewTimeStamp());
    }
}
let blockchain = new CrytoBlockchain();
blockchain.createNewBlock('Second Block');
blockchain.createNewBlock('Third Block');
blockchain.createNewBlock('Fourth Block');
console.log(JSON.stringify(blockchain, null, 4));
//# sourceMappingURL=index.js.map