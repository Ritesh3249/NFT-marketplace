require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const privateKey1 = process.env.PRIVATE_KEY
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },  
    sepolia: {
      url: process.env.URL,
      accounts: [privateKey1]
    }
  },
  
}
 
