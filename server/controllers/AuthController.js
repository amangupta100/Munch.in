const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const genToken = (id,name,addresses)=>{
    return jwt.sign({id,name,addresses},process.env.JWT_SECRET)
}

const signUp =async (req,res) =>{
let {name,email,password} = req.body

try{

let user = await userModel.findOne({email})
if(user){
   return res.status(409).json({message:"User Already Exist",success:false})
}

else{
bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password,salt,async function(err,hash){
        user = await userModel.create({name:name,email:email,password:hash})
        res.status(201).json({message:"User create successfully",success:true,token:genToken(user._id,user.name,user.addresses),user:{name:user.name}})
    })
})
}

}catch(err){
   res.status(500).json({message:"Internal Server Error",success:false})
}

}

const login =async (req,res) =>{

    let {email,password} = req.body

    try{
    
    let user = await userModel.findOne({email})
    if(!user){
       return res.status(403).json({message:"User not exit",success:false})
    }
    
    else{
  await bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
        res.status(201).json({message:"Login successfully",success:true,token:genToken(user._id,user.name,user.addresses),user:{name:user.name}})
    }
    else{
     res.status(403).json({message:"Email or password is wrong",success:false})
    }
   })
    }
    
    }
    catch(err){
       res.status(500).json({message:"Internal Server Error",success:false})
    }
}

const logout = (req,res) =>{
    res.clearCookie("token")
    res.status(201).json({message:"Logout Successfully",succes:true})
}

const googleLogin =async (req,res) =>{
const {name,email,photo} = req.body

const user = await userModel.findOne({email})
if(user){
    let user = {
        name,email
    }
    let token = jwt.sign({email,id:user._id},process.env.JWT_SECRET)
    res.json({message:"Logged In successfully",success:true,token,user})
}
else{
const newUser =await userModel.create({name:name,email:email})
let token = jwt.sign({email,id:newUser._id},process.env.JWT_SECRET)
let user = {
    name,email
}
res.json({message:"User not exit",success:true,token,user})
}
}


module.exports = {signUp,login,logout,googleLogin}