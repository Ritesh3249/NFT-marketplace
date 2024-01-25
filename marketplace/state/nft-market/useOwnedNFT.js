import { gql, useQuery } from "@apollo/client";
import useSigner from "../../app/context/signer";
import { parseRawNFT } from "./helpers";

 

const useOwnedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery(
    GET_OWNED_NFTS,
    { variables: { owner: address ?? "" }, skip: !address }
  );
  const ownedNFTs = data?.nfts.map(parseRawNFT);

  return { ownedNFTs };
};

const GET_OWNED_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export default useOwnedNFTs;