import axios from "axios";
import { apiKey, apisecret, pinataJsonUrl, pinataUrl, sendJsonHeader } from "./config"

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

      const resFile = await axios.post(pinataJsonUrl,data,sendJsonHeader)
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
        pinata_api_key: apiKey,
        pinata_secret_api_key: apisecret,
        Accept:"text/plain "
      }
    }
    const resHash = await axios.post(pinataUrl,formData,options)

    return `https://ipfs.io/ipfs/${resHash?.data.IpfsHash}`

}