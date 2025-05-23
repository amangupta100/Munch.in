import React, { useContext, useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal';
import { AuthenContext } from '../context/Authen';
import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from './NotToast';
import MoonLoader from 'react-spinners/MoonLoader'
import { SelectedAddCont } from '../context/SelectedAddCont';
import { IoMdAdd } from "react-icons/io";
import { ActiveStepper } from '../context/ActiveStepper';
import { CartContext } from '../context/CartContext';
import vegIcon from '../assets/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png'
import nonIcon from '../assets/images.png'
import { IoCloseOutline } from 'react-icons/io5';
import { PaymentBoxCont } from '../context/PaymentBoxCont'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { Oval } from 'react-loader-spinner';
import { PaymentDet } from '../context/PaymentDet';
import { ProfileImage } from '../context/ProfileImage';

function UserDetails() {
const [address,setAddress] = useState([])
const [formDet,setForDetails] = useState({number:"",pincode:"",locality:"",address:"",city:"",State:""})
const [loading,setLoading] = useState(false)

const {auth,setAuth} = useContext(AuthenContext)
const {selectedAddr} = useContext(SelectedAddCont)
const {activeStep,setActiveStep} = useContext(ActiveStepper)
const navigate = useNavigate()
const {ProfileUrl,setProfileUrl} = useContext(ProfileImage)

const handleFormDet = (value,name) =>{
setForDetails({...formDet,[name]:value})
}

useEffect(()=>{
  !auth.token?navigate("/login"):null
},[])

useEffect(() => {
  const fetchAddDet = async () => {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/details`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: auth.token })
      });
      const response = await req.json();
      if (response.success && response.decoded && response.decoded.addresses) {
        setProfileUrl(response.decoded.imagePath)
          setAddress(response.decoded.addresses);
      } else {
          setAddress([]);
      }
  };
  fetchAddDet();
}, [auth.token]);

const handleDetSumbit = async (e) => {
  e.preventDefault();
  const {number,pincode,locality,address,city} =  formDet
if(number.length==10 && pincode && locality && address.length>0 && city.length>0){
  setLoading(true);
  const reqURL = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/updatedDetails`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: auth?.user?.id, data: formDet })
  });
  const resp = await reqURL.json();
  setLoading(false);
  
  if (resp.success) {
    setAuth({ ...auth, token: resp.token });
      SuccessToast("Address added successfully");
      setForDetails({number:"",pincode:"",locality:"",address:"",city:"",State:""})
  } else {
      ErrorToast(resp.message); // Handle error case
  }
}
else{
  ErrorToast("Fill the neccesary field to add new address")
}
};

