import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import Button from "./Button";
import CustomDialog from "./CustomDialog";
import { toast } from "react-toastify";
// import { Input } from "./Input";

const SellPopup = (props) => {
  const { open, onClose, onSubmit } = props;
  const [price, setPrice] = useState("");
  const [error, setError] = useState();

  const onConfirm = () => {
    if (!price) return setError("Must be a valid number");
    const wei = ethers.parseEther(price);
console.log(wei,"123123")
    if (wei==0) return toast.error("Price Must be a greater than 0",{
        position:"top-center"
    });
    onSubmit(wei);
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="List NFT for Sale"
      description="This will list the NFT for sale, you can cancel anytime."
    >
      <div className="flex items-end">
        <div className="mr-2 flex flex-grow flex-col">
          <label
            htmlFor="price"
            className="ml-2 text-xs font-semibold text-gray-500"
          >
            PRICE (ETH)
          </label>
          {/* <Input
            name="price"
            id="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            error={error}
          /> */}
          <input style={{border:'1px solid black',outline:"none"}} type="text" onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <Button onClick={onConfirm}>CONFIRM</Button>
      </div>
    </CustomDialog>
  );
};

export default SellPopup;