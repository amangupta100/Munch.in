import { useState,useEffect, useContext } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { RestCard } from "./RestCard";


export const Toprest = ({heading,favdish}) =>{
    const [val,setVal] = useState(0)

    const handleNext = () =>{
    val>=195?"": setVal((prev)=>prev+31)
    }
    const handlePrev = () =>{
      val<=0? "": setVal((prev)=>prev-31)
    }

    return(
        <>
       
       <div className="flex justify-between mt-10">
        <h1 className="text-2xl font-extrabold"> Top Restuarants near you </h1>
        <div className="flex gap-2">
            <div onClick={handlePrev} className={`w-8 ${val==0?"cursor-not-allowed bg-slate-200":"cursor-pointer bg-slate-300"} h-8 cursor-pointer rounded-full  flex items-center justify-center`}> <FaArrowLeftLong className={`${val==0?"text-slate-300":"bg-slate-300"}`}/></div>
            <div onClick={handleNext} className={`w-8 ${val==195?"cursor-not-allowed bg-slate-200":"cursor-pointer bg-slate-300"} h-8 cursor-pointer rounded-full flex items-center justify-center`}> <FaArrowRight className={`${val==124?"text-slate-300":"bg-slate-300"}`}/></div>
        </div>
       </div>

<div style={{translate:`-${val}%`}} className="flex gap-8 mt-4 pb-8 duration-1000">

{
     favdish.map((rest,i)=>{
        return(
            <RestCard rest={rest} key={i}/>
        )
    })
}

</div>
<hr className="border"/>

        </>
    )
}