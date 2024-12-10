import { NavLink, useNavigate } from "react-router-dom"
import login from "../assets/secure-login-animate.svg"
import { IoEye } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import { ErrorToast, SuccessToast } from "./NotToast";
import { FcGoogle } from "react-icons/fc";
import { IoMdArrowBack } from "react-icons/io";
import { ParamCont } from "../context/ParamCont";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app}  from "./AuthGoogle";
import { AuthenContext } from "../context/Authen";
import MoonLoader from "react-spinners/MoonLoader"

export const Login = () =>{
   
    const {Paramid} = useContext(ParamCont)
    const {auth,setAuth} = useContext(AuthenContext)

    const [vis,setVis] = useState(false)
    const [loading,setLoading] = useState(false)
    const [loadGoogl,setloadGoogl] = useState(false)

    const [inpVal,setInpVal] = useState({email:"",password:""})
    const navigate = useNavigate()

    const handleInpChange = (name,val) =>{
    setInpVal({...inpVal,[name]:val})
    }

    const handleFormSubmit =async (e) =>{
    e.preventDefault()
   if(!inpVal.email || !inpVal.password) ErrorToast("Please recheck the form")
   else{
    try{
        setLoading(true)
        const data = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify(inpVal),
        })
        const response = await data.json()
        const {success,message} = response
        setLoading(false)
        if(success){
            SuccessToast(message)
            navigate("/")
            setAuth({...auth,token:response.token,user:response.user})
        }
        else{
         ErrorToast(message)
        }
         }catch(err){
          ErrorToast(err)
         }
}
    }

    const handleGoogleAuth =async ()=>{
        try{
        const provider = new GoogleAuthProvider()
        const authGoogle = getAuth(app)
        const result = await signInWithPopup(authGoogle,provider)
        
        setloadGoogl(true)
        const resFron = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/google`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:result?.user?.displayName,
                email:result?.user?.email,
                photo:result?.user?.photoURL,
            })
        })

        const respBack = await resFron.json()
        
        setloadGoogl(false)
        navigate("/")
        SuccessToast("Logged in successfully")
        setAuth({...auth,token:respBack.token,user:{...respBack.user,isEmailVerf:true}})
    }
        catch(err){

        }
    }

    return(
        <div className="bg-zinc-100 w-full py-20">
        
        <div className="flex relative justify-around items-center tb:flex-col h-full">
 
        <NavLink to={Paramid.length>0? `/menu/${Paramid}`:'/'} className="flex items-center bg-violet-500 py-3 rounded-xl text-white px-5 absolute -top-14 left-6 vlm:-top-16 vlm:left-5 hover:bg-violet-800 transition-all duration-300"> 
            <IoMdArrowBack className="text-xl"/>
            <h1 className="ml-1">Menu</h1>
             </NavLink>

        <img src={login} className="w-1/3 lD:w-[45%] tb:w-[65%] lm:w-[100%] " alt="" />
        <div className="flex flex-col px-6 py-6 w-1/3 tb:w-full max-h-fit bg-white rounded-xl">
        <h1 className="text-xl text-center font-bold">Login User</h1>
        <div className="">

        <form action="" className="flex flex-col gap-2 mt-5">
            
        <div className="mb-6">
            <h1 className="text-lg font-semibold">Email</h1>
            <input value={inpVal.email} onChange={(e)=>handleInpChange(e.target.name,e.target.value)} name="email" type="text" placeholder="Enter User Email" className="w-full focus:outline-none focus:shadow-lg focus:shadow-zinc-200 bg-zinc-100 px-4 mt-2 rounded-xl py-3" />
        </div>
            
        <div className="relative">
            <h1 className="text-lg font-semibold">Password</h1>
            {
       vis?
      (
        <>
        <AiFillEyeInvisible onClick={()=>setVis(!vis)} className="text-xl absolute right-5 top-[48px] cursor-pointer"/>
        <input value={inpVal.password} onChange={(e)=>handleInpChange(e.target.name,e.target.value)} name="password" type="text" className="w-full bg-zinc-100 px-4 focus:shadow-lg focus:shadow-zinc-200 py-3 mt-2 focus:outline-none rounded-xl" placeholder="Enter password" />
       </>
      )
       :
      (
        <>
        <IoEye onClick={()=>setVis(!vis)} className="text-xl absolute right-5 top-[48px] cursor-pointer"/>
        <input value={inpVal.password} onChange={(e)=>handleInpChange(e.target.name,e.target.value)} name="password" type="password"  className="w-full bg-zinc-100 focus:shadow-lg focus:shadow-zinc-200 px-4 py-3 mt-2 focus:outline-none rounded-xl" placeholder="Enter password" />
       </>
      )
       }
        </div>

        <h1 className="mt-4">Don't have any account yet ? <NavLink to="/signUp" className="text-blue-500 ml-1 font-semibold"> SignUp </NavLink> </h1>
        <button onClick={handleFormSubmit} className="w-full flex items-center justify-center cursor-pointer tb:translate-x-1/2 tb:mt-3 tb:w-1/2 bg-violet-700 rounded-xl text-white py-3 hover:bg-violet-500 transition-all duration-300">
        {
            loading && <MoonLoader size={20} />
        }
        <h1 className={`${loading?"disabled:cursor-not-allowed":""} ml-3`}>Login User</h1>
        </button>
        <h1 className="text-lg text-center">Or</h1>
       
        </form>
        <button onClick={handleGoogleAuth} className="flex items-center w-full justify-center rounded-xl bg-zinc-300 py-3 hover:bg-zinc-400 transition-all duration-300">
        {
            loadGoogl && <MoonLoader size={20} />
        }
        <FcGoogle className="text-2xl ml-3"/>
       <h1 className="ml-2">Continue With Google</h1>
        </button>
        </div>
        
        </div>

        </div>

        </div>
    )
}