import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiUser } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { AuthenContext } from '../context/Authen';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import '../App.css'
import { ErrorToast, SuccessToast } from './NotToast';
import { Oval } from 'react-loader-spinner';
import { ProfSkel } from './ProfSkel';
import { IoMdClose } from "react-icons/io";
import { ProfileImage } from '../context/ProfileImage';

export const UserProf = () => {
    const [isActive,setActive] = useState("User Details")
    const [address,setaddress] = useState([])
    const [loading,setLoading] = useState(false)
    const [changeload,setChLoad] = useState(false)
    const [ishovClick,sethovClick] = useState(false)
    const [filename,setName] = useState("")
    const [file,setFile] = useState("")

    const navigate = useNavigate()
    const fileInputRef = useRef()
    const {auth,setAuth} = useContext(AuthenContext)
    const {ProfileUrl,setProfileUrl} = useContext(ProfileImage) 

    const handleFileChange = (e) =>{
    const file = e.target.files[0]
    setFile(file)
    setName(file?.name)
    }

    const handlePhotoUpload =async (e) =>{
    e.preventDefault()
    
    const formData = new FormData()
    formData.append("image",file)
    const userId = auth?.user?.id
    formData.append("userId",userId)

    try{
      setChLoad(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/photo/upload`, {
        method: 'POST',
       body: formData
    });
    const rResp =await response.json()
    setChLoad(false)
    const {success,message} = rResp
    
    if(success){
      setAuth({...auth,token:rResp.token})
      SuccessToast(message)
      sethovClick(false)
    }
    }catch(err){
      ErrorToast(err.message)
    }
    }

    useEffect(()=>{
   !auth.token ? navigate("/login") : null
    },[auth])

    useEffect(()=>{
      const fetchAddDet = async () => {
        setLoading(true)
        const req = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/details`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: auth.token })
        });
        const response = await req.json();
        
        setLoading(false)
        if (response.success && response.decoded) {
       setProfileUrl(response.decoded.imagePath)
       setaddress(response.decoded.addresses)
        }
    };
    fetchAddDet();
    },[auth])

  return (
    <div>

<div className="flex items-center justify-center fixed bottom-0 w-full">
    <div className='w-full flex items-center border-t-2 border-zinc-300 bg-zinc-200/10 backdrop-blur-md justify-between px-8 py-2 h-[65px] '>
      <NavLink to="/">
      <div className="flex flex-col items-center cursor-pointer">
      <GoHome className='text-3xl'/>
      <h1 className='text-sm'>Home</h1>
      </div>
      </NavLink>
       <div id='User Details' onClick={(e)=>setActive(e.currentTarget.id)} className="flex flex-col items-center cursor-pointer">
       <CiUser className={`text-3xl ${isActive=="User Details"?"text-orange-400":null}`}/>
       <h1 className={`text-sm ${isActive=="User Details"?"text-orange-400 font-bold":null}`}>My Profile</h1>
       </div>

       <div id='Order' onClick={(e)=>setActive(e.currentTarget.id)} className="flex flex-col items-center cursor-pointer">
        <CiDeliveryTruck  className={`text-3xl ${isActive=="Order"?"text-orange-400":null}`}/>
        <h1  className={`text-sm ${isActive=="Order"?"text-orange-400 font-bold":null}`}>Orders</h1>
        </div>

        <div onClick={()=>{
                setAuth({
                  ...auth,user:null,token:''
               })
               SuccessToast("Logout Successfully")
        }} className="flex flex-col items-center cursor-pointer">
        <CiLogout className='text-3xl'/>
        <h1 className='text-sm'>Logout</h1>
        </div>
       
        </div>
    </div>
    
  {
    isActive=="User Details" ? 
    <>
     {
    loading ? <ProfSkel addrLen={address.length} isActive={isActive} /> :  
    <div className={`w-[75%] lD:w-[88%] tb:w-[100%] lm:w-full py-10 bg-zinc-100 mx-auto`}>
      
    {
    ProfileUrl && ProfileUrl.length>0 ? 
     <>
     <div onClick={()=>{
       sethovClick(true)
       fileInputRef.current?.click()
     }} className="w-20 h-20 mx-auto cursor-pointer">
       <img className='rounded-full w-full h-full' src={`${ProfileUrl}`} alt="image" />
       <input type="file" onChange={handleFileChange} ref={fileInputRef} name="" className='hidden' id="" />
     </div>
    
     </>
      :  
     <div onClick={()=>{
       sethovClick(true)
       fileInputRef.current?.click()
     }} className="w-20 h-20 cursor-pointer mx-auto bg-zinc-300 relative rounded-full flex items-center justify-center">
     <div className="">
      <h1 className='text-3xl'> {auth?.user?.name[0]}</h1>
      </div>

      <input type="file" onChange={handleFileChange} ref={fileInputRef} name="" className='hidden' id="" />

     </div>
    }

     {
       ishovClick ? 
       <div className='flex relative rounded-xl items-center justify-between w-fit bg-zinc-200 py-3 px-3 mx-auto mt-3 '>
        <IoMdClose onClick={()=>{
          sethovClick(!ishovClick)
          setFile("")
          setChLoad(false)
          setName("")
        }} className='absolute text-xl -top-3 -right-1 cursor-pointer'/>
         <h1 className='inline-block font-bold'> {filename} </h1>
         <button disabled={changeload} onClick={handlePhotoUpload} className='bg-zinc-50 py-2 px-3 ml-5 flex items-center justify-center'> {changeload? <Oval visible={true}
        height="25"
        width="25"
        color="#000000"/>: <h1>Upload</h1> } </button>
       </div> : null
     }

      <div className="py-10 px-5">
       <h1 className='font-extrabold text-2xl mb-2'>Personal Information</h1>
      <div className="flex">
      <h1 className='font-semibold inline-block'>Name : </h1>
      <h1 className='inline-block ml-2'> {auth?.user?.name} </h1>
      </div>
      <div className="flex">
      <h1 className='font-semibold inline-block mr-3'> Email :  </h1>
      <h1>{auth?.user?.email}</h1>
      </div>


      <div className='mt-2'>
        
        <h1 className='text-2xl font-extrabold mb-2'>Saved Addresses</h1>
         {address.length ? 
         <>
         {
          address.map((elem)=>{
            return(
            <div className='w-fit'>
            <h1> {elem?.address} {" "} {elem?.city}  {elem?.State} {","} {elem?.pincode} </h1>
          
            <hr className='border-zinc-300 border-[1.25px] mt-2' />
            </div>
            )
          })
         }
         </> : <h1>No saved addresses</h1> }
         </div>

      </div>
   </div>
   }
    </> : <Order loading={loading} setLoading={setLoading} />
  }

    </div>
  )
}

