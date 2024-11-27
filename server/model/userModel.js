const mongoDb = require("mongoose")

const userModel = mongoDb.Schema({
    name:String,email:String,password:String,addresses:{
        type:Array,default:[]
    }
},{minimize:false})

module.exports = mongoDb.model("user",userModel)