import { useContext, useEffect } from "react"
import { PaymentDet } from "../context/PaymentDet"
import trueSvg from "../assets/true-orange.svg"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthenContext } from "../context/Authen"
import { CartContext } from "../context/CartContext"

export const PaymentSucc = () =>{
    const {paydet} = useContext(PaymentDet)
    const navigate = useNavigate()
    const {auth} = useContext(AuthenContext)
     const {cartData} = useContext(CartContext)

     let totalPrice = cartData.reduce((acc,curVal)=>(acc+(curVal.price/100*curVal.quantity || curVal.defaultPrice/100*curVal.quantity)),0)

    useEffect(()=>{
    !auth.token.length>0? navigate("/login"):null
    },[auth.token])

    return(
        <div className="flex items-center justify-center bg-zinc-200">
          
         <div className="w-[35%] tb:w-[65%] lm:w-[80%] relative lm:my-[20%] my-[10%] py-5 rounded-xl mx-auto shadow-lg shadow-zinc-300 bg-white">
           <div className="w-[45px] h-[45px] rounded-full bg-zinc-200  absolute bottom-20 -left-5"></div>
           <div className="w-[45px] h-[45px] rounded-full bg-zinc-200  absolute bottom-20 -right-5"></div>

           <div className="w-32 h-32 tb:w-28 tb:h-28 tb:left-[195px] lm:left-[115px] left-[200px] shadow-2xl shadow-orange-500 -top-[70px] bg-orange-500 flex justify-center items-center rounded-full absolute">
            <img src={trueSvg} className="" alt="" />
           </div>

           <h1 className="text-base text-center mt-12 text-orange-400">Great!</h1>
           <h1 className="text-2xl mt-2 text-center font-extrabold"> Payment Success </h1>

           <div className="mt-5 w-full px-8">
          <div className="flex justify-between">
            <h1>Order ID </h1>
            <h1 className="font-extrabold">{paydet?.response?.razorpay_payment_id}</h1>
          </div>
          <div className="flex justify-between">
            <h1>Pay</h1>
            <h1 className="font-extrabold"> ₹ {totalPrice} </h1>
          </div>

          <div className="flex justify-between">
            <h1>Pay Date </h1>
            <div className="flex flex-col">
            <h1 className="font-extrabold"> {paydet?.payDate} </h1>
            </div>
          </div>

           <hr className="border-zinc-300 border-[1.6px] mt-8 border-dashed" />
           </div>
           <h1 className="text-center font-extrabold text-xl mt-4 text-zinc-400">Total Pay</h1>
           <h1 className="text-center font-extrabold text-orange-400 text-xl mt-2">₹ {totalPrice} </h1>
           <NavLink to="/"> <button className="mt-4 rounded-lg px-10 hover:text-black w-full bg-orange-500 hover:bg-orange-300 text-white py-3 transition-all duration-300 ease-in-out font-extrabold"> Continue Shopping </button> </NavLink>
         </div>

        </div>
    )
}