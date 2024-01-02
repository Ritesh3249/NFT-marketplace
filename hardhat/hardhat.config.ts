import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"
const privateKey1 = process.env.PVTKEY

console.log(privateKey1)
const config: HardhatUserConfig =  {
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
 

export default config;
