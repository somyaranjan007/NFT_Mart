const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketPlace and NFTContract Deployment", function () {

    it("deploy market place and nft contract", async function () {
        const [marketPlaceOwner, seller, owner] = await ethers.getSigners();

        const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace", marketPlaceOwner);
        const NFTMarketPlaceDeploy = await NFTMarketPlace.deploy();
        const NFTMarketPlaceAddress = await NFTMarketPlaceDeploy.getAddress();

        const NFTContract = await ethers.getContractFactory("NFTContract");
        const NFTContractDeploy = await NFTContract.deploy(NFTMarketPlaceAddress);
        const NFTContractAddress = await NFTContractDeploy.getAddress();

        console.log({
            NFTMarketPlaceAddress,
            NFTContractAddress
        })

        let listingPrice = await NFTMarketPlaceDeploy.getListingPrice();
        console.log(listingPrice);

        const price = await ethers.parseUnits('100', 'ether');
        console.log(price);

        // create a new NFT
        await NFTContractDeploy.connect(seller).createToken("");
        console.log("seller", seller.address);
        console.log(await (NFTContractDeploy.ownerOf(1)))

        await NFTMarketPlaceDeploy.connect(seller).createNFTMarketItem(NFTContractAddress, 1, price, { value: listingPrice.toString() });
        console.log(await NFTMarketPlaceDeploy.fetchMyCreatedNFT());

    })

})