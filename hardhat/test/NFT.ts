import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import {Contract} from 'ethers'
 
require ("@nomicfoundation/hardhat-chai-matchers")
 
describe('NFTmarket',() => {
  let signers: any

  let nftMarket : any;
  beforeEach(async()=>{
    //Deploying contract 
    const NFTmarket = await  ethers.deployContract("NFTmarket");
    let d:any = await NFTmarket.waitForDeployment();
    signers = await ethers.getSigners();

    nftMarket = d;
  })
 
  const createNft =async (tokenURI:string) => {

    //To get the tokenId value when the NFT is created 
    let tokenIdPromise = new Promise((resolve) => { 
      nftMarket.on("TokenEvents", (id:any) => {
        resolve(id);
      });
    });
    //Creating NFT
     await nftMarket.createNft(tokenURI)

     const tokenId = await tokenIdPromise;
     expect(tokenId).to.be.gt(0);
     return tokenId;
  }

  describe('createNft',() => { 
   it("should do something",async()=>{
     //Calling nft
     const tokenURI = "https://random.com"

     let tokenID = await createNft(tokenURI) 
     const mintedTokenURI = await nftMarket.tokenURI(tokenID);
     expect(mintedTokenURI).to.equal(tokenURI);
     // Assert that the owner of the newly created NFT is the address that started the transaction
     const ownerAddress = await nftMarket.ownerOf(tokenID);
     const currentAddress = await signers[0].getAddress();
     expect(ownerAddress).to.equal(currentAddress);
   })
   })
  
   describe('listNft', () => { 
     const tokenURI = "https://random.com"
    it("Should revert if price is  zero",async()=>{
      let tokenID = await createNft(tokenURI) 
      const transaction =  nftMarket.listNFT(tokenID,0);
      // console.log(transaction,"asdfasd")
      await expect(transaction).to.be.revertedWith("Price is not valid")
    })

    it("should revert if not called by the owner", async () => {
      const tokenID = await createNft(tokenURI);
      const transaction = nftMarket.connect(signers[1]).listNFT(tokenID, 12);
      await expect(transaction).to.be.revertedWith(
        `ERC721: approve caller is not token owner or approved for all`
      );
    });
    })

})
