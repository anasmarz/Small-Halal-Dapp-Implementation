// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HalalProductRegistry {
    struct Product {
        string name;
        bool isHalal;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    function addProduct(string memory _name, bool _isHalal) public {
        products[productCount] = Product(_name, _isHalal);
        productCount++;
    }

    function isProductHalal(uint256 _productId) public view returns (bool) {
        require(_productId < productCount, "Product not registered");
        return products[_productId].isHalal;
    }
}
