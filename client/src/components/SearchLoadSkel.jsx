import React from 'react'

export const SearchLoadSkel = ({mode}) => {
  return (
<>
{
  mode == "dishes" ?
  <div className='bg-white py-7 px-5 h-[280px] animate-pulse w-full flex  flex-col rounded-3xl'>
        
  <div className="flex flex-col ">
   <div className="relative">
       <div className="w-full h-24 rounded-lg bg-gray-100 dark:bg-zinc-300"></div>
   </div>
  <hr className='mt-4 border-dashed border-zinc-300' />
  </div>

  <div className="flex items-center justify-between mt-3">
   <div className="w-[55%] ">

   <div className="w-full h-24 rounded-lg bg-gray-100 dark:bg-zinc-300"></div>

   </div>

<div className="w-[35%] lm:w-[45%] ">
<div class="flex items-center justify-center w-full rounded-lg h-28 bg-gray-100 sm:w-96 dark:bg-gray-300">
       <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
       <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
       </svg>
   </div>
</div>
  </div>

   </div> 
   : 
<div className='bg-white py-7 items-center px-5 h-[200px] animate-pulse w-full flex rounded-3xl'>

<div className="w-[35%] lm:w-[45%] ">
<div class="flex items-center justify-center w-full rounded-lg h-28 bg-gray-100 sm:w-96 dark:bg-gray-400">
       <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
       <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
       </svg>
   </div>
</div>

<div className="flex flex-col h-full rounded-lg ml-3 w-[55%] bg-gray-100 dark:bg-gray-400">

</div>

</div>
}
</>
  )
}

