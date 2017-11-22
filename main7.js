const SHA256 = require('crypto-js/sha256');

class Block {
	
	constructor(index, creationTime, data, previousHash = ''){
		this.index = index;
		this.creationTime = creationTime;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0; // Used to force new hash generation
	}
	
	// npm install -- save crypto-js
	calculateHash() {
		return SHA256(this.inde + this.previousHash + this.creationTime + JSON.stringify(this.data) + this.nonce).toString();
	}
	
	mineBlock(difficulty) {
		while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		
		console.log("Block mined: " + this.hash);
	}	
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
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
		//newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}
	
	isChainValid() {
		for(let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			
			if(currentBlock.hash != currentBlock.calculateHash()) {
				return false;
			}
			
			if(currentBlock.previousHash != previousBlock.hash) {
				return false;
			}
		}
		
		return true;
	}
	
	// proof of work (mining)
	
	// peer to peer sync
}

// Example 1
console.log("Example 1");
let myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "10/07/2017", { ammount: 4 }));
myBlockchain.addBlock(new Block(2, "14/09/2017", { ammount: 7 }));

console.log(JSON.stringify(myBlockchain, null, 4));
console.log("-----------------------------");

/*
// Example 2
console.log("Example 2");
myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "10/07/2017", { ammount: 4 }));
myBlockchain.addBlock(new Block(2, "14/09/2017", { ammount: 7 }));
console.log("Is Blockchain valid?", myBlockchain.isChainValid());
console.log("-----------------------------");

// Example 3
console.log("Example 3");
myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "10/07/2017", { ammount: 4 }));
myBlockchain.addBlock(new Block(2, "14/09/2017", { ammount: 7 }));
myBlockchain.chain[1].data = {amount : 100};
console.log("Is Blockchain valid?", myBlockchain.isChainValid());
console.log("-----------------------------");

// Example 4
console.log("Example 4");
myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "10/07/2017", { ammount: 4 }));
myBlockchain.addBlock(new Block(2, "14/09/2017", { ammount: 7 }));
myBlockchain.chain[1].data = {amount : 100};
myBlockchain.chain[1].hash = myBlockchain.chain[1].calculateHash();
console.log("Is Blockchain valid?", myBlockchain.isChainValid());
console.log("-----------------------------");

// Example 5
console.log("Example 4");
myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "10/07/2017", { ammount: 6 }));
myBlockchain.addBlock(new Block(2, "14/09/2017", { ammount: 12 }));
console.log("-----------------------------");
*/