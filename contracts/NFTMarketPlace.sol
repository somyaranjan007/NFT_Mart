// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title NFTMarketPlace
 * @dev A decentralized marketplace for trading ERC721 tokens.
 */
contract NFTMarketPlace {
    event NFTMarketItemCreated(
        uint256 itemId,
        address nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event NFTMarketItemSold(
        uint256 itemId,
        address nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    uint256 private _itemId;
    uint256 private _itemsSold;
    uint256 public listingPrice = 0.002 ether;
    address payable public owner;

    /**
     * @dev Initializes the contract setting the owner as the deployer.
     */
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

    mapping(uint256 => NFTMarketItem) public tidToMarket;

    /**
     * @dev Modifier to restrict access to functions only to the contract owner.
     * Requirements:
     * - Caller must be the contract owner.
     */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only NFT market place owner can call this function"
        );
        _;
    }

    /**
     * @dev Returns the listing price.
     */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /**
     * @dev Updates the listing price.
     * @param _listingPrice The new listing price.
     * Requirements:
     * - Caller must be the contract owner.
     */
    function updateListingPrice(uint256 _listingPrice) public onlyOwner {
        listingPrice = _listingPrice;
    }

    /**
     * @dev Creates a new NFT market item.
     * @param nftContract Address of the ERC721 contract.
     * @param tokenId ID of the ERC721 token.
     * @param price Price of the NFT.
     */
    function createNFTMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        _itemId++;
        tidToMarket[_itemId] = NFTMarketItem(
            _itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit NFTMarketItemCreated(
            _itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /**
     * @dev Executes the sale of an NFT.
     * @param itemId ID of the market item.
     */
    function createNFTMarketSale(uint256 itemId) public payable {
        uint256 price = tidToMarket[itemId].price;
        uint256 tokenId = tidToMarket[itemId].tokenId;
        address nftContract = tidToMarket[itemId].nftContract;

        require(msg.value == price, "Please submit the price of nft!");
        tidToMarket[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        tidToMarket[itemId].owner = payable(msg.sender);
        tidToMarket[itemId].sold = true;

        _itemsSold++;

        payable(owner).transfer(listingPrice);
        emit NFTMarketItemSold(
            itemId,
            nftContract,
            tokenId,
            tidToMarket[itemId].seller,
            msg.sender,
            price,
            true
        );
    }

    /**
     * @dev Returns the unsold NFT Market Items.
     * @return An array of unsold NFTMarketItem structs.
     */
    function fetchUnsoldNFTMarketItems()
        public
        view
        returns (NFTMarketItem[] memory)
    {
        uint256 unsoldNFTItemCount = _itemId - _itemsSold;
        uint256 currentIndex = 0;

        NFTMarketItem[] memory unsoldNFTItems = new NFTMarketItem[](
            unsoldNFTItemCount
        );

        for (uint256 i = 0; i < _itemId; i++) {
            if (tidToMarket[i + 1].owner == address(0)) {
                unsoldNFTItems[currentIndex] = tidToMarket[i + 1];
                currentIndex++;
            }
        }

        return unsoldNFTItems;
    }

    /**
     * @dev Returns the NFT Market Items owned by the caller.
     * @return An array of NFTMarketItem structs owned by the caller.
     */
    function fetchMyNFT() public view returns (NFTMarketItem[] memory) {
        uint256 totalCountMyNFT;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < _itemId; i++) {
            if (tidToMarket[i + 1].owner == msg.sender) {
                totalCountMyNFT++;
            }
        }

        NFTMarketItem[] memory myOwnedNFT = new NFTMarketItem[](
            totalCountMyNFT
        );

        for (uint256 i = 0; i < _itemId; i++) {
            if (tidToMarket[i + 1].owner == msg.sender) {
                myOwnedNFT[currentIndex] = tidToMarket[i + 1];
                currentIndex++;
            }
        }

        return myOwnedNFT;
    }

    /**
     * @dev Returns the NFT Market Items created by the caller.
     * @return An array of NFTMarketItem structs created by the caller.
     */
    function fetchMyCreatedNFT() public view returns (NFTMarketItem[] memory) {
        uint256 totalCountMyCreatedNFT;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < _itemId; i++) {
            if (tidToMarket[i + 1].seller == msg.sender) {
                totalCountMyCreatedNFT++;
            }
        }

        NFTMarketItem[] memory myCreatedNFT = new NFTMarketItem[](
            totalCountMyCreatedNFT
        );

        for (uint256 i = 0; i < _itemId; i++) {
            if (tidToMarket[i + 1].seller == msg.sender) {
                myCreatedNFT[currentIndex] = tidToMarket[i + 1];
                currentIndex++;
            }
        }

        return myCreatedNFT;
    }
}
