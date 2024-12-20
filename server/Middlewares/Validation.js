const Joi = require("joi")

const signUpValidation = (req,res,next) =>{
const Schema = Joi.object({
    name:Joi.string().min(3).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(3).max(15).required()
})
const {error} = Schema.validate(req.body)
if(error){
    return res.status(400).json({message:error.message,error})
}
next()
}

const loginValidation = (req,res,next) =>{
    const Schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(3).max(15).required()
    })
    const {error} = Schema.validate(req.body)
    if(error){
        return res.status(400).json({message:error.message,error})
    }
    next()
}

module.exports = {signUpValidation,loginValidation}