require("@nomicfoundation/hardhat-toolbox");

console.log(process.env.PRIVATE_KEY)


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    "polygonZkEvm": {
      url: `https://polygonzkevm-cardona.g.alchemy.com/v2/G9sfWj2UfNVVwloIolQxQe7KNxs6Gz65`,
      accounts: ["69eafb4d0f4707da8c468b5afba2af673aa563a0b35c1204984154a23584b186"],
      chainId: 2442,
    }
  }
};
