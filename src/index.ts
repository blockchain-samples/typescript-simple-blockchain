import * as CryptoJS from 'crypto-js';
class Block {
    //Note:The method which declared by static is able to use without definning the Block class instance.
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp: number,
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number,
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock: Block = new Block(0, '2020202020202', '', 'Hello', 123456);
let blockchain: Block[] = [genesisBlock];
//get overall blockchain arrays
const getBlockchain = (): Block[] => blockchain;
//get latest blockchain block
const getLastestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLastestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        data,
        newTimeStamp,
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimeStamp,
    );
    return newBlock;
};
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
};
blockchain.push(createNewBlock('hello'));
console.log(blockchain);
export {};
