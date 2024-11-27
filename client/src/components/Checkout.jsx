import React, { useContext, useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal';
import { AuthenContext } from '../context/Authen';
import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from './NotToast';
import MoonLoader from 'react-spinners/MoonLoader'

function UserDetails() {
const [userDetails,setUserDetails] = useState([])
const [formDet,setForDetails] = useState({number:"",pincode:"",locality:"",address:"",city:"",State:""})
const {auth,setAuth} = useContext(AuthenContext)
const navigate = useNavigate()


const handleFormDet = (value,name) =>{
setForDetails({...formDet,[name]:value})
}

useEffect(()=>{
 const fetchDetail =async () =>{
  const url = await fetch("http://localhost:8080/user/details",{
    method:"POST",body:JSON.stringify({token:auth.token}),headers: {
      'Content-Type': 'application/json',
    },
  })
  const response = await url.json()
  const {success} = response
  if(success){
    setUserDetails(response.decoded)
  }
  else{
    navigate("/")
  }
 }
 fetchDetail()
},[])

const handleDetSumbit =async (e) =>{
  e.preventDefault()
  const {number,pincode,locality,address,city,State} = formDet
  if(number.length==10 && pincode && locality && address && city.length && State.length){

   const url = await  fetch(`${import.meta.BACKEND_BASE_URL}/user/updatedDetails`,{
    method:"POST",body:JSON.stringify({data:formDet,id:userDetails.id}),headers: {
      'Content-Type': 'application/json',
    },
   })
   
   setLoading(true)

   const response = await url.json()
   const {success,message} = response
   if(success){
    setLoading(false)
    SuccessToast(message)
    setAuth({...auth,[auth.token]:response.token})
   }
   else{
    ErrorToast(message)
   }

  }
  else{
    ErrorToast("Not submitted")
  }
}

  return(
    <div className='w-full flex mt-8 flex-col  bg-violet-200 mb-5'>
    <div className="w-full px-4 py-4 bg-violet-500">
      <h1 className='text-lg font-semibold text-white'>Delivery Address</h1>
    </div>

  {userDetails.addresses?
  <div className='p-4 bg-white w-1/2 mx-4 my-4 rounded-lg'>
   
    <h1 className='text-lg'>Saved Address</h1>
    {
    userDetails.addresses.map((elem)=>{
     return(
      <>
      
        <h1 className='text-sm font-semibold inline-block mr-1'> {userDetails.name} </h1>
        <h1 className='text-sm inline-block'> {elem?.address}{+","} </h1>
        <h1 className='text-sm inline-block mr-1'> {elem?.city}{+","} </h1>
        <h1 className='text-sm inline-block ml-1 mr-1'> {elem?.State+" - "} </h1>
        <h1 className='text-sm font-semibold inline-block'> {elem.pincode} </h1>
    
      </>
     )
    })
   }
  </div>:null}
    
    <div className="px-4 py-4">
      <h1 className='uppercase font-semibold text-lg'>Add a new Address</h1>
      <form className='mt-3 flex flex-col gap-5 w-[90%]'>

       <div className="flex gap-6 items-center w-full">
       <input type="text" className='cursor-not-allowed bg-zinc-100 text-zinc-400 px-5 py-3 rounded-lg focus:outline-none ' readOnly value={userDetails?.name} />
       <input value={formDet.number} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='number' type="number" placeholder='10-digit mobile number' className='px-5 py-3 w-[25%] rounded-lg focus:outline-none mr-6'  />
       </div>

       <div className="flex gap-6 items-center">
       <input value={formDet.pincode} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='pincode' type="number" placeholder='Pincode' className='px-5 py-3 rounded-lg focus:outline-none'  />
       <input value={formDet.locality} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='locality' type="text" placeholder='Locality' className='px-5 py-3 w-[25%] rounded-lg focus:outline-none mr-6'  />
       </div>
       <textarea value={formDet.address} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name="address" className='w-[50%] px-5 py-3 focus:outline-none' placeholder='Address (Area and Street)' id=""></textarea>

       <div className="flex gap-6 items-center">
       <input value={formDet.city} onChange={(e)=>handleFormDet(e.target.value,e.target.name)} name='city' type="text" placeholder='City/District/Town' className='px-5 py-3 rounded-lg focus:outline-none'  />
       
       <select name="State" onChange={(e)=>handleFormDet(e.target.value,e.target.name)} className='px-5 rounded-lg focus:outline-none py-3' value="select" id="">
        <option value="">State</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Assam">Assam</option>
       </select>

       </div>
      <button onClick={handleDetSumbit} className='bg-violet-300 rounded-lg cursor-pointer hover:bg-violet-700 transition-all hover:text-white w-1/4 duration-200 ease-in-out flex items-center justify-center py-3'>
      {loading && <MoonLoader size={20}/>} <h1 className='ml-3'>Submit and Deliver Here</h1>
      </button>
      </form>
    </div>

    </div>
  );
}

function Payment() {
  return <h2>Payment information</h2>;
}

function Confirmation() {
  return <h2>Booking is confirmed</h2>;
}


export const Checkout = () => {

  const [ activeStep, setActiveStep ] = useState(0);

  const steps = [
    { title: 'Delivery Address', onClick: () => setActiveStep(0) },
    { title: 'Payment Mode',onClick: () => setActiveStep(1) },
    { title: 'Booking confirmation',onClick: () => setActiveStep(2) },
  ];

  function getSectionComponent() {
    switch(activeStep) {
      case 0: return <UserDetails/>;
      case 1: return <Payment/>;
      case 2: return <Confirmation/>;
      default: return null;
    }
  }
  return (
    <div className="w-full">

<div className='w-[75%] border mx-auto mt-5'>
     <Stepper
        steps={steps}
        activeStep={activeStep}/>
      <div style={{padding: '0px'}}>
        { getSectionComponent()  }
        { (activeStep !== 0 && activeStep !== steps.length - 1)
            && <button className='bg-violet-400 py-2 px-4 rounded-lg  hover:bg-violet-700 hover:text-white transition-all duration-200 ease-in-out' onClick={ () => setActiveStep(activeStep - 1) }>Previous</button>
        }
        { activeStep !== steps.length - 1
          && <button className='bg-violet-400 py-2 px-4 rounded-lg hover:bg-violet-700 hover:text-white transition-all duration-200 ease-in-out' onClick={ () => setActiveStep(activeStep + 1) }>Next</button>
        }
      </div>
    </div>

    </div>
  )
}
