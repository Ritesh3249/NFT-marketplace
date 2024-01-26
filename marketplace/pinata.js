import axios from "axios";
// require('dotenv').config()
const sendJsonHeader = {
  headers:{
      "Content-Type":"application/json",
      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
      accept: 'application/json'
       
  }
}
export async function sendJsonFileToIpfs(nftTitle, description,imageHash) {
    const data = JSON.stringify({
        "pinataMetaData" :{
          name:"marketPlace"
        },
        "pinataOptions":{
          "cidVersion":1
        },
        "pinataContent":{
          "MarketPlaceInfo":{
             
            "title":nftTitle,
            "description":description,
            "image":imageHash
          }
        }
  
      })

      const resFile = await axios.post(process.env.NEXT_PUBLIC_PINATA_JSON_URL,data,sendJsonHeader)
      return `https://ipfs.io/ipfs/${resFile?.data.IpfsHash}`
}

export async function sendImageToIpfs(file) {
    
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pinataOptions', JSON.stringify({
      cidVersion:0
    }));
 
    const options = {
      maxBodyLength:"Infinity",
      headers:{
        'Content-Type':`multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
        Accept:"text/plain "
      }
    }
    const resHash = await axios.post(process.env.NEXT_PUBLIC_PINATA_URL,formData,options)

    return `https://ipfs.io/ipfs/${resHash?.data.IpfsHash}`

}