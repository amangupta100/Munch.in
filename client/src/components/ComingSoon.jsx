import { NavLink } from 'react-router-dom'
import reopen from '../assets/shops-re-opening-soon-animate.svg'
import { IoMdArrowBack } from "react-icons/io";

export const ComingSoon = () =>{
    return(
        <div className='w-full h-full'>

            <div className="w-full h-full flex flex-col justify-center items-center">
                
           <div className="w-1/2 h-full flex flex-col items-center justify-center">
           <img src={reopen} className='w-[460px]' alt="" />
                <h1 className='text-center text-lg'>Coming Soon
                <h1 className='text-[15px] text-zinc-500'>You may be searching the restaurant which is closed now and not exist . Try different restaurants</h1>
               <NavLink to="/" className="flex mx-auto items-center mt-4 justify-center w-[35%] rounded-xl py-2 bg-violet-500 hover:bg-violet-700 duration-300 transition-all">
                <IoMdArrowBack className='text-white'/>
                 <h1 className='text-white ml-1'>Return to Home</h1>
               </NavLink>
                </h1>
           </div>

            </div>
        
        </div>
    )
}