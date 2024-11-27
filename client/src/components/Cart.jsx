import { useContext} from "react"
import { CartContext } from "../context/CartContext"
import empty from '../assets/2xempty_cart_yfxml0.avif'
import { NavLink } from "react-router-dom"
import vegIcon from '../assets/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png'
import nonIcon from '../assets/images.png'
import { AuthenContext } from "../context/Authen"


export const Cart = () =>{
    const {cartData,setCartData} = useContext(CartContext)
    const {auth} = useContext(AuthenContext)
    let totalPrice = cartData.reduce((acc,curVal)=>(acc+(curVal.price/100 || curVal.defaultPrice/100)),0)
    return(
        <>
       {
        cartData.length==0 ?
        <div className={`w-full h-full`}>

        <div className="flex justify-center items-center">
            
       <div className="flex flex-col w-full h-full items-center justify-center mt-20">
       <img src={empty} className="w-[25%] mtb:w-[40%] tb:w-[45%] vlm:w-[50%] lm:w-[80%] " alt="" />
       <h1 className="text-center text-xl mt-5">Your cart is empty</h1>
       <p className="text-sm text-zinc-500 mt-2">You can go to home page to view more restaurants and dishes</p>
       <NavLink to="/" className="py-3 bg-orange-400 hover:bg-orange-600 transition-all duration-300 text-white px-4 mt-3 rounded-xl">

        <h1>Return to Home</h1>
       </NavLink>
       </div>

        </div>        

        </div>
        :
      
        <div className={`w-full h-full`}>
             <div className={`w-[75%] mx-auto mt-6 lD:w-[85%] tb:w-[88%]` }>


<div className={`ml-12 lD:ml-0`}>
<h1 className="text-4xl font-semibold">Your Bag</h1>
 <h1 className="mt-3 font-semibold">TOTAL ({cartData.length} items) ₹{totalPrice}</h1>
 <h1>Items in your bag are not reserved — check out now to make them yours.</h1>
</div>
 <div className="mt-7 flex tb:flex-col justify-center gap-8">

<div className="max-w-[60%] lD:max-w-[100%] ">

{
  cartData.map((elem)=>{
      return(
          <div className=" mb-8 border-[1.2px] p-3 border-zinc-200 ">
  {
      elem.itemAttribute.vegClassifier == "VEG"?
      <img src={vegIcon} className="w-4 rounded-sm" alt="" />:
      <img src={nonIcon} className="w-4" alt="" />
  }
           <div className="flex items-center  justify-between">
  <div className="w-[55%] flex flex-col">
  <h1>{elem.name}</h1>
  <p className="mt-2"> {elem?.description?.slice(0,100)+"..."} </p>
  <h1 className="font-semibold"> ₹{elem.price/100 || elem.defaultPrice/100} </h1>

  <div className="flex items-center mt-2">
      <button className="text-violet-500 focus:bg-zinc-200 w-3 rounded-lg px-3 flex items-center justify-center border-[1.7px] border-zinc-400">+</button>
      <h1 className="ml-2 mr-2">0</h1>
      <button className="text-red-500 w-3 focus:bg-zinc-200 px-3 flex rounded-lg items-center justify-center border-[1.7px] border-zinc-400">-</button>
  </div>

  </div>
 <div className="w-[30%] ">
 <img src={`https://media-assets.swiggy.com/swiggy/image/upload/${elem.imageId}`} className="w-48" alt="" />
 </div>
  </div>
          </div>
      )
  })
}

</div>

<div className="w-[330px] px-5 py-3 tb:p-0 tb:w-full tb:mb-4">
  <h1 className="text-xl font-bold">Summary</h1>
  <div className="flex justify-between items-center mt-2">
  <h1 className="text-base"> Subtotal </h1>
  <h1 className="font-bold"> ₹{totalPrice} </h1>
  </div>
  <div className="flex justify-between items-center mt-2">
  <h1 className="text-base"> Estimated Shipping & Handling </h1>
  <h1 className="font-bold"> ₹0 </h1>
  </div>
  <div className="flex justify-between items-center mt-2">
  <h1 className="text-base"> Estimated Tax </h1>
  <h1 className="font-bold"> ₹0 </h1>
  </div>
 
 <hr className="mt-3 border-zinc-400" />
 <div className="flex justify-between items-center mt-2 mb-3">
  <h1 className="text-lg"> Total </h1>
  <h1 className="font-bold"> ₹{totalPrice} </h1>
  </div>
  <hr className="border-zinc-400" />
 
 
<NavLink to={`${auth.token.length>0?"/checkout":"/"}`}>
<button className="mt-6 cursor-pointer rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 ease-in-out py-3 bg-violet-400 text-white w-full">
<h1 className="ml-2">Checkout</h1>
  </button>
</NavLink>

 </div>

 </div>

 

 </div>

        </div>

       }
        </>
    )
}