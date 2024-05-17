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

        console.log({
            NFTMarketPlaceAddress,
        })

        let listingPrice = await NFTMarketPlaceDeploy.getListingPrice();
        console.log(listingPrice);

        const price = await ethers.parseUnits('100', 'ether');
        console.log(typeof price);

        // create a new NFT
        await NFTMarketPlaceDeploy.connect(seller).createToken("URI", price.toString(), { value: listingPrice.toString() });
        console.log("seller", seller.address);
        console.log(await (NFTMarketPlaceDeploy.ownerOf(1)));
        console.log(NFTMarketPlaceAddress)

        console.log(await NFTMarketPlaceDeploy.connect(seller).fetchMyCreatedNFT());
        // console.log("WHO: ", NFTMarketPlaceAddress, await (NFTContractDeploy.ownerOf(1)))

        // create market sale 
        await NFTMarketPlaceDeploy.connect(owner).createNFTMarketSale(1, { value: price.toString() });
        console.log("WHO: ", owner.address, await (NFTMarketPlaceDeploy.ownerOf(1)))

    })

})