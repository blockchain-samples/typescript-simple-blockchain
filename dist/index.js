"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
let Block = /** @class */ (() => {
    class Block {
        constructor(index, hash, previousHash, data, timestamp) {
            this.index = index;
            this.hash = hash;
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp;
        }
    }
    Block.calculateBlockHash = (index, previousHash, data, timestamp) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    return Block;
})();
const genesisBlock = new Block(0, '2020202020202', '', 'Hello', 123456);
let blockchain = [genesisBlock];
//get overall blockchain arrays
const getBlockchain = () => blockchain;
//get latest blockchain block
const getLastestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLastestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    return newBlock;
};
blockchain.push(createNewBlock('hello'));
console.log(blockchain);
//# sourceMappingURL=index.js.map