const movetoNext = () =>{
  setActiveStep(activeStep+1) 
}

  return(
    <div className='w-full flex mt-8 flex-col bg-violet-200 mb-5'>
    <div className="w-full px-4 py-4 bg-violet-500">
      <h1 className='text-lg font-semibold text-white'>Delivery Address</h1>
    </div>

  
    <div className="p-4">

    {address.length >0?
  <div className='p-4 bg-white w-1/2 mtb:w-full tb:w-full rounded-lg'>
   
    <h1 className='text-lg'>Saved Address</h1>
    <h1 className='font-semibold inline-block mr-1'> {auth?.user.name} </h1>
    {
    address.map((elem,i)=>{
     return <AddressDet i={i} elem={elem} />
    })
   }
   <button onClick={()=>{
    selectedAddr ? movetoNext() : ErrorToast("Select a address to continue")
   }} className="w-full mb-3 flex items-center lm:w-full lm:translate-x-0 justify-center cursor-pointer tb:translate-x-1/2 tb:mt-3 tb:w-1/2 bg-violet-400 rounded-xl text-white py-3 hover:bg-violet-700 mt-6 transition-all duration-300">Submit And Deliver Here</button>
  </div>:null}
    
    <div className="mt-6">
      <h1 className='uppercase font-semibold text-lg'>Add a new Address</h1>
      <form className='mt-3 flex flex-col gap-5 w-[100%]'>

       <div className="flex gap-6 items-center tb:justify-center mtb:justify-center w-full mtb:flex-col">
       <input type="text" className='cursor-not-allowed bg-zinc-100 mtb:w-full text-zinc-400 px-5 py-3 rounded-lg focus:outline-none ' readOnly value={auth?.user?.name} />
       <input required value={formDet.number} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='number' type="number" placeholder='10-digit mobile number' className='px-5 py-3 w-[25%] lD:w-[40%] mtb:w-full mtb:mr-0 rounded-lg focus:outline-none mr-6'  />
       </div>

       <div className="flex gap-6 items-center mdm:flex-col lm:flex-col tb:justify-center">
       <input required value={formDet.pincode} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='pincode' type="number" placeholder='Pincode' className='px-5 py-3 rounded-lg mdm:w-full lm:w-full focus:outline-none'  />
       <input required value={formDet.locality} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='locality' type="text" placeholder='Locality' className='px-5 py-3 mtb:w-full w-[25%] lD:w-[40%] rounded-lg focus:outline-none mr-6 tb:mr-0'  />
       </div>
       <textarea value={formDet.address} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name="address" className='w-[50%] lD:w-[65%] px-5 py-3 focus:outline-none tb:w-[90%] mtb:w-full lm:w-full rounded-lg' placeholder='Address (Area and Street)' id=""></textarea>

       <div className="flex gap-6 mdm:flex-col lm:flex-col items-center">
       <input required value={formDet.city} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='city' type="text" placeholder='City/District/Town' className='px-5 py-3 rounded-lg mtb:w-full focus:outline-none lD:w-[40%]'  />
       
       <select name="State" onChange={(e)=>handleFormDet(e.target.value,e.target.name)} className='px-5 rounded-lg focus:outline-none lm:w-full py-3 mdm:w-full' id="">
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Banglore">Banglore</option>
        <option value="Punjab">Punjab</option>
        <option value="Haryana">Haryana</option>
        <option value="Gujarat">Gujarat</option>
       </select>

      

       </div>

       <button disabled={loading} onClick={handleDetSumbit} className={`group ${loading?"cursor-not-allowed bg-neutral-500":null} flex items-center justify-center mx-auto duration-500 hover:text-rose-300 hover:rounded-3xl ease-in-out relative bg-neutral-800 py-4 w-full p-3 text-gray-50 text-base font-bold`}>
        {
          loading ?  
          <Oval visible={true} height="30" width="30" color="#FFFFFF" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" /> 
          : 
          <>
          <IoMdAdd className='text-xl mr-2'/>
          <h1>Add Address</h1>
          </>
        }
       </button>
   
      </form>
    </div>


    </div>

    </div>
  );
}


