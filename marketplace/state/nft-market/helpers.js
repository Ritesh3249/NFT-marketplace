import { ethers } from "ethers"; 

export const parseRawNFT = (raw) => {
  // console.log(raw)
  return {
    id: raw.id,
    owner: raw.price == "0" ? raw.to : raw.from,
    price: raw.price == "0" ? "0" : ethers.formatEther(raw.price),
    tokenURI: raw.tokenURI,
  };
};