// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title NFTMarketPlace
 * @dev A decentralized marketplace for trading ERC721 tokens.
 */
contract NFTMarketPlace is ReentrancyGuard, ERC721URIStorage {
    event NFTMarketItemCreated(
        uint256 itemId,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event NFTMarketItemSold(
        uint256 itemId,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    uint256 public _tokenIds;
    uint256 public _itemId;
    uint256 public _itemsSold;
    uint256 public listingPrice = 0.002 ether;
    address payable public owner;

    /**
     * @dev Initializes the contract setting the owner as the deployer.
     */
    constructor() ERC721("Canvas NFT", "CNFT") {
        owner = payable(msg.sender);
    }

    struct NFTMarketItem {
        uint256 itemId;
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
     * - The caller must be the contract owner.
     */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the NFT marketplace owner can call this function"
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
     * - The caller must be the contract owner.
     */
    function updateListingPrice(uint256 _listingPrice) public onlyOwner {
        listingPrice = _listingPrice;
    }

    /**
     * @dev Creates a new NFT token.
     * @param tokenURI URI of the token metadata.
     * @param price Price of the NFT.
     * @return tokenIds ID of the newly created token.
     */
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable nonReentrant returns (uint256) {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to the listing price"
        );

        _tokenIds++;
        _mint(msg.sender, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        setApprovalForAll(address(this), true);
        createNFTMarketItem(_tokenIds, price, msg.sender);

        return _tokenIds;
    }

    /**
     * @dev Creates a new NFT market item.
     * @param tokenId ID of the ERC721 token.
     * @param price Price of the NFT.
     * @param seller Address of the minter.
     */
    function createNFTMarketItem(
        uint256 tokenId,
        uint256 price,
        address seller
    ) public {
        _itemId++;
        tidToMarket[_itemId] = NFTMarketItem(
            _itemId,
            tokenId,
            payable(seller),
            payable(address(0)),
            price,
            false
        );

        transferFrom(seller, address(this), tokenId);

        emit NFTMarketItemCreated(
            _itemId,
            tokenId,
            seller,
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

        require(msg.value == price, "Please submit the asking price for the NFT");
        tidToMarket[itemId].seller.transfer(msg.value);
        _transfer(address(this), msg.sender, tokenId);
        tidToMarket[itemId].owner = payable(msg.sender);
        tidToMarket[itemId].sold = true;

        _itemsSold++;

        payable(owner).transfer(listingPrice);
        emit NFTMarketItemSold(
            itemId,
            tokenId,
            tidToMarket[itemId].seller,
            msg.sender,
            price,
            true
        );
    }

    /**
     * @dev Returns the unsold NFT market items.
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
     * @dev Returns the NFT market items owned by the caller.
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
     * @dev Returns the NFT market items created by the caller.
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
