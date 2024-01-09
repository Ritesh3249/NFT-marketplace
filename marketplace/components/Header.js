"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import openseaLogo from '../assets/opensea.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex   `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end xsm:max-lg:hidden`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,

  //Hamburger
  hamburgerIcon: `text-[#8a939b] text-3xl font-black px-4 cursor-pointer lg:hidden`,

  mobileMenu: `lg:hidden bg-[#04111d] w-full py-2 px-4 mt-12 flex flex-col items-start absolute left-0 z-[100]`,
  mobileMenuItem: `text-white py-2 cursor-pointer hover:text-gray-300`,

}

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={openseaLogo} height={40} width={40} />
          <div className={style.logoText}>Opensea</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>

        <Link href="/collections/0x66a576A977b7Bccf510630E0aA5e450EC11361Fa">
          <div className={style.headerItem}> My Collections </div>
        </Link>
        <Link href="/create">
        <div className={style.headerItem}> Create </div>
        </Link>
        <div className={style.headerIcon}>
          <CgProfile />
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
      </div>
      <div className={style.hamburgerIcon} onClick={toggleMenu}>
          ☰
        </div>
        {isMenuOpen && (
        <div className={style.mobileMenu}>
                  <Link href="/collections/0x66a576A977b7Bccf510630E0aA5e450EC11361Fa" className='w-full'>

          <div className={style.mobileMenuItem}>My Collections</div>
          </Link>
          <Link href=" /create" className='w-full'>

          <div className={style.mobileMenuItem}>Create</div>
          </Link>
        </div>
        )} 
    </div>
  )
}

export default Header
