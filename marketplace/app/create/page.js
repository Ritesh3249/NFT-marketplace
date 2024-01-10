"use client"
import Header from '@/components/Header';
import React, { useState } from 'react';
import { RiUpload2Fill } from 'react-icons/ri';
const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

const style = {
  wrapper: ` relative `,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://opensea.io/static/images/studio/spring-and-autumn-by-krisk.avif')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center  items-center`,
  copyContainer: `xsm:mx-5 lg:w-1/2`,
   cardContainer: `rounded-[3rem]   lg:w-1/2  border-solid border-2 border-sky-500 object-cover rounded-lg overflow-hidden`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,

  //Nft mint style
  createPage: `flex flex-col items-center mt-8`,
  formContainer: `bg-[#04111d] p-8 rounded-lg w-[400px]`,
  formTitle: `text-white text-2xl font-semibold mb-4`,
  formInput: `w-full h-10 bg-[#363840] text-[#e6e8eb] border-none rounded-md mb-4 px-2 outline-none`,
  formTextarea: `w-full h-24 bg-[#363840] text-[#e6e8eb] border-none rounded-md mb-4 px-2 outline-none resize-none`,
  formSubmit: `w-full h-10 bg-[#00d1ff] text-[#04111d] font-semibold rounded-md cursor-pointer`,
};

const CreateNFTPage = () => {
  const [nftTitle, setNFTTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log({nftTitle, description,imageFile})
    formData.append('nftTitle', nftTitle);
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
     console.log(formData)
    } catch (error) {
      console.error('Error during NFT minting:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };


  return (
    <div>
 
 
     
    <div className={style.wrapper}>
      <div className='relative z-[100]'>

      <Header/>
      </div>
    <div className={style.container}>
      <div className={style.contentWrapper}>
        <div className={style.copyContainer}>
        <div className={style.createPage}>
      <div className={style.formContainer}>
        <div className={style.formTitle}>Create Your NFT</div>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <input type="text" placeholder="NFT Title" className={style.formInput}  value={nftTitle}
                    onChange={(e) => setNFTTitle(e.target.value)} />
          <textarea placeholder="Description" className={style.formTextarea} value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="file" accept="image/*" className={style.formInput} onChange={handleImageChange}/>
          <button type="submit" className={style.formSubmit}>
            <RiUpload2Fill className="mr-2" />
            Mint NFT
          </button>
        </form>
      </div>
    </div>
        </div>
        <div className={style.cardContainer}>
          <img
            className="w-full h-full  object-cover xsm:max-lg:hidden"
            src="https://opensea.io/static/images/studio/spring-and-autumn-by-krisk.avif"
            alt=""
          />
       
             
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default CreateNFTPage;
