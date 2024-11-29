const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const genToken = (name,pincode,address,number,id,State,city) =>{
    return jwt.sign({name,pincode,address,number,id,State,city},process.env.JWT_SECRET)
}

const details = (req,res) =>{
    if(req.body.token){
        res.send(jwt.verify(req.body.token,process.env.JWT_SECRET,(err,decoded)=>{
            if (err) {
                res.json({success:false,message:"Invalid token"})
            } else {
                res.json({success:true,decoded})
            }
        })
        )
    }
    else{
        res.json({success:false,message:"Invalid token or token is missing"})
    }
    }


const updatedDetails =async (req,res) =>{
const {data,id} = req.body
const result =await userModel.findById(id)
if(!result) res.json({success:false,message:"User not found"})
else{
    result.addresses.push(data);
    await result.save();
    res.json({success:true,message:"Address Updated Successfully",token:genToken(result.name,result.addresses.pincode,result.addresses.address,result.addresses.number,result._id,result.addresses.State,result.addresses.city)})
}
}
module.exports = {details,updatedDetails}