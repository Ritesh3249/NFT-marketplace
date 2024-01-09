"use client" 
import { useEffect, useMemo, useState } from 'react' 
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header'
import NFTImage from '@/components/nft/NFTImage'
import GeneralDetails from '@/components/nft/GeneralDetails'
import Purchase from '@/components/nft/Purchase'
import ItemActivity from '@/components/nft/ItemActivity'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  // const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState({
    id:1,
    image:'https://via.placeholder.com/200',
    name:'item1'
  })
  // const [listings, setListings] = useState([])
  const router = useSearchParams()
// console.log(router.get('isListed'))
  // const nftModule = useMemo(() => {
  //   if (!provider) return

  //   const sdk = new ThirdwebSDK(
  //     provider.getSigner(),
  //     'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
  //   )
  //   return sdk.getNFTModule('0x66a576A977b7Bccf510630E0aA5e450EC11361Fa')
  // }, [provider])

  // // get all NFTs in the collection
  // useEffect(() => {
  //   if (!nftModule) return
  //   ;(async () => {
  //     const nfts = await nftModule.getAll()

  //     const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

      
  //   })()
  // }, [nftModule])

  // const marketPlaceModule = useMemo(() => {
  //   if (!provider) return

  //   const sdk = new ThirdwebSDK(
  //     provider.getSigner(),
  //     'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
  //   )

  //   return sdk.getMarketplaceModule(
  //     '0x93A771F7ce845C33381f677489cF21a5964EDD0b'
  //   )
  // }, [provider])

  // useEffect(() => {
  //   if (!marketPlaceModule) return
  //   ;(async () => {
  //     setListings(await marketPlaceModule.getAllListings())
  //   })()
  // }, [marketPlaceModule])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.get('isListed')}
                selectedNft={selectedNft}
                // listings={listings}
                // marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
