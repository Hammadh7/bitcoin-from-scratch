
# Bitcoin From Scratch

## Overview

This project is a simple implementation of a Bitcoin system. It includes the creation of a wallet, transactions, and a transaction pool, allowing users to securely send and receive cryptocurrencies. The core features include wallet generation, transaction signing, and validation using public-private key pairs. The project demonstrates key blockchain principles such as decentralized transactions and cryptographic security.

## Features

- **Wallet**: A user can generate a wallet, which includes a public and private key pair for secure transactions.
- **Transactions**: The wallet can send transactions, verify balances, and sign transactions.
- **Transaction Pool**: Unconfirmed transactions are stored in a transaction pool.
- **Transaction Verification**: Ensures that each transaction is valid and signed by the wallet owner.

## Project Structure

Here’s an overview of the directory structure for the project:

```
/bitcoin-from-scratch  
├── /app  
│   ├── index.js  
│   └── p2p-server.js  
├── /blockchain  
│   ├── block.js               # Handles the structure and validation of blocks in the blockchain  
│   ├── block.test.js          # Unit tests for the block functionality  
│   ├── index.js               # Main entry for the blockchain module  
│   └── index.test.js          # Unit tests for blockchain operations  
├── /wallet  
│   ├── index.js               # Wallet class that generates keys and manages balances  
│   ├── transaction.js         # Handles creating and verifying transactions  
│   ├── transaction-pool.js    # Manages the pool of unconfirmed transactions  
│   ├── transaction.test.js    # Unit tests for transaction validation and creation  
│   └── transaction-pool.test.js  # Unit tests for transaction pool management  
├── /chain-util  
│   ├── chain-util.js          # Utility functions for cryptography, hashing, and digital signatures  
├── /config  
│   ├── config.js              # Configuration settings (e.g., network, initial balances)  
├── package.json               # Node.js dependencies and scripts  
├── package-lock.json          # Locked versions of dependencies for consistency  
└── README.md                  # Project overview, setup instructions, and documentation  

```
## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Hammadh7/bitcoin-from-scratch.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd bitcoin-from-scratch
   ```

3. **Install dependencies**:

   Make sure you have `Node.js` and `npm` installed. Then run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

### Running the Application

To run the blockchain application, you can use the following command:

```bash
node wallet/index.js
```

This will run the `Wallet` class, where you can interact with the blockchain by creating a wallet, making transactions, and more.

### Running Tests

To run the unit tests for the project, use the following command:

```bash
npm test
```

This will run the test suite and ensure that the project is functioning as expected.

## Example

Here’s an example of how to create a wallet and make a transaction:

```javascript
const Wallet = require('./wallet');
const TransactionPool = require('./transactions/transaction-pool');

// Create a new wallet
const wallet = new Wallet();

// Create a new transaction
const recipientid = 'r4nd0m-4ddr355';
const amount = 50;
const tp = new TransactionPool();

wallet.createtransaction(recipientid, amount, tp);

// Check balance after transaction
console.log(`Wallet Balance: ${wallet.balance}`);
```

## Contributing

If you'd like to contribute to this project, feel free to fork it and submit a pull request with your changes. Make sure to run the tests to ensure everything works correctly before submitting.

## License

This project is licensed under the MIT License.
