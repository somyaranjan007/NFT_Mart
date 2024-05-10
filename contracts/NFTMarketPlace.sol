// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/securit";

contract NFTMarketPlace {

    uint256 private _itemId;
    uint256 private _itemSold;
    uint256 public listingPrice;
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct NFTMarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping (uint256 => NFTMarketItem) public tidToMarket;
    
    event NFTMarketItemCreated (
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address seller;
        address owner;
        uint256 price;
        bool sold;
    );     

}