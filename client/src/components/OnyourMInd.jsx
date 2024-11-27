import { useState,useEffect } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export const OnyourMind = ({favdish}) =>{

  const [val,setVal] = useState(0)

    const handleNext = () =>{
    val>=135?"": setVal((prev)=>prev+31)
    }
    const handlePrev = () =>{
      val<=0? "": setVal((prev)=>prev-31)
    }
    return(
        <>
          <div className="flex justify-between">
        <h1 className="text-2xl font-extrabold">Order the food you loves most</h1>
        <div className="flex gap-2">
            <div onClick={handlePrev} className={`w-8 ${val==0?"cursor-not-allowed bg-slate-200":"cursor-pointer bg-slate-300"} h-8 cursor-pointer rounded-full  flex items-center justify-center`}> <FaArrowLeftLong className={`${val==0?"text-slate-300":"bg-slate-300"}`}/></div>
            <div onClick={handleNext} className={`w-8 ${val==135?"cursor-not-allowed bg-slate-200":"cursor-pointer bg-slate-300"} h-8 cursor-pointer rounded-full flex items-center justify-center`}> <FaArrowRight className={`${val==124?"text-slate-300":"bg-slate-300"}`}/></div>
        </div>
       </div>

<div style={{translate:`-${val}%`}} className="flex mt-4 pb-8 duration-1000">
{
     favdish.map((item,i)=>{
        return(
        <img onDragStart={(e)=>e.preventDefault()} className="w-[145px] cursor-pointer" key={i} src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`} alt="" />
        )
    })
}
</div>
<hr className="border"/>
        </>
    )
}