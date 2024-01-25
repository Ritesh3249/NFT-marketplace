import { gql, useQuery } from "@apollo/client";
import useSigner from "../../app/context/signer";
import MarketplaceAddress from "../../contractsData/NFTmarket-address.json"
import { parseRawNFT } from "./helpers"; 
// require('dotenv').config();
const useOwnedListedNFTs = () => {
  const { address } = useSigner();
  const { data } = useQuery(
    GET_OWNED_LISTED_NFTS,
    { variables: { owner: address ?? "" }, skip: !address }
  );
  const ownedListedNFTs = data?.nfts.map(parseRawNFT);

  return { ownedListedNFTs };
};

const GET_OWNED_LISTED_NFTS = gql`
  query GetOwnedListedNFTs($owner: String!) {
    nfts(where: {from: $owner ,to: "${process.env.NEXT_PUBLIC_ADDRESS}"}  ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export default useOwnedListedNFTs;