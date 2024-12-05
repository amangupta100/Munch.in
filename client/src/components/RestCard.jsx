import { NavLink } from "react-router-dom";
import star from '../assets/star-svgrepo-com.svg'

export const RestCard = ({rest}) =>{
    return(
        <>
       <NavLink to={`/menu/${rest.cta.link.split("/")[5]}`}>

       <div className="min-w-[273px] hover:scale-90 duration-300 transition-all h-[273px] relative">
            <img onDragStart={(e)=>e.preventDefault()} className="w-full h-[160px] object-cover rounded-2xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${rest?.info?.cloudinaryImageId}`} alt="" />
            <div className="absolute w-full h-[170px] rounded-2xl bg-gradient-to-t from-2% to-transparent to-40%  from-black top-0">
            <p className="absolute bottom-1 left-3 text-white font-[900] text-xl"> {rest?.info?.aggregatedDiscountInfoV3?.header && rest?.info?.aggregatedDiscountInfoV3?.subHeader ? rest?.info?.aggregatedDiscountInfoV3?.header+" "+rest?.info?.aggregatedDiscountInfoV3?.subHeader : null}  </p>
            </div>
            <div className="px-2 pt-2">
                <h1 className="font-extrabold text-[17px] line-clamp-1"> {rest.info.name} </h1>
                <div className="flex items-center">
                    <img src={star} className="w-6 text-green-600" alt="" />
                   <div className="flex">

                  <div className="flex">
                  <h1 className="font-semibold ml-1 "> {rest?.info?.avgRating} </h1>
                  <h1 className="inline-block ml-2"> {rest.info?.sla?.slaString} </h1>
                  </div>
                    
                    
                   </div>
                </div>
                <h1 className="line-clamp-1"> {rest.info?.cuisines.join(", ")} </h1>
                <h1> {rest.info?.areaName} </h1>
            </div>
            
            </div>

       </NavLink>
        </>
    )
}