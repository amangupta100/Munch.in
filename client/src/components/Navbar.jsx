import logo from '../assets/munchin-high-resolution-logo-transparent-cropped.svg'
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Coordinate, Visibility } from '../context/sideOpen';
import { IoMdClose } from "react-icons/io";
import { TiLocation } from "react-icons/ti";
import location from '../assets/12083277_Wavy_Bus-11_Single-11.svg'
import { CartContext } from '../context/CartContext';
import { AuthenContext } from '../context/Authen';
import { SlLogout } from "react-icons/sl";
import { SuccessToast } from './NotToast';

export const Navbar =() =>{
   const {coord,setCord} = useContext(Coordinate)
   const {visible,setVis} = useContext(Visibility)
   const [srcRes,setsearchRes] = useState([])
   const [addr,setAddr] = useState(null)
   const [inpVal,setInp] = useState('')
   const {auth} = useContext(AuthenContext)
   const [profVis,setProfVis] = useState(false)

   const searchRes =async (val) =>{
   if(val=="") return
   const data =await fetch(`${import.meta.env.VITE_FETCH_DATA_URL}/misc/place-autocomplete?input=${val}`)
   const rData = await data.json()

   setsearchRes(rData.data)
   }

   const fetchlangLong =async (id) =>{
      if(id=="") return
      const data =await fetch(`${import.meta.env.VITE_FETCH_DATA_URL}/misc/address-recommend?place_id=${id}`)
      const rData = await data.json()
      setCord({
         lat:rData?.data[0]?.geometry?.location.lat,
         lng:rData?.data[0]?.geometry?.location.lng
      })
      setAddr(rData.data[0].formatted_address)
      setVis(!visible)
      setInp('')
      }

   const handleInpChange = (val) =>{
      setInp(val)
   searchRes(val)
   }
   const handleClose = () =>{
      setInp('')
   }
   
   const {setAuth} = useContext(AuthenContext)
   const navigate = useNavigate()
   const handleLogout = () =>{
      setAuth({
         ...auth,user:null,token:''
      })
      SuccessToast("Logout Successfully")
   }

   const {cartData} = useContext(CartContext)   
    return(
    <>
    
       <div className='w-full'>
       
       <div className={`w-full bg-black/50 backdrop-blur-md h-full absolute z-50 transition-all duration-300 ${visible?"visible ":"invisible"}`}>
     
     <div className={`bg-white w-[40%] lD:w-[65%] tb:w-[70%] lm:w-[100%] flex px-16 lm:px-10 justify-end h-full  `}>

     <div className="w-[75%] lm:w-[100%]">

     <IoMdClose onClick={()=>setVis(!visible)} className='text-2xl cursor-pointer mt-6'/>
      <div className="relative">

      <input type="text " value={inpVal} onChange={(e)=>handleInpChange(e.target.value)} placeholder='Search for area,street name..' className='focus:shadow-xl font-medium rounded-lg mt-6 focus:shadow-zinc-300 mb-6 focus:outline-none  shadow-lg shadow-zinc-200 border p-4 text-base w-[100%]' />
      <button onClick={handleClose} className='absolute right-5 bottom-11 text-orange-500 text-sm'>Cancel</button>

      </div>
      {
        inpVal.length>0 && srcRes.length==0 ? 
       <>
         <img src={location} className='w-96 mt-10' alt="" />
         <h1 className='text-xl font-medium text-center'>Address Not Found</h1>
       </> :
         srcRes.map((elem,i)=>{
         
         return(
            <>
           <div key={i} className="flex items-center py-4 px-4 border">
           <div className="">

           <TiLocation className='text-xl'/>

           </div>
           <div className="flex flex-col ml-3">
           
           <h1 onClick={(e)=>fetchlangLong(elem.place_id)}  className='cursor-pointer font-medium hover:text-orange-500'> {elem.structured_formatting.main_text} </h1>
            <h1 className='inline-block mt-1 text-black/55'> {elem.structured_formatting.secondary_text} </h1>

           </div>

           </div>
            <hr className='border-dotted' />
            </>
         )
         })
      }

     </div>

     </div>

    </div>

       </div>

       <div className="w-full sticky z-30 top-0 bg-white shadow-md shadow-gray-200 flex items-center justify-between lD:px-16 px-24 h-[75px] tb:px-12 lm:px-4 lD:h-[68px]">
        
        <div className="flex items-center gap-12 lD:gap-7 lm:gap-4">
                <NavLink to="/">
                <img src={logo} onContextMenu={(e)=>e.preventDefault()} onDragStart={(e)=>e.preventDefault()} className='w-[13vw] lD:w-[17vw] tb:w-[22vw] lm:w-[36vw] cursor-pointer hover:scale-[1.04] transition-all mdm:w-[40vw] duration-300 h-[7vh]' alt="" />
                </NavLink>
                <div onClick={()=>setVis(!visible)} className="flex  hover:text-orange-500 items-center cursor-pointer">
                <h1 className='text-lg lm:text-sm border-b-black border-b-[2px] hover:border-b-orange-400 transition-all duration-300 mb-2 font-semibold'>Other</h1>
                <h1 className='text-[13px] text-zinc-500 hover:text-orange-500 ml-3 lm:line-clamp-1'> {addr?.length>35?addr.slice(0,35):addr} </h1>
                <IoIosArrowDown className='text-xl hover:text-orange-400'/>
                </div>
                </div>
        
                <div className="flex items-center gap-4 lm:gap-2 text-zinc-800">
                    <NavLink to="" className='flex items-center gap-2 font-[550] hover:text-orange-500 duration-300 transition-all'><CiSearch className='text-2xl'/></NavLink>
                  
                  {
                     auth.token.length>0?  
                     <>
                     <div className="relative hover:text-orange-500 duration-300 transition-all">
                    <NavLink to="/cart" className='flex z-40 items-center gap-2 font-[550] '> <IoBagOutline className='text-2xl'/></NavLink>
                    <h1 className='absolute -z-10 text-sm -right-3 backdrop-blur-lg  bg-zinc-300 py-1 px-2 rounded-full -top-4'> {cartData.length} </h1>
                    </div>
                  
                     <div className="relative">
                    <button onClick={()=>setProfVis(!profVis)} className='bg-black hover:text-orange-400 hover:bg-zinc-700 text-white px-[12px] py-[5px] rounded-full text-lg'> {auth.user.name[0]} </button>
                    {
                     profVis &&  <div onMouseLeave={()=>setProfVis(!profVis)} className="absolute top-10 py-4 px-3 right-0 w-40  bg-zinc-200 rounded-xl">
                     <NavLink className="flex items-center"><CiUser className='text-2xl'/> <h1 className='ml-2'>User</h1></NavLink>
                     <button onClick={handleLogout} className=' mt-2 flex items-center'>
                        <SlLogout/>
                     <h1 className='ml-3'>Logout</h1>
                     </button>
                  </div>
                    }
                     </div>
                     
                     </>
                     :
                   
                      <NavLink to="/login"><CiUser className='text-2xl hover:text-orange-500 cursor-pointer'/></NavLink>
                  }

                </div>
         </div>
        
      <Outlet/>    
    </>
    )
}