import * as CryptoJS from 'crypto-js';
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    //Constructor function.
    constructor(
        index: number,
        previousHash: string,
        data: string,
        timestamp: number,
    ) {
        this.index = index;
        this.hash = Block.calculateBlockHash(
            index,
            previousHash,
            data,
            timestamp,
        );
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    //Note:The method which declared by static is able to use without definning the Block class instance.
    //The hash calculating method to create a hash of block with a couple of data such as the index, previous Hash, data, timestamp.
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp: number,
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    //Get the timestamp on block
    static getNewTimeStamp = (): number =>
        Math.round(new Date().getTime() / 1000);
    //The method to check out the structure of a block.
    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';

    static getHashforBlock = (aBlock: Block): string =>
        Block.calculateBlockHash(
            aBlock.index,
            aBlock.previousHash,
            aBlock.data,
            aBlock.timestamp,
        );
    // The method to validate blockchain's integrity.
    static isBlockValid = (
        candidateBlock: Block,
        previousBlock: Block,
    ): boolean => {
        if (!Block.validateStructure(candidateBlock)) {
            return false;
        } else if (previousBlock.index + 1 !== candidateBlock.index) {
            return false;
        } else if (previousBlock.hash !== candidateBlock.previousHash) {
            return false;
        } else if (
            Block.getHashforBlock(candidateBlock) !== candidateBlock.hash
        ) {
            return false;
        } else {
            return true;
        }
    };
}
class CrytoBlockchain {
    public blockchain: Block[];
    public newBlock: Block;
    //Constructor function.
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }
    //This is initializing function to assign the first block on the blockchain.
    public startGenesisBlock(): Block {
        return new Block(
            0,
            '',
            'Initial Block in the Chain',
            Block.getNewTimeStamp(),
        );
    }
    //Get the lastest block on the blockchain.
    public getLastestBlock = (): Block =>
        this.blockchain[this.blockchain.length - 1];
    //The creating method to make new block on the blockchain.
    public createNewBlock = (data: string): Block => {
        const previousBlock: Block = this.getLastestBlock();
        const newIndex: number = previousBlock.index + 1;
        const newTimeStamp: number = Block.getNewTimeStamp();
        const newBlock: Block = new Block(
            newIndex,
            previousBlock.hash,
            data,
            newTimeStamp,
        );
        this.addBlock(newBlock);
        return newBlock;
    };
    //The method to push a block into the blockchain arrays
    public addBlock = (candidateBlock: Block): void => {
        if (Block.isBlockValid(candidateBlock, this.getLastestBlock())) {
            this.blockchain.push(candidateBlock);
        }
    };
}
let blockchain = new CrytoBlockchain();
blockchain.createNewBlock('Second Block');
blockchain.createNewBlock('Third Block');
blockchain.createNewBlock('Fourth Block');
console.log(JSON.stringify(blockchain, null, 4));
//console.log(blockchain);
export {};
