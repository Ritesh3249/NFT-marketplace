import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import {Contract} from 'ethers'
 
require ("@nomicfoundation/hardhat-chai-matchers")
// import eth from 'ethers'
 // describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });

describe('NFTmarket',() => {
  let signers: any

  let nftMarket : any;
  before(async()=>{
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
      const transaction =nftMarket.connect(signers[1]).listNFT(tokenID, 12);
      // console.log(transaction)
      await expect(transaction).to.be.revertedWith(
       `ERC721InvalidApprover("${await signers[1].getAddress()}")`
      );
    });
    })

})
