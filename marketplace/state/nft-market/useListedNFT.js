import { gql, useQuery } from "@apollo/client";
import useSigner from "../../app/context/signer";
import MarketplaceAddress from "../../contractsData/NFTmarket-address.json"
import { parseRawNFT } from "./helpers";
// require('dotenv').config();

const useListedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery(
    GET_LISTED_NFTS,
    { variables: { currentAddress: address ?? "" }, skip: !address }
  );
  const listedNFTs = data?.nfts.map(parseRawNFT);

  // console.log(process.env.NEXT_PUBLIC_ADDRESS)
  return { listedNFTs };
};

const GET_LISTED_NFTS = gql`
  query GetListedNFTs($currentAddress: String!) {
    nfts(
      where: {
        to: "${process.env.NEXT_PUBLIC_ADDRESS}"
        from_not: $currentAddress
      }
    ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export default useListedNFTs;