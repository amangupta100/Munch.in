import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import star from '../assets/star-svgrepo-com.svg'
import { IoArrowForward } from "react-icons/io5";
import vegIcon from '../assets/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png'
import nonIcon from '../assets/images.png'
import { FaChevronRight } from "react-icons/fa6";
import search from '../assets/web-search-animate.svg'
import { NavLink } from 'react-router-dom';
import { SearchLoadSkel } from './SearchLoadSkel';

 export const SeachPage = () => {
  const [searchInp,setsrchInp] = useState("")
  const [activeTab,setActiveTab] = useState("dishes")
  const [dishesData,setdishData] = useState([])
  const [restData,setresData] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    fetchDishesData()
    fetchRestData()
  },[searchInp])

  const fetchDishesData =async () =>{
    setLoading(true)
  const req = await fetch(`${import.meta.env.VITE_FETCH_DATA_URL}/restaurants/search/v3?lat=28.5561437&lng=77.0999623&str=${searchInp}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0f9621bb-86d5-3cd9-8adb-e4c64ab0748d&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2Fmomo.png%22%2C%22dishFamilyId%22%3A%22846565%22%2C%22dishFamilyIds%22%3A%5B%22846565%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`)
  const resp = await req.json()
  let finalData = (resp?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info)
  setLoading(false)
  setdishData(finalData)
  }

  const fetchRestData =async () =>{
const req = await fetch(`${import.meta.env.VITE_FETCH_DATA_URL}/restaurants/search/v3?lat=28.5561437&lng=77.0999623&str=${searchInp}&trackingId=undefined&submitAction=ENTER&queryUniqueId=c6ccc9af-168a-6868-4059-86e02b711377&selectedPLTab=RESTAURANT`)
const resp = await req.json()
let finalData = (resp?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data=>data?.card?.card?.info)
  setresData(finalData)
  }

  return (
    <div className='w-full'>
    <div className="w-[65%] mtb:w-[83%] vlm:w-[90%] mx-auto">

   <div className="w-full relative mt-8">
   <input value={searchInp} onChange={(e)=>setsrchInp(e.target.value)} type="text" placeholder='Search for Dishes and Restaurant' className='border-2 w-full border-zinc-200 py-3 px-4 focus:outline-none' />
   {searchInp.length>0 ? <IoMdClose onClick={()=>setsrchInp("")} className='text-2xl absolute right-4 top-[13px] cursor-pointer '/>:<CiSearch className='text-2xl absolute right-4 top-[13px] cursor-pointer'/>}
   </div>

   <div className="flex gap-4 mt-5">
    <button onClick={(e)=>setActiveTab(e.currentTarget.value)} value="restaurant" className={`border-2 ${activeTab=="restaurant"?"bg-zinc-600 text-white border-none":null} border-zinc-200 py-3 px-5 rounded-full shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]`}>Restaurant</button>
    <button onClick={(e)=>setActiveTab(e.currentTarget.value)} value="dishes" className={`border-2 ${activeTab=="restaurant"?null:"bg-zinc-700 text-white border-none"} border-zinc-200 py-3 px-5 rounded-full shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]`}>Dishes</button>
   </div>

   {
    activeTab == "dishes" ? 
   searchInp.length ? 
 loading ? 
 <div className='bg-[rgb(245,246,248)] w-full grid grid-cols-2 mt-5 gap-5 px-3 py-7 mtb:grid-cols-1'>
 {dishesData.slice(0,15).map((elem)=>{
  return <SearchLoadSkel mode={activeTab}  />
 })}
 </div> :   
 <div className='bg-[rgb(245,246,248)] w-full grid grid-cols-2 mt-5 gap-5 px-3 py-7 mtb:grid-cols-1'>
 {
   dishesData.map(({card:{card:{  info:{imageId = "",name,price,finalPrice,isVeg=0},  restaurant:{info:{id,name : resName ,avgRating,sla:{slaString}}}}}
     })=>
      
        <div className='flex flex-col rounded-3xl bg-white'>
       
       <div className="flex flex-col py-7 px-5">
     <NavLink to={`/menu/${id}`}>
     <div className="relative">
       <h1 className='text-sm text-zinc-700 font-semibold'>By {resName}</h1>
       <div className="flex items-center ">
       <img src={star} className='w-4 text-gray-500 mt-1' alt="" />
       <h1 className='text-[13px] ml-1 text-zinc-500'> {avgRating}</h1>
       <h1 className='text-[13px] text-zinc-500 ml-1'>. {slaString} </h1>
       </div>
       <IoArrowForward className='absolute right-2 text-2xl text-gray-400 top-2'/>
       </div>
     </NavLink>
       <hr  className='mt-4 border-dashed border-zinc-300'/>
 
       <div className="flex justify-between mt-3">
        <div className="w-[55%] ">
          {
            isVeg ? <img src={vegIcon} className='w-4 rounded-sm' alt="" />: <img src={nonIcon} className='w-4' alt="" />
          }
          <h1 className='mt-1 font-extrabold'> {name} </h1>
        <div className="flex">
        <h1 className={`${finalPrice ?"line-through text-zinc-500":null}`}>₹ {finalPrice ? price/100 : price/100} </h1>
        <h1 className='ml-1'> {finalPrice ?  `₹`+finalPrice/100 : null}</h1>
        </div>
       <NavLink to={`/menu/${id}`}> <button className='py-1 px-4 border-[1.6px] mt-3 border-zinc-200 text-zinc-700 font-semibold flex items-center rounded-full text-[13px] '>More Details <FaChevronRight className='ml-1 text-sm text-zinc-400'/></button></NavLink>
        </div>
        <div className="w-[35%] lm:w-[45%] relative">
        <img onDragStart={(e)=>e.preventDefault()} className="w-full h-[150px] object-cover rounded-2xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imageId}`} alt="" />
        </div>
       </div>
 
       </div>
      
       </div>
   )
 }
 </div>
   :
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <img src={search} className='w-[45%]' alt="" />
      <h1 className='text-lg'>Search the favorite dish</h1>
    </div> :
   
    searchInp.length>0 ?  
   loading ? 
   <div className='bg-[rgb(245,246,248)] w-full grid grid-cols-2 mt-5 gap-5 px-3 py-7 mtb:grid-cols-1'>
 {dishesData.slice(0,15).map((elem)=>{
  return <SearchLoadSkel/>
 })}
 </div>
    : 
    <div className='bg-[rgb(245,246,248)] w-full grid grid-cols-2 mt-5 gap-5 px-5 mtb:grid-cols-1 py-10'>
   {
 restData.map(
   ({
     card:{
       card:{
         info:{id,name,cloudinaryImageId,costForTwoMessage,aggregatedDiscountInfoV3 = {},cuisines,avgRating,sla:{slaString}}
       }
     }
   })=>
 <NavLink to={`/menu/${id}`}>

<div className='flex py-8 px-3 bg-white'>
   <div className="w-[25%] relative">
    {
     aggregatedDiscountInfoV3.header || aggregatedDiscountInfoV3.subHeader ?  <div className="px-3 -bottom-4 rounded-lg left-4 py-1 absolute bg-white border-[1.6px] text-orange-400 font-extrabold ">
     <h1 className='text-[11px] font-extrabold text-start'> {aggregatedDiscountInfoV3.header} </h1>
     <h1 className='text-[9px]'> {aggregatedDiscountInfoV3.subHeader} </h1>
   </div>:null
    }
   <img onDragStart={(e)=>e.preventDefault()} className="w-full h-[120px] object-cover rounded-2xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} alt="" />
   </div>

   <div className="flex flex-col justify-center ml-4 max-w-[70%] ">
   
   <h1 className='text-sm font-extrabold text-zinc-600'> {name} </h1>
   
   <div className="flex items-center mt-1">
   <img src={star} className='w-4 text-gray-500 mt-1' alt="" />
   <h1 className='text-sm text-zinc-500'> {avgRating} .  </h1>
   <h1 className='text-sm text-zinc-500 ml-2'>  {slaString} </h1>
   <h1 className='text-sm text-zinc-500 ml-2'>. {costForTwoMessage} </h1>
   </div>

   <h1 className='text-sm text-zinc-500 mt-1'> {cuisines.length>36 ? cuisines.join(", ").slice(0,36)+"..." : cuisines.join(", ")} </h1>
   
   </div>

  </div>

 </NavLink>
 )
}
</div> :   
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <img src={search} className='w-[45%]' alt="" />
    <h1 className='text-lg'>Search the favorite dish</h1>
  </div>

   }

    </div>
    </div>
  )
}

