import { ethers } from "hardhat";

async function main() {
  const NFTmarket = await  ethers.deployContract("NFTmarket");
  let nft = await NFTmarket.waitForDeployment();
  saveFrontendFiles(nft,"NFTmarket");

  console.log(
    "Deployed",nft.target);
}
function saveFrontendFiles(contract:any , name:string) {
  const fs = require("fs");
  console.log(__dirname )
  const contractsDir = __dirname + "/../../marketplace/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.target }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);
// console.log(contractArtifact,"a1111")
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
