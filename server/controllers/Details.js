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
    const { id, addrId } = req.body; // Assuming addressIndex is the index of the address to be deleted

    try {
        // Step 1: Find the user by ID
        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User  not found" });
        }

        // Step 2: Check if the index is valid
        if (addrId < 0 || addrId >= user.addresses.length) {
            return res.status(400).json({ success: false, message: "Invalid address index" });
        }

        // Step 3: Remove the address from the array using splice
        user.addresses.splice(addrId, 1);

        // Step 4: Save the updated user document
        await user.save();
        let token = genToken(user._id,user.name,user.addresses)
        res.json({ success: true, message: "Address deleted successfully", token });
    } catch (error) {
        console.error("Error deleting address:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Error deleting address", error: error.message });
    }
};


module.exports = {details,updatedDetails,checkToken,deleteAddr}
