import * as CryptoJS from 'crypto-js';
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp: number,
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
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
blockchain.push(createNewBlock('hello'));
console.log(blockchain);
export {};
