import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { IoIosStarOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import vegIcon from '../assets/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png'
import nonIcon from '../assets/images.png'
import {  ErrorToast, SuccessToast } from "./NotToast";
import { CartContext } from "../context/CartContext";
import { ParamCont } from "../context/ParamCont";
import { AuthenContext } from "../context/Authen";

export const RestMenu = () =>{


    const {id} = useParams()
    const {Paramid,setParamId} = useContext(ParamCont)
    useEffect(()=>{setParamId(id)},[])

   let str =  (id.split("-").at(-1))
   const regex = /[-+]?\d+/g;
   const matches = str.match(regex);
    let mainId = 0
    mainId = ( matches)[0] ? matches.map(Number) : []

    const [data,setData] = useState([])
    const [resinfo,setresInfo] = useState([])
    const [offers,setOffers] = useState([])

    const fetchData =async () =>{
    const val = await fetch(`${import.meta.env.VITE_FETCH_DATA_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.87560&lng=80.91150&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
    const rVal = await val.json()

    let resInfo = rVal?.data?.cards.find((data)=>
        data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info
    setresInfo(resInfo)

    let offers = rVal?.data?.cards.find((data)=>
    data?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers
    setOffers(offers)

    let actualMenu = rVal?.data?.cards.find((data) => data?.groupedCard);
    setData( actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) =>
            data?.card?.card?.itemCards || data?.card?.card?.categories
    ))
    }
  const [val,setVal] = useState(0)

  const handleNext = () =>{
  val>=125?"": setVal((prev)=>prev+31)
  }
  const handlePrev = () =>{
    val<=0? "": setVal((prev)=>prev-31)
  }
    
    useEffect(()=>{fetchData()},[])
    const {auth} = useContext(AuthenContext)
    return(
        <>
        
        <div className="w-full">

        <div className="w-[800px] lD:w-[870px] mtb:w-[640px] lm:w-[430px] pt-8 mx-auto">
        <p className="text-[10px]"> <NavLink to="/"><span className="text-gray-400">Home / </span></NavLink>  <NavLink to="/"><span className="text-gray-400">{resinfo.city}</span></NavLink> / {resinfo.name}</p>
        <h1 className="text-2xl font-extrabold mt-8"> {resinfo.name} </h1>

        <div className="w-full mt-3 rounded-[30px] bg-gradient-to-t p-5 from-slate-300/70 h-[206px]">
            <div className="w-full h-full border border-slate-200/70 rounded-[30px] bg-white px-5 py-5">
              
           <div className="flex">
           <IoIosStarOutline className="bg-green-600 rounded-full text-xl text-white"/>
           <h1 className="ml-1 font-bold"> {resinfo.avgRatingString} </h1>
           <h1 className="font-bold ml-1"> ({resinfo.totalRatingsString}) </h1>
           .
           <h1 className="font-extrabold ml-3"> {resinfo.costForTwoMessage} </h1>
           </div>
            <h1 className="font-bold mt-2 text-sm underline text-orange-500"> {resinfo?.cuisines?.join(", ")} </h1>

           <div className="flex gap-2 mt-4">

           <div className="w-[9px] flex flex-col justify-center items-center">
            <div className="w-[7px] h-[7px] bg-slate-300 rounded-full"></div>
            <div className="w-[2px] h-[25px] bg-slate-300 rounded-full"></div>
            <div className="w-[7px] h-[7px] bg-slate-300 rounded-full"></div>
           </div>

           <div className="flex flex-col text-sm font-bold">
            <div className="flex"> <h1>Outlet</h1> <h1 className="text-slate-500 ml-4"> {resinfo.locality} </h1></div>
            <h1> {resinfo.sla?.slaString} </h1>
           </div>

           </div>

            </div>
        </div>

       <div className="w-full overflow-hidden">
       <div className="flex justify-between mt-6">
        <h1 className="text-xl font-extrabold">Deals for you</h1>
        <div className="flex gap-2">
            <div onClick={handlePrev} className={`w-8 ${val==0?"cursor-not-allowed bg-slate-200":"cursor-pointer bg-slate-300"} h-8 cursor-pointer rounded-full  flex items-center justify-center`}> <FaArrowLeftLong className={`${val==0?"text-slate-300":"bg-slate-300"}`}/></div>
            <div onClick={handleNext} className={`w-8 ${val==125?"cursor-not-allowed bg-slate-200":"cursor-pointer bg-slate-300"} h-8 cursor-pointer rounded-full flex items-center justify-center`}> <FaArrowRight className={`${val==124?"text-slate-300":"bg-slate-300"}`}/></div>
        </div>
       </div>

       <div style={{translate:`-${val}%`}} className="flex gap-4 mt-4 pb-8 duration-1000">
         
        {
            offers.map((elem,i)=>{
                return(
                    <OfferCard key={i} data={elem} />
                )
            })
        }

       </div>
       </div>

       <h1 className="text-base font-extrabold text-center mt-2 text-gray-500 tracking-widest">MENU</h1>
       <NavLink to="/">
       <div className="w-full relative py-[16px] rounded-xl mt-3 bg-zinc-200">
        <h1 className="text-center">Search for dishes</h1>
        <IoIosSearch className="absolute right-2 top-4 text-2xl"/>
       </div>
       </NavLink>

        <div className="mt-8">

        {
            data.map((elem,i)=>{
              
              return(
                <div className="mb-5 ">
               <MenuCard key={i} card ={elem?.card?.card} resInfo ={resinfo} />
                </div>
              )
            })
        }

        </div>

        </div>
        </div>
        </>
    )
}

const MenuCard = ({card,resInfo}) =>{
const [open,setOpen] = useState(true)
const handleToggle = () =>{
    setOpen((prev) => !prev)
}

if(card.itemCards){
    const {title,itemCards} = card
   return(
    <>
    <div className="mt-7">

    <div onClick={handleToggle} className="flex cursor-pointer w-full px-6 py-4 rounded-xl bg-zinc-300 shadow-lg shadow-zinc-300 justify-between">
        <h1 className="font-extrabold"> {title} ({itemCards.length}) </h1>
        {
            open?<IoIosArrowUp className="text-xl" />:<IoIosArrowDown className="text-xl"/>
        }
    </div>

    {open && (
        <DetailMenu itemCards={itemCards} resInfo={resInfo}/>
    )}

    </div>
    </>
   )

}
else{
   const {title,categories} = card
   const [open,setOpen] = useState(true)
const handleToggle = () =>{
    setOpen(!open)
}
   return(
    <div className="mt-7">
     <div onClick={handleToggle} className="flex cursor-pointer w-full px-6 py-4 rounded-xl bg-zinc-300 shadow-lg shadow-zinc-300 justify-between">
        <h1 className="font-extrabold"> {title} ({categories.length}) </h1>
        {
            open?<IoIosArrowUp className="text-xl" />:<IoIosArrowDown className="text-xl"/>
        }
    </div>
    <h1 className="font-extrabold">{title}</h1>
    </div>
   ) 
}

}

function DetailMenu({ itemCards, resInfo }) {
    return (
        <div className="my-5">
            {itemCards.map(({ card: { info } }) => (
                <DetailMenuCard key={info.id} info={info} resInfo={resInfo} />
            ))}
        </div>
    );
}



function DetailMenuCard({info,resInfo}){
    const {
        name,
        defaultPrice,
        price,
        itemAttribute,
        ratings: {
            aggregatedRating: { rating, ratingCountV2 },
        },
        description = "",
        imageId,
    } = info;

    const navigate = useNavigate()
    const {cartData,setCartData} = useContext(CartContext)
    const [readMore,setReadMore] = useState(false)
    const {auth,setAuth} = useContext(AuthenContext)
    
    const handleCart = () =>{
    const isFind = cartData.find((elem)=>elem.id==info.id)
     if(auth.token.length>0 && !isFind){
        setCartData((prev)=>[...prev,info])
        SuccessToast("Item added to cart")
     }
     else if(auth.token.length==0){
        ErrorToast("Login to continue shopping")
        navigate("/login")
    }
    else if(auth.token.length>0){
    ErrorToast("Item already in cart")
    }
    }

return(
    <div className="w-full">
        <div className="flex pb-10 pt-5 items-center w-full min-h-[182px] justify-between">
            
        <div className="flex flex-col max-w-[65%] lm:max-w-[55%] ">
        {itemAttribute && itemAttribute.vegClassifier == "VEG"?
               <img onContextMenu={(e)=>e.preventDefault()} onDragStart={(e)=>e.preventDefault()} className="w-4 rounded-sm" src={vegIcon} alt="" />:  <img onContextMenu={(e)=>e.preventDefault()} onDragStart={(e)=>e.preventDefault()} className="w-4 rounded-sm" src={nonIcon} alt="" />
            }
                <h1 className="font-extrabold"> {name} </h1>
                <h1 className="font-extrabold"> ₹{defaultPrice/100  || price/100} </h1>
                  
                <div className="flex items-center mt-3 lm:mt-1">
                    {
                        rating && ratingCountV2 ? (
                        <>
                        <FaStar className={`text-sm ${rating<=4?rating<=4 && rating>3?"text-yellow-500":"text-red-600":"text-green-600"}`}/>
                        <h1 className={`text-sm font-extrabold ml-1 ${rating<=4?rating<=4 && rating>3?"text-yellow-500":"text-red-600":"text-green-600"}`}> {rating}{" "}   </h1>
                        <h1>({ratingCountV2})</h1>
                        </>    
                        ):null
                    }

                </div>
                   
                <p> {readMore? description+"...":description.slice(0,80)+"... " }
                    <button onClick={()=>setReadMore(!readMore)} className={`${readMore?"invisible":"visible"} text-blue-500 font-semibold`}>Read More</button>
                    <button onClick={()=>setReadMore(!readMore)} className={`text-blue-500 font-semibold ${readMore?"visible":"invisible"}`}> Read Less </button> 
                    </p>
            </div>

            <div className="w-[30%] lm:w-[35%] pt-3 md:w-[20%] relative h-full">
             <img
            className="rounded-xl"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
            alt=""/>
           <button onClick={handleCart} className="bg-white font-extrabold shadow-lg shadow-zinc-200 border-[1.5px] px-7 text-green-500 right-[70px] lm:right-[20px] tb:right-[50px] -bottom-5 border-zinc-300  py-3 rounded-xl absolute">ADD</button>
        </div>
        </div>
        <hr className="border border-zinc-200" />
    </div>
)

}

const OfferCard = ({data,id}) =>{
    const {info} = data
    return(
        <div key={id}>
        <div className="min-w-[328px] h-[76px] gap-3 justify-center flex items-center rounded-[20px] border-[1.2px] border-slate-300">
        <img className="w-12" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info?.offerLogo}`} alt="" />
        <div className="flex flex-col">
            <h1 className="font-extrabold">{info.header}</h1>
            <h1 className="font-bold text-slate-500"> {info.couponCode? info.couponCode: info.expiryTime} </h1>
        </div>
        </div>
        </div>
    )
}