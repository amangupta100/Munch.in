import React from 'react'
import mainImg from '../assets/lunch-time-animate.svg'
import { NavLink } from 'react-router-dom'

export const FrontPage = () => {
  return (
    <div className='w-full border h-full'>

      <div className="flex justify-between mtb:items-center mtb:flex-col-reverse">
        <div className="flex w-[50%] mtb:w-full mtb:mt-10 mtb:mb-5 justify-center items-center flex-col">
          <div className="flex items-center">
            <p className='w-[40px] h-[1.3px] bg-[#414141] mtb:w-[75px] lm:w-[50px] mdm:hidden'></p>
            <h1 className='ml-2 mtb:mr-4 mtb:ml-4 mtb:text-lg'>Order The Food You Loves Most</h1>
            <p className='w-[40px] h-[1.3px] mtb:w-[75px] lm:hidden bg-[#414141] mtb:inline-block hidden'></p>
          </div>
          <h1 className='font-bold first-letter:text-4xl mt-2 mtb:text-xl mtb:first-letter:text-5xl lm:first-letter:font-extrabold lm:first-letter:font-serif lm:font-normal'>Fastest Delivery Ever</h1>
         <NavLink to="/search">
         <button className="flex items-center gap-2 my-3 px-8 py-4 bg-slate-200 hover:bg-slate-400 duration-300 ease-in-out transition-all hover:rounded-full hover:text-white">
           <h1 className='font-medium text-[#414141]'>Order NOW</h1>
            <p className='w-10 h-[2px] bg-[#414141] '></p>
           </button>
         </NavLink>
        </div>
       
      <div className="w-[45%] mtb:w-[65%] lm:w-[90%] mtb:mt-3 mtb:flex items-center justify-center">
      <img src={mainImg} className='' alt="" />
      </div>

      </div>
      
    </div>
  )
}