const Order = ({loading,setLoading}) =>{
  const[fullDet,setfullDet] = useState([])

  const {auth} = useContext(AuthenContext)

  useEffect(()=>{
  setLoading(true)
  
  const fetchDet =async () =>{
  const req = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/getOrderDet`,{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },body:JSON.stringify({id:auth.user.id})
  })
  const resp =await req.json()
  setLoading(false)
  const {success} = resp
  if(success){
    setfullDet(resp.orders)
  }
  else{
    ErrorToast(resp.message)
  }
  }
  fetchDet()
  },[])

  return(
    <div className='w-[75%] lD:w-[86%] lm:w-[100%] mx-auto bg-zinc-100'>
    {
      loading ? <ProfSkel itemsDet = {fullDet.length} /> : 
      <div className='py-5'>
      <h1 className='text-center font-extrabold text-2xl'>Orders</h1>
     
      <div className="px-5 mt-5">
      <h1 className='font-extrabold text-sm mb-3'> {fullDet.length} Orders found </h1>
       {
        fullDet.map((elem)=>{
          return(
            <div className='bg-zinc-200 mb-10 rounded-lg py-2 px-5 mt-5'>
              
           <div className="flex lm:flex-col justify-between">
           <h1> Order Date - {elem.payDate} </h1>
           <h1>Payment Mode - {elem.methodPay}</h1>
           </div>
           <hr className='mt-2 border-[1.4px] border-zinc-400' />
           <h1 className='mt-2 font-sm font-extrabold'> Total Pay - ₹{Math.ceil(elem.amount)} </h1>

           <div className="mt-4">
            {
             elem.Items.map((item)=>{
              return(
                <>
                 <div className='w-full flex items-center lm:flex-col lm:items-start justify-between py-4 mb-5'>
                
                <div className="w-[45%] lD:w-[55%] tb:w-[75%] lm:w-full lm:justify-normal lm:items-center justify-center flex items-center">
                
                <div className="flex items-center ">
                
                <div className="w-[25%] lm:w-[35%] min-h-[120px]">
                <img className="rounded-xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`} alt=""/>
                </div>
                <h1 className='ml-4'>{item.name}</h1>

                </div>
                </div>
                
                <div className="flex flex-col justify-end lm:items-start lm:mt-0 items-end">
                  <h1 className='font-semibold'>  ₹{Math.ceil(item.defaultPrice/100)  || (Math.ceil(item.price/100))} </h1>
                  <h1 className='text-sm text-gray-500 font-semibold'>Qty : {item.quantity} </h1>
                </div>

                </div>
                <hr className='mt-2 border-[1.6px] border-dashed border-zinc-300' />
                </>
              )
             })
            }
           </div>

            </div>
          )
        })
       }

      </div>

      </div>
    }
    </div>
  )
}