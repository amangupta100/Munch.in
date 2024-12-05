import { MainPage } from "./components/MainPage"
import { Navbar } from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import { RestMenu } from "./components/RestMenu"
import { Coordinate, Visibility } from "./context/sideOpen"
import { useState } from "react"
import { Login } from "./components/Login"
import { SignUp } from "./components/SignUp"
import { CartContext } from "./context/CartContext"
import { Cart } from "./components/Cart"
import { ParamCont } from "./context/ParamCont"
import { ComingSoon } from "./components/ComingSoon"
import { AuthenContext } from "./context/Authen"
import { Checkout } from "./components/Checkout"
import { EmailVerf } from "./context/EmailVerf"
import { VeriBoxCont } from "./context/VerifBox"

export const App = () =>{
  
  const [visible,setVis] = useState(false)
  const [cartData,setCartData] = useState([])
  const [Paramid,setParamId] = useState("")
  const [coord,setCord] = useState({lat:"26.87560",lng:"80.91150"})
  const [auth,setAuth] = useState({token:"",user:null})
  const [emailVer,setEmailVerf] = useState(false)
  const [verifBox,setVrfBox] = useState(false)

  return(

<VeriBoxCont.Provider value={{verifBox,setVrfBox}}>

<EmailVerf.Provider value={{emailVer,setEmailVerf}}>

<AuthenContext.Provider value={{auth,setAuth}}>

<ParamCont.Provider value={{Paramid,setParamId}}>

<CartContext.Provider value={{cartData,setCartData}}>

<Coordinate.Provider value={{coord,setCord}}>

<Visibility.Provider value={{visible,setVis}}>

<div className={`${visible || verifBox?"max-h-96 overflow-hidden":""}`}>

<Routes>

<Route path="/" element={<Navbar />}>
<Route path="/" element={<MainPage />} />
<Route path="/menu/:id" element={<RestMenu />}/>
<Route path="/checkout" element={<Checkout/>}/>
<Route  path="*" element={<ComingSoon/>}/>
<Route path="/cart" element={<Cart/>} />
</Route>
<Route path="/login" element={<Login/>}/>
<Route path="/signUp" element={<SignUp/>}/>

    </Routes>

</div>

</Visibility.Provider>
</Coordinate.Provider>
</CartContext.Provider>

</ParamCont.Provider>

</AuthenContext.Provider>

</EmailVerf.Provider>
  
</VeriBoxCont.Provider>
    
  )
}