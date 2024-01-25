 

import useListedNFTs from "./useListedNFT";
import useOwnedListedNFTs from "./useOwnedListedNFT";
import useOwnedNFTs from "./useOwnedNFT";

const useNFTMarket = () => {
  
  const ownedNFTs = useOwnedNFTs();
  const ownedListedNFTs = useOwnedListedNFTs();
  const listedNFTs = useListedNFTs();

 


  return {
     
    ...ownedNFTs,
    ...ownedListedNFTs,
    ...listedNFTs,
  };
};

export default useNFTMarket;