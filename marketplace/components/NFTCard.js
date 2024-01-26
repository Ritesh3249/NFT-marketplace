// "use client"
// import { useEffect, useState } from 'react'
// import { BiHeart } from 'react-icons/bi'
// import Router from 'next/router'
// import { useRouter } from 'next/navigation'
// import useSigner from '@/app/context/signer'
// import SellPopup from './SellPopup'
// import { toast } from 'react-toastify'
// // import useNFTMarket from '@/app/context'

// const style = {
//   nftWrapper: `bg-[#303339]    my-10 mx-5 rounded-2xl  overflow-hidden cursor-pointer`,
//   imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
//   nftImg: `w-full object-cover`,
//   details: `p-3`,
//   info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
//   infoLeft: `flex-0.6 flex-wrap`,
//   collectionName: `font-semibold text-sm text-[#8a939b]`,
//   assetName: `font-bold text-lg mt-2`,
//   infoRight: `flex-0.4 text-right`,
//   priceTag: `font-semibold text-sm text-[#8a939b]`,
//   priceValue: `flex items-center text-xl font-bold mt-2`,
//   ethLogo: `h-5 mr-2`,
//   likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
//   likeIcon: `text-xl mr-2`,
// }

// const NFTCard = ({ nftItem, title, listings }) => {
//   const [isListed, setIsListed] = useState(false)
//   const [price, setPrice] = useState(0)
//   const [nft,setNft] = useState()
//   const [loading, setLoading] = useState(false);
//   const [sellPopupOpen, setSellPopupOpen] = useState(false);
//   const { listNFT, cancelListing, buyNFT } = useSigner();

//   const router = useRouter()
//   const { address } = useSigner();





//   const showErrorToast = () => toast.warn("Something wrong!");

//   const onButtonClick = async () => {
//     if (owned) {
//       if (forSale) onCancelClicked();
//       else setSellPopupOpen(true);
//     } else {
//       if (forSale) onBuyClicked();
//       else {
//         throw new Error(
//           "onButtonClick called when NFT is not owned and is not listed, should never happen"
//         );
//       }
//     }
//   };

//   const onBuyClicked = async () => {
//     setLoading(true);
//     try {
//       await buyNFT(nft);
//       router.push("/owned");
//       toast.success(
//         "You collection will be updated shortly! Refresh the page."
//       );
//     } catch (e) {
//       showErrorToast();
//       console.log(e);
//     }
//     setLoading(false);
//   };

//   const onCancelClicked = async () => {
//     setLoading(true);
//     try {
//       await cancelListing(nft.id);
//       toast.success(
//         "You canceled this listing. Changes will be reflected shortly."
//       );
//     } catch (e) {
//       showErrorToast();
//       console.log(e);
//     }
//     setLoading(false);
//   };

//   const onSellConfirmed = async (price) => {
//     setSellPopupOpen(false);
//     setLoading(true);
//     try {
//       await listNFT(nftItem.id, price);
//       toast.success(
//         "You listed this NFT for sale. Changes will be reflected shortly."
//       );
//     } catch (e) {
//       showErrorToast();
//       console.log(e);
//     }
//     setLoading(false);
//   };

//   const forSale = nftItem.price != "0";
//   const owned = nftItem.owner == address?.toLowerCase();









//   useEffect(() => {
//     const listing = listings.find((listing) => listing.asset.id === nftItem.id)
//     if (Boolean(listing)) {
//       setIsListed(true)
//       setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
//     }
//     const fetchMetadata = async () => {
//       const metadataResponse = await fetch(nftItem.tokenURI);
//       // console.log(metadataResponse,"asdfasd")
//       if (metadataResponse.status != 200) return;
//       const {MarketPlaceInfo} = await metadataResponse.json();
   
//       setNft({
//         name: MarketPlaceInfo.title,
//         description: MarketPlaceInfo.description,
//         image: MarketPlaceInfo.image,
//       });
//     };
//     void fetchMetadata();
//   }, [listings, nftItem])

//   return (
//     <>
//     { nft&&<div
//       className={style.nftWrapper }
//       style={{width: '24rem'}}
//       // onClick={() => {
//       //   router.push(`/nfts/${nftItem.id}?isListed=${isListed}`)
//       // }}
//     >
//       <div className={style.imgContainer}>
//         <img src={nft.image} alt={'image'} className={style.nftImg} />
//       </div>
//       <div className={style.details}>
//         <div className={style.info}>
//           <div className={style.infoLeft}>
//             <div className={style.collectionName}>{nft.description}</div>
//             <div className={style.assetName}>{nft.name}</div>
//           </div>
//           {/* {isListed && (
//             <div className={style.infoRight}>
//               <div className={style.priceTag}>Price</div>
//               <div className={style.priceValue}>
//                 <img
//                   src=""
//                   alt="eth"
//                   className={style.ethLogo}
//                 />
//                 {price}
//               </div>
//             </div>
//           )} */}
//           <button
//         className="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
//         onClick={onButtonClick}
//         disabled={loading}
//       >
//         {loading && "Busy..."}
//         {!loading && (
//           <>
//             {!forSale && "SELL"}
//             {forSale && owned && (
//               <>
//                 <span className="group-hover:hidden">{nft.price} ETH</span>
//                 <span className="hidden group-hover:inline">CANCEL</span>
//               </>
//             )}
//             {forSale && !owned && (
//               <>
//                 <span className="group-hover:hidden">{nft.price} ETH</span>
//                 <span className="hidden group-hover:inline">BUY</span>
//               </>
//             )}
//           </>
//         )}
//       </button>
//         </div>
//         <SellPopup
//         open={sellPopupOpen}
//         onClose={() => setSellPopupOpen(false)}
//         onSubmit={onSellConfirmed}
//       />  
//         {/* <div className={style.likes}>
//           <span className={style.likeIcon}>
//             <BiHeart />
//           </span>{' '}
//           {nftItem.likes}
//         </div> */}
//       </div>
//     </div>}</>
//   )
// }

