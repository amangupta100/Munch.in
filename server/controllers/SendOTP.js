const nodemailer = require("nodemailer")
const randomString = require("randomstring")
const { OTP_Verf } = require("../libs/EmailConf")
const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const generateOTP = () =>{
    return randomString.generate({
        length:4,charset:"numeric"
    })
}

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: 'coderamang02@gmail.com',
        pass: 'madn wwij sgae bxry'
    },
})
const SendOTP =async (req,res) =>{
    const {name,email} = req.body
try{
    const otp =generateOTP()
    let info = await transport.sendMail({
        from: 'Munch.in <coderamang02@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "OTP Verification", // Subject line
        text: `Verify Your Email`, // plain text body
        html:OTP_Verf.replace("{{ .Token }}",otp).replace("{{ .name }}",name)
      });
    res.json({success:true,message:"OTP send successfully",otp})
}catch(err){
    res.json({success:false,message:"OTP not send"})
}
}

const VerifyOTP =async (req,res) =>{
const {otp,token,id} = req.body
try{
 if(otp!=token) res.json({success:false})
 else{
    const user = await userModel.findById(id);
    user.isEmailVerified = true
    await user.save()
    res.json({success:true})
}
}catch(err){
res.json(err.message)
}
}

module.exports = {SendOTP,VerifyOTP}