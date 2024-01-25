"use client"
import React, { useEffect, useState } from 'react'
import NFTCard from './NFTCard'
import useSigner from '@/app/context/signer'
import useOwnedNFTs from '@/state/nft-market/useOwnedNFT'
import useNFTMarket from '@/state/nft-market'
 

const style = {
  wrapper: `relative mt-5`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-white text-[46px] font-semibold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {
  const [nfts, setNfts] = useState([])

// const {address,loading , connectWallet}=useSigner()
const {listedNFTs} = useNFTMarket();

// console.log(ownedListedNFTs," ownedListedNFTs")
// console.log(listedNFTs,"listedNFTs")
// console.log(ownedNFTs,"ownedNFTs")
 
  
 

  
  
  return (
    <div className={style.wrapper}> 
    
         <div className="flex flex-wrap ">
        {listedNFTs&&listedNFTs.map((nftItem, id) => (
          <NFTCard
            key={id}
            nft={nftItem}
            title="this is tested item"
          />
        ))}
        
      </div>
      
    </div>
  )
}

export default Hero
