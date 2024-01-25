"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'

import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import Header from '@/components/Header'
import NFTCard from '@/components/NFTCard' 
import useSigner from '@/app/context/signer'
import useNFTMarket from '@/state/nft-market'
import AddressAvatar from '@/components/AddressAvatar'

 
const style = {
  bannerImageContainer: `h-[20vh] relative w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-2xl font-bold mb-7`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 text-center flex-wrap mt-4`,


  ///Logout css
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,

}
 

const Collection = () => {
  const {address,loading , connectWallet}=useSigner()

//   const router = useRouter()
//   const { provider } = useWeb3()
//   const { collectionId } = router.query
//   const [collection, setCollection] = useState({})
const {ownedListedNFTs,ownedNFTs} = useNFTMarket();

   
  return (
<>

{address?
<div className="overflow-hidden">
  <Header />
  <div className={style.bannerImageContainer}>

    <img
      className={style.bannerImage}
      src={
          'https://via.placeholder.com/200'
      }
    //   src={
    //     collection?.bannerImageUrl
    //       ? collection.bannerImageUrl
    //       : 'https://via.placeholder.com/200'
    //   }
      alt="banner"
    />
  </div>
  <div className={style.infoContainer}>
    <div className={style.midRow}>
     
      <img
        className={style.profileImg}
        src={
             'https://via.placeholder.com/200'
          }
        //   src={
        //     collection?.imageUrl
        //       ? collection.imageUrl
        //       : 'https://via.placeholder.com/200'
        //   }
        alt="profile image"
      />
    </div>
    <div className={style.endRow}>
      <div className={style.socialIconsContainer}>
        <div className={style.socialIconsWrapper}>
          <div className={style.socialIconsContent}>
            <div className={style.socialIcon}>
              <CgWebsite />
            </div>
            <div className={style.divider} />
            <div className={style.socialIcon}>
              <AiOutlineInstagram />
            </div>
            <div className={style.divider} />
            <div className={style.socialIcon}>
              <AiOutlineTwitter />
            </div>
            <div className={style.divider} />
            <div className={style.socialIcon}>
              <HiDotsVertical />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={style.midRow}>
    
      <div className={style.title}>

      <div className="flex flex-col p-4">
        {/* <span className="text-sm font-normal">
          {meta?.description ?? "..."}
        </span> */}
        <AddressAvatar address={address} />
      </div>
      </div>
      {/* <div className={style.title}>{collection?.title}</div> */}
    </div>
    
     
  </div>

 { ownedNFTs?.length >0||ownedListedNFTs?.length>0 ?<><div className="flex flex-wrap ">
        {ownedNFTs&&ownedNFTs.map((nftItem, id) => (
          <NFTCard
            key={id}
            nft={nftItem}
            title="this is tested item"
      
          />
        ))}
        
      </div>

      {ownedListedNFTs && ownedListedNFTs.length > 0 && (
            <>
              <div className="relative my-2 h-[1px] w-full flex-shrink-0 bg-black">
                <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transform bg-white px-2 font-mono font-semibold">
                  LISTED
                </div>
              </div>
            </>
          )} 
          
  <div className="flex flex-wrap ">
        {ownedListedNFTs&&ownedListedNFTs.map((nftItem, id) => (
          <NFTCard
            key={id}
            nft={nftItem}
            title="this is tested item"
           
          />
        ))}
        
      </div></>:<div className={style.description}>No NFT Found</div> }
     
</div>
 :
 <div className={style.walletConnectWrapper}>
       <button
         className={style.button}
         onClick={() => connectWallet()}
       >
         {loading?"Loading...":"Connect Wallet"}
         
       </button>
       <div className={style.details}>
         You need Connect your wallet to
         <br /> run this app.
       </div>
     </div>}
</>
  )
}

export default Collection
