import { useContext, useEffect, useState,useRef} from "react"
import { CartContext } from "../context/CartContext"
import empty from '../assets/2xempty_cart_yfxml0.avif'
import { NavLink, useNavigate } from "react-router-dom"
import vegIcon from '../assets/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png'
import nonIcon from '../assets/images.png'
import { AuthenContext } from "../context/Authen"
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { ErrorToast, SuccessToast } from "./NotToast"
import OTPInput from "otp-input-react";
import { MdOutlineEdit } from "react-icons/md";
import MoonLoader from 'react-spinners/MoonLoader'
import { VeriBoxCont } from "../context/VerifBox"
import { AiOutlineDelete } from "react-icons/ai";

export const Cart = () =>{
    const {cartData,setCartData} = useContext(CartContext)
    const {auth,setAuth} = useContext(AuthenContext)
    const {verifBox,setVrfBox} = useContext(VeriBoxCont)

    const [email,setEmail] = useState("")
    const [otpBox,setOTPBox] = useState(false)
    const [otp,setOTP] = useState("")
    const [otpToken,setotpToken] = useState("")
    const [loading,setLoading] = useState(false)
    let totalPrice = cartData.reduce((acc,curVal)=>(acc+(curVal.price/100*curVal.quantity || curVal.defaultPrice/100*curVal.quantity)),0)

   const navigate = useNavigate()

   const handleCheckout =async () =>{
   const {user} = auth
  
   if(user?.isEmailVerf) navigate("/checkout")
   else setVrfBox(!verifBox)
   }

    const handleSendOTP =async (e) =>{
    e.preventDefault()
    try {
    setLoading(true)
    const requestURL = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/verifyEmail/sendOTP`,{
      method:"POST",headers:{
        'Content-Type':'application/json'
      },body:JSON.stringify({email,name:auth?.user?.name})
    })
    const response = await requestURL.json()
    const {success} = response
    setLoading(false)
    if(success){
      setOTPBox(true)
      setotpToken(response.otp)
      
      SuccessToast("OTP send successfully")
    }
    } catch (err) {
      setError('Error sending verification email. Please try again.')
    }
   }

   const handleEditEmail = () =>{
    setEmail("")
    setLoading(false)
    setOTPBox(false)
    setOTP("")
   }

   const verifyOTP =async (e) =>{
   e.preventDefault()
   setLoading(true)
   const requestURL = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/verifyEmail/verifyOTP`,{
    method:"POST",headers:{
      'Content-Type':'application/json'
    },body:JSON.stringify({otp,token:otpToken,id:auth.user.id})
   })
   const response = await requestURL.json()
   const {success} = response
   setLoading(false)
   if(success){
    setVrfBox(false)
     setEmail("")
     setOTPBox(false)
     setotpToken("")
     setOTP("")
    SuccessToast("Email verified successfully")

    setAuth({...auth,user:{...auth.user,isEmailVerf:true}})
   }
   else{
    ErrorToast("Wrong otp")
   }
   }
   
   const addItem = (elem) => {
    setCartData((prev) => {
        const existingItemIndex = prev.findIndex(item => item.id === elem.id); // Assuming each item has a unique 'id'
        if (existingItemIndex !== -1) {
            // If the item already exists, increase the quantity
            const updatedItem = {
                ...prev[existingItemIndex],
                quantity: prev[existingItemIndex].quantity + 1
            };
            return [
                ...prev.slice(0, existingItemIndex),
                updatedItem,
                ...prev.slice(existingItemIndex + 1)
            ];
        } else {
            // If the item does not exist, add it with quantity 1
            return [...prev, { ...elem, quantity: 1 }];
        }
    });
};

const decItem = (elem) => {
  setCartData((prev) => {
      const existingItemIndex = prev.findIndex(item => item.id === elem.id);
      if (existingItemIndex !== -1) {
          const currentItem = prev[existingItemIndex];
          if (currentItem.quantity > 1) {
              // If quantity is more than 1, decrease it
              const updatedItem = {
                  ...currentItem,
                  quantity: currentItem.quantity - 1
              };
              return [
                  ...prev.slice(0, existingItemIndex),
                  updatedItem,
                  ...prev.slice(existingItemIndex + 1)
              ];
          } else {
            ErrorToast("Item removed from cart")
              // If quantity is 1, remove the item from the cart
              return [
                  ...prev.slice(0, existingItemIndex),
                  ...prev.slice(existingItemIndex + 1)
              ];
          }
      }
      return prev; // Return the previous state if item not found
  });
};

const handleDeleteItem = (elem) => {
  setCartData((prev) => {
      return prev.filter(item => item.id !== elem.id); // Remove the item with the matching id
  });
ErrorToast("Item deleted from cart")
};
    return(
        <>
  
       {
        cartData.length==0 ?
        <div className={`w-full h-full`}>

        <div className="flex justify-center items-center">
            
       <div className="flex flex-col w-full h-full items-center justify-center mt-20">
       <img src={empty} className="w-[25%] mtb:w-[40%] tb:w-[45%] vlm:w-[50%] lm:w-[80%] " alt="" />
       <h1 className="text-center text-xl mt-5">Your cart is empty</h1>
       <p className="text-sm text-zinc-500 mt-2">You can go to home page to view more restaurants and dishes</p>
       <NavLink to="/" className="py-3 bg-orange-400 hover:bg-orange-600 transition-all duration-300 text-white px-4 mt-3 rounded-xl">

        <h1>Return to Home</h1>
       </NavLink>
       </div>

        </div>        

        </div>
        :
      
        <div className={`w-full h-full ${verifBox?"overflow-y-hidden":null}`}>
             <div className={`w-[75%] mx-auto mt-6 lD:w-[85%] tb:w-[88%]` }>


<div className={`ml-12 lD:ml-0`}>
<h1 className="text-4xl font-semibold lm:font-normal lm:text-2xl lm:first-letter:text-4xl lm:first-letter:font-extrabold">Your Shopping Bag</h1>
 <h1 className="mt-3 font-semibold">TOTAL ({cartData.length} items) ₹{totalPrice}</h1>
 <h1>Items in your bag are not reserved — check out now to make them yours.</h1>
</div>
 <div className="mt-7 flex tb:flex-col justify-center gap-8">

<div className="max-w-[60%] lD:max-w-[100%] ">

{
  cartData.map((elem)=>{
      return(
          <div className=" mb-8 border-[1.2px] p-3 border-zinc-200 relative py-7">
            <AiOutlineDelete onClick={()=>handleDeleteItem(elem)} className="text-2xl right-3 cursor-pointer top-3 absolute"/>
  {
      elem?.itemAttribute?.vegClassifier == "VEG"?
      <img src={vegIcon} className="w-4 rounded-sm" alt="" />:
      <img src={nonIcon} className="w-4" alt="" />
  }
           <div className="flex items-center  justify-between">
  <div className="w-[55%] flex flex-col">
  <h1>{elem.name}</h1>
  <p className="mt-2"> {elem?.description?.slice(0,60)+"..."} </p>
  <h1 className="font-semibold"> ₹{elem.price/100 || elem.defaultPrice/100} </h1>

  <div className="flex items-center mt-2">
      <button onClick={()=>addItem(elem)} className="text-violet-500 focus:bg-zinc-200 w-3 rounded-lg px-3 flex items-center justify-center border-[1.7px] border-zinc-400">+</button>
      <h1 className="ml-2 mr-2"> {elem.quantity} </h1>
      <button onClick={()=>decItem(elem)} className="text-red-500 w-3 focus:bg-zinc-200 px-3 flex rounded-lg items-center justify-center border-[1.7px] border-zinc-400">-</button>
  </div>

  </div>
 <div className="w-[30%] ">
 <img src={`https://media-assets.swiggy.com/swiggy/image/upload/${elem.imageId}`} className="w-48" alt="" />
 </div>
  </div>
          </div>
      )
  })
}

</div>

<div className="w-[330px] px-5 py-3 tb:p-0 tb:w-full tb:mb-4">
  <h1 className="text-xl font-bold">Summary</h1>
  <div className="flex justify-between items-center mt-2">
  <h1 className="text-base"> Subtotal </h1>
  <h1 className="font-bold"> ₹{totalPrice} </h1>
  </div>
  <div className="flex justify-between items-center mt-2">
  <h1 className="text-base"> Estimated Shipping & Handling </h1>
  <h1 className="font-bold"> ₹0 </h1>
  </div>
  <div className="flex justify-between items-center mt-2">
  <h1 className="text-base"> Estimated Tax </h1>
  <h1 className="font-bold"> ₹0 </h1>
  </div>
 
 <hr className="mt-3 border-zinc-400" />
 <div className="flex justify-between items-center mt-2 mb-3">
  <h1 className="text-lg"> Total </h1>
  <h1 className="font-bold"> ₹{totalPrice} </h1>
  </div>
  <hr className="border-zinc-400" />
 

<button onClick={()=>handleCheckout()} className="mt-6 cursor-pointer rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 ease-in-out py-3 bg-violet-400 text-white w-full">
{auth?.user?.isEmailVerf ? <CiUnlock className="text-2xl"/> : <CiLock className="text-2xl"/>}
<h1 className="ml-2">Checkout</h1>
  </button>

{
  verifBox? 
  <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 z-50 bg-zinc-500/50 backdrop-blur-md">
  
<div className="w-[530px] relative min-h-64 rounded-lg shadow-2xl shadow-zinc-600 bg-white">

<IoCloseOutline onClick={()=>{
  setVrfBox(!verifBox)
  setEmail("")
  setOTPBox(false)
  setOTP("")
  setLoading(false)
}} className="text-2xl cursor-pointer absolute right-3 top-2"/>

{
  otpBox? 
  <div className="">
    <button onClick={()=>handleEditEmail()} className="bg-violet-500 rounded-lg py-2 absolute hover:bg-violet-400 hover:text-black duration-200 transition-all ease-in-out top-2 left-2 text-white flex items-center justify-center px-3">
    <MdOutlineEdit className="text-xl mr-1"/>
    Edit
    </button>
    <h1 className="text-center py-7 text-lg font-bold">Verify OTP</h1>
    <div className="px-7">
<h1>Enter OTP sent to {email}</h1>
<form action="" className="flex flex-col" onSubmit={verifyOTP}>
<OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
<button className="mt-3 py-3 mb-3 flex items-center justify-center text-white hover:text-black bg-violet-700 hover:bg-violet-400 duration-200 transition-all ease-in-out cursor-pointer rounded-lg">
  {
    loading && <MoonLoader className="mr-3" size={20}/>
  }
  <h1>Verify otp</h1>
  </button>
</form>
</div>
  </div>
  :<>
  <h1 className="text-center py-7 text-lg font-bold">Verify Email Address</h1>
<div className="px-7">
<h1>Enter email to verify OTP</h1>
<form action="" className="flex flex-col" onSubmit={handleSendOTP}>
<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="bg-zinc-300 mt-1 focus:outline-none text-lg py-3 px-5 rounded-lg" />
  <button className="mt-3 py-3 mb-3 flex items-center justify-center text-white hover:text-black bg-violet-700 hover:bg-violet-400 duration-200 transition-all ease-in-out cursor-pointer rounded-lg">
  {
    loading && <MoonLoader className="mr-3" size={20}/>
  }
  <h1>Send otp</h1>
  </button>
</form>
</div>
  </>
}

</div>

  </div>
  :null
}

 </div>

 </div>

 </div>

        </div>

       }
        </>
    )
}