function OrderSumAndPayment() {
  const [paymentMode,setpayMode] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const {selectedAddr,setselecAddr} = useContext(SelectedAddCont)
  const {paydet,setpayDet} = useContext(PaymentDet)
  const {cartData} = useContext(CartContext)
  const {paymentBox,setPaymentBox} = useContext(PaymentBoxCont)
  const {activeStep,setActiveStep} = useContext(ActiveStepper)
  const {auth} = useContext(AuthenContext)

  let totalPrice = cartData.reduce((acc,curVal)=>(acc+(curVal.price/100*curVal.quantity || curVal.defaultPrice/100*curVal.quantity)),0)

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
    })
  }

  const createRazorpayOrder =async (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    setLoading(true)
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url:`${import.meta.env.VITE_BACKEND_BASE_URL}/payment/orders`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
  
    axios.request(config)
    .then((response) => {
      handleRazorpayScreen(response.data.amount)
      setLoading(false)
    })
    .catch((error) => {
      ErrorToast("error at", error.message)
    })
  }

  const handleRazorpayScreen = async(amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!res) {
      ErrorToast("Some error at razorpay screen loading")
      return;
    }

    let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

    const options = {
      key: 'rzp_test_49UGrKVElzxHaT',
      amount: amount,
      currency: 'INR',
      name: "Munch.in",
      description: "Payment to Munch.in",
      image: "https://munch-in-amangupta100s-projects.vercel.app/assets/munchin-high-resolution-logo-transparent-cropped-_kqTsnzF.svg",
      handler:async function (response){
        SuccessToast("Payment Successful")
        navigate("/payment/success")
        setPaymentBox(false)
        setActiveStep(0)
        setpayDet({...paydet,response,payTime: `${hours-12}:${minutes}` ,payDate:`${day}-${month}-${year}`})

        const req = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/order`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             id: auth?.user?.id ,
             methodPay:"Online Mode",
             payDate:`${day}-${month}-${year}`,amount:totalPrice,
             Items:cartData
             })
        });
        const res = await req.json()
        const {success,message} = res
        if(success){
        
        }else{
          ErrorToast(message)
        }
      },
      prefill: {
        name: "Munch.in",
        email: "amangaq85@gmail.com"
      },
      theme: {
        color: "#F4C430"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const handlePayMode =async (e) =>{
  e.preventDefault();
  
 if(paymentMode && paymentMode.length>0){

  if(paymentMode == "cod"){

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    navigate("/payment/success")
    SuccessToast("Order placed")
    setPaymentBox(false)
    setpayDet({...paydet,payTime: `${hours-12}:${minutes}` ,payDate:`${day}-${month}-${year}`})
    setActiveStep(0)

    setLoading(true)
    const req = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/order`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         id: auth?.user?.id ,
         methodPay:"Cash on delivery",
         payDate:`${day}-${month}-${year}`,
         amount:totalPrice,
         Items:cartData
         })
    });
    const res = await req.json()
    setLoading(false)
    const {success,message} = res
    if(success){
    
    }else{
      ErrorToast(message)
    }
  }
  else{
createRazorpayOrder(totalPrice)
  }

 }else{
  ErrorToast("Select atleast one payment method")
 }
  }
  return(
    <div className={`w-full mt-8 flex-col bg-violet-100`}>
     <div className="w-full px-4 py-4 bg-violet-500">
      <h1 className='text-lg font-semibold text-white'>Order Summary</h1>
    </div>

 <div className="flex justify-between tb:flex-col">

 <div className="w-[55%] tb:w-full tb:ml-0 border-[1.4px] mt-5 ml-5 border-zinc-400 mb-4">

{
cartData.map((elem)=>{
   return(
       <div className=" mb-8 p-3  ">
{
   elem.itemAttribute.vegClassifier == "VEG"?
   <img src={vegIcon} className="w-4 rounded-sm" alt="" />:
   <img src={nonIcon} className="w-4" alt="" />
}
        <div className="flex items-center  justify-between">
<div className="w-[55%] flex flex-col">
<h1>{elem.name}</h1>
<p className="mt-2"> {elem?.description?.slice(0,60)+"..."} </p>
<h1 className="font-semibold"> ₹{elem.price/100 || elem.defaultPrice/100} </h1>


</div>
<div className="w-[30%] ">
<img src={`https://media-assets.swiggy.com/swiggy/image/upload/${elem.imageId}`} className="w-48" alt="" />
</div>
</div>
<hr className='border-zinc-500 mt-7' />
       </div>
   )
})
}
</div>

<div className="w-[40%] tb:px-10 lm:px-2 px-5 py-3 tb:p-0 tb:w-full tb:mb-4">
 
 <div className="">
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
 </div>

 <div className="mt-5 bg-violet-50 relative text-base py-3">
  <MdOutlineEdit onClick={()=>{
    setselecAddr()
    setActiveStep(activeStep-1)
  }} className='absolute right-2 top-2 text-2xl'/>
  <h1 className='font-extrabold text-lg mb-2'>Shipping Address Details</h1>
  <h1>Phone Number - {selectedAddr.number}</h1>
  <h1>Pincode - {selectedAddr.pincode}</h1>
  <h1>State -{selectedAddr.State} </h1>
  <h1> City - {selectedAddr.city} </h1>
  <h1> Locality - {selectedAddr.address} </h1>
 </div>
 
 

<button onClick={()=>setPaymentBox(true)} className="mt-6 cursor-pointer rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 ease-in-out py-3 bg-violet-400 text-white w-full">

<h1 className="ml-2">Proceed To Checkout</h1>
  </button>

   </div>

 </div>

 {
  paymentBox? 
  <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 z-50 bg-zinc-500/50 backdrop-blur-md">
  
<div className="w-[530px] relative min-h-56 rounded-lg shadow-2xl shadow-zinc-600 bg-white">

<IoCloseOutline onClick={()=>{
  setPaymentBox(false)
  setLoading(false)
}} className="text-2xl cursor-pointer absolute right-3 top-2"/>

<h1 className='text-center mt-8 text-xl font-semibold'>Payment Mode</h1>

<div className="w-full px-4 flex flex-col mt-5">


<div className="flex items-center">
  <input type="radio" value="cod" className='w-14 cursor-pointer' onClick={(e)=>setpayMode(e.currentTarget.value)} name="paymentmode" id="" />
  <label htmlFor="">
  <h1 className='font-semibold'>Cash On Delivery</h1>
  </label>
</div>

<div className="flex items-center mt-4">
  <input value="online" onClick={(e)=>setpayMode(e.currentTarget.value)} type="radio" className='w-14 cursor-pointer' name="paymentmode" id="" />
  <label htmlFor="">
  <h1 className='font-semibold'>Pay Online</h1>
  </label>
</div>

<button disabled={loading} onClick={handlePayMode} className={`group ${loading?"cursor-not-allowed bg-neutral-500":null} flex items-center mt-5 mb-5 justify-center mx-auto duration-500 hover:text-rose-300 hover:rounded-3xl ease-in-out relative bg-neutral-800 py-4 w-full p-3 text-gray-50 text-base font-bold`}>
        {
          loading ?  
          <Oval visible={true} height="30" width="30" color="#FFFFFF" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" /> 
          : 
          <h1>Confirm Payment</h1>
        }
       </button>

</div>

</div>

  </div>
  :null
}

    </div>
  )
}

