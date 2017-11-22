'use strict';
const SHA256 = require('crypto-js/sha256');

class Block {
	
	constructor(index, creationTime, data, previousHash = ""){
		this.index = index;
		this.creationTime = creationTime;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	
	// npm install -- save crypto-js
	calculateHash() {
		return SHA256(this.inde + this.previousHash + this.creationTime + JSON.stringify(this.data)).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}
	
	createGenesisBlock() {
		return new Block(0, "01/01/2017", "Genesis block", "0");
	}
	
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}
	
	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

// Example 1
console.log("Example 1 - Simple Hash");
let myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "10/07/2017", { ammount: 4 }));
myBlockchain.addBlock(new Block(2, "14/09/2017", { ammount: 7 }));

console.log(JSON.stringify(myBlockchain, null, 4));
console.log("-----------------------------");