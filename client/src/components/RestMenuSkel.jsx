import React from 'react'

export const RestMenuSkel = () => {
  return (
    <div  className='w-full overflow-hidden animate-pulse bg-white h-full'>
    
    <div className="bg-gray-100 rounded-lg dark:bg-zinc-400 w-32 h-8 "></div>

    <div className="w-48 h-12 mt-5 rounded-lg bg-gray-100 dark:bg-zinc-400 "></div>
    <div className="w-full h-[206px] rounded-lg mt-5 bg-gray-100 dark:bg-zinc-400  "></div>
    <div className="w-48 h-12 mt-5 rounded-lg bg-gray-100 dark:bg-zinc-400 "></div>

    <div className="flex gap-3 mt-4">
      <div className="w-[328px] rounded-lg h-[80px] bg-gray-100 dark:bg-zinc-400"></div>
      <div className="w-[328px] rounded-lg h-[80px] bg-gray-100 dark:bg-zinc-400"></div>
      <div className="w-[328px] rounded-lg h-[80px] bg-gray-100 dark:bg-zinc-400"></div>
    </div>

    <div className="w-full h-12 mt-5 rounded-lg bg-gray-100 dark:bg-zinc-400"></div>

    </div>
  )
}

