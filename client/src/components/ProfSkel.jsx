export const ProfSkel = ({addrlen,isActive,itemsDet}) =>{
    return(
        <>
       {isActive == 'User Details' ?  <div className="w-[75%] py-10 animate-pulse mx-auto ml-64 lm:ml-0 lm:w-full">

<svg class="w-10 mx-auto rounded-full h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
</svg>

<div className="my-10 px-5">

<div className="w-56 h-10 mb-4 rounded-lg bg-gray-200 dark:bg-gray-600 "></div>
<div className="w-56 h-10 mb-2 rounded-lg bg-gray-200 dark:bg-gray-600 "></div>
<div className="w-56 h-10 mb-4 rounded-lg bg-gray-200 dark:bg-gray-600 "></div>

{Array(addrlen).fill(null).map((_, index) => (
<div className="w-56 h-10 mb-2 rounded-lg bg-gray-200 dark:bg-gray-600 "></div>
))}

</div>

</div> : 
<div className="animate-pulse bg-zinc-100 w-[75%] py-10 mx-auto lm:w-full">

<div className="w-32 mx-auto h-10 rounded-xl bg-gray-200 dark:bg-zinc-600"></div>

<div className="px-5 mt-5">
    <div className="w-32 h-8 rounded-lg bg-gray-200 dark:bg-zinc-600"></div>
    {Array(itemsDet).fill(null).map((_, index) => (
<div className="w-56 h-32 mb-7 mt-4 rounded-lg bg-gray-200 dark:bg-gray-600 "></div>
))}

</div>

</div>
}
        </>
    )
}