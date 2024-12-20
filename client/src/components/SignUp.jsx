import { NavLink, useNavigate } from "react-router-dom"
import signUp from "../assets/sign-up-animate.svg"
import { IoEye } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import { ErrorToast, SuccessToast } from "./NotToast";
import { AuthenContext } from "../context/Authen";
import { ParamCont } from "../context/ParamCont";
import { IoMdArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app}  from "./AuthGoogle";
import {Oval} from 'react-loader-spinner'
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePassword } from "react-icons/md";

export const SignUp = () =>{
    const navigate = useNavigate()
    const [vis,setVis] = useState(false)
    const [inpval,setInpVal] = useState({name:"",email:"",password:""})
    const [loading,setLoading] = useState(false)
    const [loadGoogl,setloadGoogl] = useState(false)
    
    const {Paramid} = useContext(ParamCont)
    const {auth,setAuth} = useContext(AuthenContext)

    const handleInpChange = (name,val) =>{
    setInpVal({...inpval,[name]:val})
    }

    const handleFormSubmit =async (e) =>{
    const {name,email,password} = inpval
    e.preventDefault()
    if(!name || !email || !password){
        return ErrorToast("All inputs are required")
    }
    try{
    setLoading(true)
    const data =await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signUp`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(inpval)
    })
    const response =await data.json()
 
    const {success,message} = response
    setLoading(false)
    if(success){
        SuccessToast(message)
        navigate("/login")
    }
    else{
        ErrorToast(message)
    }
    }catch(err){
        ErrorToast(err)
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
        SuccessToast("SignUp in successfully")
        setAuth({...auth,token:respBack.token,user:{...respBack.user,isEmailVerf:true}})
    }
        catch(err){

        }
    }

    return(
        <div className="bg-zinc-100 w-full relative py-20">
        
        <NavLink to={Paramid.length>0? `/menu/${Paramid}`:'/'} className="flex items-center bg-violet-500 py-3 rounded-xl text-white px-5 absolute top-4 left-4 vlm:-top-16 lm:top-4 vlm:left-5 hover:bg-violet-800 transition-all duration-300"> 
            <IoMdArrowBack className="text-xl"/>
            <h1 className="ml-1">Menu</h1>
             </NavLink>
        
        <div className="flex mtb:flex-col justify-around items-center h-full">

        <img src={signUp} className="w-1/3 h-1/2 mtb:w-[55%] " alt="" />
        <div className="flex flex-col px-6 py-6 w-1/3 mtb:w-full max-h-fit bg-white rounded-xl">
        <h1 className="text-xl text-center font-bold mtb:text-2xl">Register User</h1>
        <div className="">

        <form action="" className="flex flex-col gap-2 mt-5">

        <div className="mb-6 relative">
            <h1 className="text-lg font-semibold">Name</h1>
            <CiUser className="absolute top-[48px] text-2xl left-3 "/>
            <input onChange={(e)=>handleInpChange(e.target.name,e.target.value)} type="text" value={inpval.name} name="name" placeholder="Enter Name" className="w-full focus:outline-none focus:shadow-lg focus:shadow-zinc-200 bg-zinc-100 px-12 mt-2 rounded-xl py-3" />
        </div>
            
            
        <div className="mb-6 relative">
            <AiOutlineMail className="text-2xl absolute top-[48px] left-3 "/>
            <h1 className="text-lg font-semibold">Email</h1>
            <input onChange={(e)=>handleInpChange(e.target.name,e.target.value)} type="text" value={inpval.email} name="email" placeholder="Enter User Email" className="w-full focus:outline-none focus:shadow-lg focus:shadow-zinc-200 bg-zinc-100 px-12 mt-2 rounded-xl py-3" />
        </div>
            
        <div className="relative">
            <h1 className="text-lg font-semibold">Password</h1>
            <MdOutlinePassword className="text-2xl absolute left-3 top-[48px] "/>
            {
       vis?
      (
        <>
        <AiFillEyeInvisible onClick={()=>setVis(!vis)} className="text-xl absolute right-5 top-[48px] cursor-pointer"/>
        <input onChange={(e)=>handleInpChange(e.target.name,e.target.value)} name="password" value={inpval.password} type="text" className="w-full bg-zinc-100 px-12 focus:shadow-lg focus:shadow-zinc-200 py-3 mt-2 focus:outline-none rounded-xl" placeholder="Enter password" />
       </>
      )
       :
      (
        <>
        <IoEye onClick={()=>setVis(!vis)} className="text-xl absolute right-5 top-[48px] cursor-pointer"/>
        <input onChange={(e)=>handleInpChange(e.target.name,e.target.value)} name="password" value={inpval.password} type="password"  className="w-full bg-zinc-100 focus:shadow-lg focus:shadow-zinc-200 px-12 py-3 mt-2 focus:outline-none rounded-xl" placeholder="Enter password" />
       </>
      )
       }
        </div>

        <h1 className="mt-4">Already have an account ? <NavLink to="/login" className="text-blue-500 ml-1 font-semibold"> Login </NavLink> </h1>
        <button onClick={handleFormSubmit} className={`w-full ${loading?"cursor-not-allowed bg-violet-300":""} flex items-center justify-center cursor-pointer tb:translate-x-1/2 tb:mt-3 tb:w-1/2 bg-violet-700 rounded-xl text-white py-3 hover:bg-violet-500 transition-all duration-300`}>
        {
        loading ? <Oval
        visible={true}
        height="30"
        width="30"
        color="#FFFFFF"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /> : <>
         <h1 className="ml-2">SignUp User</h1></>
       }
        </button>
        <h1 className="text-lg text-center">Or</h1>
        </form>

        <button onClick={handleGoogleAuth} className={`flex ${loadGoogl?"cursor-not-allowed bg-violet-300":""} items-center w-full justify-center rounded-xl bg-zinc-300 py-3 hover:bg-zinc-400 transition-all duration-300`}>
        {
        loadGoogl ? <Oval
        visible={true}
        height="30"
        width="30"
        color="#FFFFFF"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /> : <>
         <FcGoogle className="text-2xl ml-3"/>
         <h1 className="ml-2">Continue With Google</h1></>
       }
        </button>

        </div>
        
        </div>

        </div>

        </div>
    )
}