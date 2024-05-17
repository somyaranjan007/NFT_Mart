// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title NFTContract
 * @dev An ERC721 token contract for creating and managing NFTs with URI storage.
 */
contract NFTContract is ERC721URIStorage {
    uint256 private _tokenIds;
    address public contractAddress;

    /**
     * @dev Initializes the contract and sets the marketplace contract address.
     * @param marketPlaceAddress Address of the marketplace contract.
     */
    constructor(address marketPlaceAddress) ERC721("Canva NFT", "CNFT") {
        contractAddress = marketPlaceAddress;
    }

    /**
     * @dev Creates a new NFT token.
     * @param tokenURI URI of the token metadata.
     * @return tokenIds ID of the newly created token.
     */
    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        _mint(msg.sender, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        setApprovalForAll(contractAddress, true);

        return _tokenIds;
    }
}
