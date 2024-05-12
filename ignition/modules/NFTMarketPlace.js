const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const deployScript = buildModule("NFTMarketPlaceModule", (m) => {
    const nFTMarketPlace = m.contract("NFTMarketPlace")
    console.log(nFTMarketPlace);

    return { nFTMarketPlace };
})

module.exports = deployScript;