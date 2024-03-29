"use client"
import Header from '@/components/Header';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { RiUpload2Fill } from 'react-icons/ri';
import { sendImageToIpfs, sendJsonFileToIpfs } from '@/pinata';
import useSigner from '../context/signer';
import Image from 'next/image';

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
///Logoutcss
  
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,

};

const CreateNFTPage = () => {
  const [nftTitle, setNFTTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    nftTitle: '',
    description: '',
    imageFile: '',
  });

  //Calling context

  const {contract,address,loading , connectWallet}=useSigner()
  // console.log(contract, "1111111")

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    //Validate fields
    const formErrors = {};
    if (!nftTitle.trim()) {
      formErrors.nftTitle = 'NFT Title is required';
    }
    if (!description.trim()) {
      formErrors.description = 'Description is required';
    }
    if (!imageFile) {
      formErrors.imageFile = 'Image is required';
    }

    setErrors(formErrors);

    // If there are validation errors, stop form submission
    if (Object.values(formErrors).some((error) => error)) {
      return;
    }

    setLoading(true)


    try {
      
      
      const imageHash = await sendImageToIpfs(imageFile)
      const hash = await sendJsonFileToIpfs(nftTitle, description, imageHash)
     
    
     
      
      // console.log(contract, "1111111")
       await contract.createNft(hash);
       
      toast.success("Nft minted successfully",{
        position:"top-center"
      })
      // console.log(imageHash,"2222222")
    } catch (error) {
      setLoading(false)
      toast.error("Nft minting Failed ",{
        position:"top-center"
      })

      console.error('Error during NFT minting:', error.shortMessage);
    }
    setNFTTitle('');
    setDescription('');
    setImageFile(null);
    setLoading(false)
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

   
  useEffect(() => { 
    if ( window.ethereum){ connectWallet();
   
    
    window.ethereum.on("accountsChanged", connectWallet);
  
    
    window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
    })}
  }, []);
  return (
    <div>

 
{ 
    address?<>

      <div className={style.wrapper}>
        <div className='relative z-[100]'>

          <Header />
        </div>
        <div className={style.container}>
          <div className={style.contentWrapper}>
            <div className={style.copyContainer}>
              <div className={style.createPage}>
                <div className={style.formContainer}>
                  <div className={style.formTitle}>Create Your NFT</div>
                  <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input type="text" placeholder="NFT Title" className={style.formInput} value={nftTitle}
                      onChange={(e) => setNFTTitle(e.target.value)} />
                    {errors.nftTitle && <div style={{ color: 'red' }}>{errors.nftTitle}</div>}

                    <textarea placeholder="Description" className={style.formTextarea} value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
                    {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}

                    <input type="file" accept="image/*" className={style.formInput} onChange={handleImageChange} />
                    {errors.imageFile && <div style={{ color: 'red' }}>{errors.imageFile}</div>}

                    <button type="submit" className={style.formSubmit}>
                      <RiUpload2Fill className="mr-2" />
                      {Loading ? 'Loading...' : 'Mint NFT'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={style.cardContainer}>
              <Image
                className="w-full h-full  object-cover xsm:max-lg:hidden"
                src="https://opensea.io/static/images/studio/spring-and-autumn-by-krisk.avif"
                alt="sdc"
                width={500}
                height={500}
              />


            </div>
          </div>
        </div>
      </div>
      </>
      :
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
  );
};

export default CreateNFTPage;
