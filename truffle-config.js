require('dotenv').config();
const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: "./client/src/artifacts",

  networks: {
    ganache: {
     host: "10.203.87.226",     // Update this to match your Ganache setup
     port: 7545,               // Standard Ethereum port for Ganache
     network_id: 5777,         // Network ID for Ganache
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-sepolia.g.alchemy.com/v2/${PROJECT_ID}`),
      network_id: 11155111,    // Sepolia network ID
      confirmations: 2,        // Number of confirmations to wait between deployments
      timeoutBlocks: 200,      // Number of blocks before a deployment times out
      skipDryRun: true         // Skip dry run before migrations
    }
  },

  mocha: {
    // Default mocha options
  },

  compilers: {
    solc: {
      version: "0.8.19",      // Solidity compiler version
    }
  },

  db: {
    enabled: false,           // Truffle DB is disabled by default
  }
};
