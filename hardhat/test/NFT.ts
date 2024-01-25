
import { expect } from "chai";
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import "@nomicfoundation/hardhat-toolbox"

 

describe("NFTMarket",()=>{
  type NFTTransfer = {
    tokenId: Number;
    from: string;
    to: string;
    tokenURI: string;
    price: Number;
 };
 
  async function getSigners(): Promise<[Signer, Signer, Signer]> {
    const [account, account2, account3] = await ethers.getSigners();
    return [account, account2, account3];
  }
  let nftMarket : any;

  let accounts: [Signer, Signer, Signer];

  before(async()=>{
    accounts = await getSigners();

    let NFTmarket = await ethers.deployContract('NFTmarket');
    nftMarket = await NFTmarket.waitForDeployment()
   

  })
 
  const createNft =async (tokenURI:string) => {

    //To get the tokenId value when the NFT is created 
    let tokenIdPromise = new Promise((resolve) => { 
      nftMarket.on("TokenEvents", (id:any) => {
        
        resolve(id);
      });
    });

    //Creating NFT
     let data = await nftMarket.createNft(tokenURI)
     console.log(data.value)

     const tokenId = await tokenIdPromise;
     console.log(tokenId)
     
     expect(tokenId).to.be.gt(0);
     return tokenId;
  }

  describe('Create nft', ()=>{
    it("it will return nft",async()=>{
      let tokenURI = "http://some-token-uri"
      const tokenID = await createNft(tokenURI);
      const mintedTokenUri = await nftMarket.tokenURI(tokenID)
      expect(mintedTokenUri).to.equal(tokenURI)
      const ownerAddress = await nftMarket.ownerOf(tokenID);
      const currentAddress = await accounts[0].getAddress();
      expect(ownerAddress).to.equal(currentAddress);  

     await expect( nftMarket.createNft(tokenURI)).to.emit(nftMarket,'NFTTransfer').withArgs(tokenID,nftMarket.getAddress(),accounts[0].getAddress(),tokenURI,0)
 console.log('asdfasd')


    })
  })
})