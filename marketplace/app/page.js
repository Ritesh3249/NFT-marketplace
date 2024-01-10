"use client"
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import React, { useState } from 'react'
import useSigner from './state/signer'
const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}
const page = () => {
  const {address,loading , connectWallet}=useSigner()

  return (
    <div className={style.wrapper}>
     
   { 
    address?<>
   <Header />
    <Hero />
    </>:
    <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet()}
          >
            {loading?"Loading...":"Connect Wallet"}
            
          </button>
          <div className={style.details}>
            You need Connect your wallet to
            <br /> run this app.
          </div>
        </div>}
        </div>

  )
} 

export default page