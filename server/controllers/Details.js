const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const genToken = (id,name,addresses) =>{
    return jwt.sign({name,id,addresses},process.env.JWT_SECRET)
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
    let token = genToken(result._id,result.name,result.addresses)
    res.json({success:true,message:"Address Updated Successfully",result,token})
}
}


module.exports = {details,updatedDetails}
