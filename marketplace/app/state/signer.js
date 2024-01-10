"use client"
import { createContext, useContext, useState } from "react";
import { ethers } from 'ethers';
import {  toast } from 'react-toastify';
import MarketplaceAddress from "../../contractsData/NFTmarket-address.json"
import MarketplaceAbi from "../../contractsData/NFTmarket.json"
const SignerContext = createContext();

const useSigner = () => useContext(SignerContext);

export function SignerProvider({ children }) {
    const [signer, setSigner] = useState();
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(false);

    //   const [account, setAccount] = useState(null)
    //   const [nft, setNFT] = useState({})
    //   const [marketplace, setMarketplace] = useState({})

    const connectWallet = async () => {
        // setAccount(accounts[0])
        // Get provider from Metamask
        if(! window.ethereum){
            toast("You do not have wallet");
            return
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // it will give us all the accounts
        const provider = new ethers.BrowserProvider(window.ethereum)  // It will give us all the ethereum methods
        // Set signer
        const signer = await provider.getSigner()  //it will provide us the active address and provider
        const address = (await signer.getAddress())

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', async function (accounts) {
            //   setAccount(accounts[0])
            await web3Handler()
        })

        setSigner(signer)
        setAddress(address)
        setLoading(true)
        loadContracts(signer)


    }

    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        console.log(marketplace,"111")
    }
    const contextValue = { signer, address, loading, connectWallet }
    return (<SignerContext.Provider value={contextValue}>{children}</SignerContext.Provider>)
}

export default useSigner; 