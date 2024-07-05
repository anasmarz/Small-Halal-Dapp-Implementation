# Halal Product Registry DApp

## Overview

The **Halal Product Registry DApp** is a decentralized application built to manage halal product registrations on the Ethereum blockchain. Users can add halal products to a blockchain-based registry and check the halal status of products by their ID. The application uses React for the frontend, Web3.js for blockchain interactions, and an Ethereum smart contract to handle product registrations and queries.

## Code Description

### 1. Imports and Initial Setup
```jsx
import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import HalalProductRegistryABI from "C:/Users/Acer/compsecbc/client/src/artifacts/HalalProductRegistry.json";
import './App.scss';
```
- **React and Web3 Imports**: Imports React hooks (`useState`, `useEffect`) for managing component state and lifecycle, and Web3.js for Ethereum blockchain interaction.
- **Contract ABI Import**: Imports the ABI (Application Binary Interface) for the Halal Product Registry smart contract to interact with it.

### 2. App Component Definition
```jsx
const App = () => {
    const [account, setAccount] = useState('');
    const [loader, setLoader] = useState(true);
    const [contract, setContract] = useState(null);

    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [isHalal, setIsHalal] = useState(false);
    const [productStatus, setProductStatus] = useState('');
    const [products, setProducts] = useState([]);
```
- **State Variables**: 
  - `account`: Stores the current Ethereum account of the user.
  - `loader`: Manages the loading state of the DApp.
  - `contract`: Holds the instance of the deployed smart contract.
  - `productId`, `productName`, `isHalal`, `productStatus`: Handles product ID, name, halal status, and status display.
  - `products`: Array to store the list of registered products from the blockchain.

### 3. useEffect Hook
```jsx
    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);
```
- **useEffect**: Runs once on component mount to:
  - Call `loadWeb3()`: Initializes the Ethereum provider (MetaMask).
  - Call `loadBlockchainData()`: Fetches Ethereum account and smart contract data.

### 4. Ethereum and Blockchain Interaction Functions
```jsx
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchainData = async () => {
        setLoader(true);
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = HalalProductRegistryABI.networks[networkId];

        if (networkData) {
            const halalProductRegistry = new web3.eth.Contract(HalalProductRegistryABI.abi, networkData.address);
            setContract(halalProductRegistry);
            
            // Load products
            const productCount = await halalProductRegistry.methods.productCount().call();
            const productsList = [];
            for (let i = 0; i < productCount; i++) {
                const product = await halalProductRegistry.methods.products(i).call();
                productsList.push(product);
            }
            setProducts(productsList);

            setLoader(false);
        } else {
            window.alert('The smart contract is not deployed to the current network');
        }
    };
```
- **loadWeb3**: Initializes Web3 and MetaMask if available.
- **loadBlockchainData**: 
  - Fetches user accounts and sets the current account.
  - Retrieves network ID and smart contract data.
  - Initializes contract instance and fetches registered products from the blockchain.

### 5. Contract Interaction Functions
```jsx
    const addProduct = async () => {
        await contract.methods.addProduct(productName, isHalal).send({ from: account });
        setProductName('');
        setIsHalal(false);
        alert('Product added successfully');
        loadBlockchainData(); // Refresh products after adding
    };

    const checkProduct = async () => {
        const status = await contract.methods.isProductHalal(productId).call();
        setProductStatus(status ? 'Halal' : 'Not Halal');
    };
```
- **addProduct**: 
  - Adds a new product to the blockchain.
  - Resets input fields and alerts the user.
  - Refreshes the product list by calling `loadBlockchainData()`.
- **checkProduct**: 
  - Checks the halal status of a product by its ID.
  - Updates `productStatus` with the result.

### 6. Rendering JSX
```jsx
    if (loader) {
        return (
            <div>
                Loading....
            </div>
        );
    }

    return (
        <div className="main-container">
            <h1 className="title">Halal Product Registry DApp</h1>

            <div className="main-content">
                <div className="account">
                    <b>Current Account:</b> {account}
                </div>

                <h2>Registered Products</h2>
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>ID: {index}, Name: {product.name}, Status: {product.isHalal ? 'Halal' : 'Not Halal'}</li>
                    ))}
                </ul>
            </div>

            <div className="main-process">
                <div className="reg-product">
                    <h3>Add Product</h3>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name"
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={isHalal}
                            onChange={(e) => setIsHalal(e.target.checked)}
                        />
                        Halal
                    </label>
                    <button className="button" onClick={addProduct}>
                        Add Product
                    </button>
                </div>

                <div className="check-product">
                    <h3>Check Product</h3>
                    <input
                        type="number"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Product ID"
                    />
                    <button className="button" onClick={checkProduct}>Check</button>
                    <p>{productStatus}</p>
                </div>
            </div>
        </div>
    );
}
```
- **Conditional Rendering**: 
  - Displays a loading message while the DApp is initializing.
  - Renders the main container with:
    - Current Ethereum account.
    - List of registered products.
    - Form to add new products.
    - Form to check the halal status of a product by ID.

### Summary

The Halal Product Registry DApp enables users to:
- **Add** new products with a halal status to a blockchain-based registry.
- **Check** the halal status of a product using its ID.
- **View** a list of all registered products with their halal status.

It utilizes React for building the user interface, Web3.js for interacting with the Ethereum blockchain, and a smart contract to manage product registrations and queries, providing a decentralized solution for halal product management.

