const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const genToken = (id,name,addresses,imagePath) =>{
    return jwt.sign({name,id,addresses,imagePath},process.env.JWT_SECRET)
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
    let token = genToken(result._id,result.name,result.addresses,result.imagePath)
    res.json({success:true,message:"Address Updated Successfully",result,token})
}
}

const checkToken =async (req,res) =>{
    res.send(jwt.verify(req.body.token,process.env.JWT_SECRET,(err,decoded)=>{
        if (err) {
            res.json({success:false,message:"Invalid token"})
        } else {
            res.json({success:true,decoded})
        }
    })
    )
}

const deleteAddr = async (req, res) => {
    const { id, addrId } = req.body;

    try {
        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User  not found" });
        }

        if (addrId < 0 || addrId >= user.addresses.length) {
            return res.status(400).json({ success: false, message: "Invalid address index" });
        }

        user.addresses.splice(addrId, 1);

        await user.save();
        let token = genToken(user._id,user.name,user.addresses,user.imagePath)
        res.json({ success: true, message: "Address deleted successfully", token });
    } catch (error) {
        console.error("Error deleting address:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Error deleting address", error: error.message });
    }
};

const order = async (req, res) => {
    const { id, methodPay, payDate, Items,amount } = req.body;
    const user = await userModel.findById(id);

    try {
        if (!user) {
            return res.json({ success: false, message: "User  does not exist" });
        } else {
            const orderData = {
                methodPay,
                payDate,amount,
                Items
            };
            user.Order.push(orderData);
            await user.save();
            res.json({ success: true, message: "Order saved successfully",orders:user.Order });
        }
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

const getOrdersDet =async (req,res) =>{
const {id} = req.body
try{
const result = await userModel.findById(id)
if(!result) return res.json({success:false,message:"User does not exist"})
else{
    res.json({orders:result.Order,success:true})
}
}catch(err){
    res.json({success:false,message:err.message})
}
}

module.exports = {details,updatedDetails,checkToken,deleteAddr,order,getOrdersDet}