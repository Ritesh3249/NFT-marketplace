"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'  
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import Header from '@/components/Header'
import NFTCard from '@/components/NFTCard'
import Modal from './Modal'
import { FaPencilAlt } from "react-icons/fa";

 
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
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
//   const router = useRouter()
//   const { provider } = useWeb3()
//   const { collectionId } = router.query
//   const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([{
    id:1,
    image:'https://via.placeholder.com/200',
    name:'item1'
  },
  {
    id:2,
    image:'https://via.placeholder.com/200',
    name:'item2'
  },{
    id:3,
    image:'https://via.placeholder.com/200',
    name:'item3'
  },{
    id:4,
    image:'https://via.placeholder.com/200',
    name:'item4'
  },{
    id:5,
    image:'https://via.placeholder.com/200',
    name:'item5'
  },
])

  const [listings, setListings] = useState([{
    asset:{
      id:1
    },
    buyoutCurrencyValuePerToken:{
      displayValue:121
    }
  }])
  const [isModalOpen, setModalOpen] = useState(false);
  const [userName, setUserName] = useState('Your Name');

  const handleSaveName = (newName) => {
    setUserName(newName);
    // Add logic to save the new name (e.g., API call, state update, etc.)
  };

//   //

//   const nftModule = useMemo(() => {
//     if (!provider) return

//     const sdk = new ThirdwebSDK(
//       provider.getSigner(),
//       'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
//     )
//     return sdk.getNFTModule(collectionId)
//   }, [provider])

//   // get all NFTs in the collection
//   useEffect(() => {
//     if (!nftModule) return
//     ;(async () => {
//       const nfts = await nftModule.getAll()

//       setNfts(nfts)
//     })()
//   }, [nftModule])

//   const marketPlaceModule = useMemo(() => {
//     if (!provider) return

//     const sdk = new ThirdwebSDK(
//       provider.getSigner(),
//       'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
//     )
//     return sdk.getMarketplaceModule(
//       '0x93A771F7ce845C33381f677489cF21a5964EDD0b'
//     )
//   }, [provider])

//   // get all listings in the collection
//   useEffect(() => {
//     if (!marketPlaceModule) return
//     ;(async () => {
//       setListings(await marketPlaceModule.getAllListings())
//     })()
//   }, [marketPlaceModule])


//   const fetchCollectionData = async (sanityClient = client) => { // to get the clube name data from sanaty
//     const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
//       "imageUrl": profileImage.asset->url,
//       "bannerImageUrl": bannerImage.asset->url,
//       volumeTraded,
//       createdBy,
//       contractAddress,
//       "creator": createdBy->userName,
//       title, floorPrice,
//       "allOwners": owners[]->,
//       description
//     }`

//     const collectionData = await sanityClient.fetch(query)

//     console.log(collectionData, '🔥')

//     // the query returns 1 object inside of an array
//     await setCollection(collectionData[0])
//   }

//   useEffect(() => {
//     fetchCollectionData()
//   }, [collectionId])

//   console.log(router.query)
//   console.log(router.query.collectionId)
  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
      <FaPencilAlt
          className="text-white text-2xl absolute top-100 left-2 cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
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
        <FaPencilAlt
            className="text-white text-2xl absolute top-2 right-2 cursor-pointer"
            onClick={() => setModalOpen(true)}
          />
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
        <FaPencilAlt
            className="text-white text-2xl absolute top-2 right-2 cursor-pointer"
            onClick={() => setModalOpen(true)}
          />
          <div className={style.title}>{'title'}</div>
          {/* <div className={style.title}>{collection?.title}</div> */}
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{' '}
            {/* <span className="text-[#2081e2]">{collection?.creator}</span> */}
            <span className="text-[#2081e2]">{'creator'}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{"12"}</div>
              {/* <div className={style.statValue}>{nfts.length}</div> */}
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                { 'Ritesh'}
                {/* {collection?.allOwners ? collection.allOwners.length : ''} */}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src=""
                  alt="eth"
                  className={style.ethLogo}
                />
                {/* {collection?.floorPrice} */}
                {'222'}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src=""
                  alt="eth"
                  className={style.ethLogo}
                />
                {/* {collection?.volumeTraded}.5K */}
                0000.5K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>this is a description</div>
          {/* <div className={style.description}>{collection?.description}</div> */}
        </div>
      </div>
      <div className="flex flex-wrap ">
        {nfts.map((nftItem, id) => (
          <NFTCard
            key={id}
            nftItem={nftItem}
            title="this is tested item"
            listings={listings}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveName} />

    </div>
  )
}

export default Collection
