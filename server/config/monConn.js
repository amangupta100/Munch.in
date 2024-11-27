const mong = require("mongoose")


const monConn =async () =>{
    try{
      await mong.connect(process.env.mongo_connection_string)
    }catch(err){
        process.exit(1)
    }
}

module.exports = monConn