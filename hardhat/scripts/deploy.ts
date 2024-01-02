import { ethers } from "hardhat";

async function main() {
  const NFTmarket = await  ethers.deployContract("NFTmarket");
  let d:any = await NFTmarket.waitForDeployment();
   
  console.log(
    "Deployed",d);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
