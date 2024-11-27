const mong = require("mongoose")


const monConn =async () =>{
    try{
      await mong.connect(process.env.MONGODB_URI)
    }catch(err){
        process.exit(1)
    }
}

module.exports = monConn