function Confirmation() {
  return <h2>Booking is confirmed</h2>;
}


export const Checkout = () => {

  const {selectedAddr} = useContext(SelectedAddCont)
  const {activeStep,setActiveStep} = useContext(ActiveStepper)

  function getSectionComponent() {
    switch(activeStep) {
      case 0: return <UserDetails/>;
      case 1:return <OrderSumAndPayment/>
      case 2: return <Confirmation/>;
      default: return null;
    }
  }

  const movetoNext = () =>{
    setActiveStep(activeStep+1) 
    
  }

  const steps = [
    { title: 'Delivery Address', onClick: () => setActiveStep(0) },
    { title: 'Order Summary And Payment Confirmation', onClick: () => setActiveStep(1) },
    { title: 'Booking confirmation',onClick: () => setActiveStep(2) },
  ];

  return (
    <div className="w-full">

<div className='w-[80%] lm:w-[90%] tb:w-[85%] border mx-auto mt-5'>
     <Stepper
        steps={steps}
        activeStep={activeStep}/>
      <div style={{padding: '0px'}}>
        { getSectionComponent()  }
        { (activeStep !== 0 && activeStep !== steps.length - 1)
            && <button className='bg-violet-400 py-3 px-5 rounded-lg  hover:bg-violet-700 hover:text-white transition-all duration-200 ease-in-out' onClick={ () => setActiveStep(activeStep - 1) }>Previous</button>
        }
        { activeStep !== steps.length - 1
          && <button className={`bg-violet-400 py-3 mb-3 px-5 rounded-lg hover:bg-violet-700 hover:text-white transition-all duration-200 ease-in-out ${activeStep>=1?"hidden":""}`} onClick={ () => selectedAddr ? movetoNext() : ErrorToast("Select a address to continue")}>Next</button>
        }
      </div>
    </div>

    </div>
  )
}

const AddressDet = ({i,elem}) =>{
  const [loading,setLoading] = useState(false)
  const {auth,setAuth} = useContext(AuthenContext)
  const {setselecAddr} = useContext(SelectedAddCont)

  const handleAddDel =async (ind) =>{
    setLoading(true)
  const req = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/deleteAddr`,{
    method:"POST",headers:{
      'Content-Type': 'application/json',
    },body:JSON.stringify({id:auth.user.id,addrId:ind})
  })
  const resp = await req.json()
  setLoading(false)
  const {success,message} = resp
  if(success){
    SuccessToast(message)
    setAuth({ ...auth, token: resp.token })
  }
  }
  return(
    <>
     <div key={i} className='flex items-center mb-2 relative'>
       <input type="radio" name="address" onClick={()=>{  setselecAddr(elem)}} className="mr-2 w-12 cursor-pointer"
              />
       <label htmlFor="">
       <h1 className='text-sm inline-block'> {elem?.address} , </h1>
        <h1 className='text-sm inline-block mr-1'> {elem?.city} , </h1>
        <h1 className='text-sm inline-block ml-1 mr-1'> {elem?.State} - </h1>
        <h1 className='text-sm font-semibold inline-block'> {elem.pincode} </h1>
        <hr className='border-zinc-400 border-[1.2px] mt-2 ' />
       </label>
      {
        loading ? <MoonLoader className='absolute cursor-pointer right-8 lm:top-0 lm:right-2' size={16} /> :  <MdDeleteOutline onClick={()=>handleAddDel(i)} className='text-xl right-8 absolute cursor-pointer lm:top-0 lm:right-2'/>
      }
      </div>
    </>
  )
}