// export default NFTCard


import classNames from "classnames"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; 
// import AddressAvatar from "./AddressAvatar";
import SellPopup from "./SellPopup";
import useNFTMarket from "@/state/nft-market";
import useSigner from "@/app/context/signer";
import Image from "next/image";
 
const NFTCard = (props) => {
  const { nft } = props;
 
  const { address } = useSigner();
  const { listNFT, cancelListing, buyNFT } = useSigner();
const router = useRouter();
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(false);
  const [sellPopupOpen, setSellPopupOpen] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      // const metadataResponse = await fetch(nft.tokenURI);
      // if (metadataResponse.status != 200) return;
      // const json = await metadataResponse.json();
      const metadataResponse = await fetch(nft.tokenURI);
            // console.log(metadataResponse,"asdfasd")
            if (metadataResponse.status != 200) return;
            const {MarketPlaceInfo} = await metadataResponse.json();
         
      setMeta({
        name: MarketPlaceInfo.title,
        description: MarketPlaceInfo.description,
        imageURL: MarketPlaceInfo.image,
      });
    };
    void fetchMetadata();
  }, [nft.tokenURI]);

  const showErrorToast = (Error) => toast.warn(Error,{
    position:"top-center"
  });

  const onButtonClick = async () => {
    if (owned) {
      if (forSale) onCancelClicked();
      else setSellPopupOpen(true);
    } else {
      if (forSale) onBuyClicked();
      else {
        throw new Error(
          "onButtonClick called when NFT is not owned and is not listed, should never happen"
        );
      }
    }
  };

  const onBuyClicked = async () => {
    setLoading(true);
    try {
      await buyNFT(nft);
      router.push("/collections");
      toast.success(
        "You collection will be updated shortly! Refresh the page."
      );
    } catch (Error) {
      showErrorToast(Error.shortMessage);
      console.log(Error.shortMessage,"sdfasdf");
    }
    setLoading(false);
  };

  const onCancelClicked = async () => {
    setLoading(true);
    try {
      await cancelListing(nft.id);
      toast.success(
        "You canceled this listing. Changes will be reflected shortly."
      );
    } catch (e) {
      showErrorToast(e.shortMessage);
      console.log(e.shortMessage);
    }
    setLoading(false);
  };

  const onSellConfirmed = async (price) => {
    setSellPopupOpen(false);
    setLoading(true);
    try {
      await listNFT(nft.id, price);
      toast.success(
        "You listed this NFT for sale. Changes will be reflected shortly."
      );
    } catch (e) {
      showErrorToast(e.shortMessage);
      console.log(e.shortMessage);
    }
    setLoading(false);
  };

  const forSale = nft.price != "0";
  const owned = nft.owner == address?.toLowerCase();

  return (
    <div
      className={classNames(
        "flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-xl border font-semibold shadow-sm mr-2 mb-2"
      )}
    >
      {meta ? (
        <Image
          src={meta?.imageURL}
          alt={meta?.name}
          width={500}
          height={500}
          className="h-80 w-full object-cover object-center"
        />
      ) : (
        <div className="flex h-80 w-full items-center justify-center">
          loading...
        </div>
      )}
      <div className="flex flex-col p-4">
        <p className="text-lg">{meta?.name ?? "..."}</p>
        <span className="text-sm font-normal">
          {meta?.description ?? "..."}
        </span>
        {/* <AddressAvatar address={nft.owner} /> */}
      </div>
      <button
        className="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
        onClick={onButtonClick}
        disabled={loading}
      >
        {loading && "Busy..."}
        {!loading && (
          <>
            {!forSale && "SELL"}
            {forSale && owned && (
              <>
                <span className="group-hover:hidden">{nft.price} ETH</span>
                <span className="hidden group-hover:inline">CANCEL</span>
              </>
            )}
            {forSale && !owned && (
              <>
                <span className="group-hover:hidden">{nft.price} ETH</span>
                <span className="hidden group-hover:inline">BUY</span>
              </>
            )}
          </>
        )}
      </button>
      <SellPopup
        open={sellPopupOpen}
        onClose={() => setSellPopupOpen(false)}
        onSubmit={onSellConfirmed}
      />
    </div>
  );
};

export default NFTCard;