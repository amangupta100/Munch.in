const mongoDb = require("mongoose")

const userModel =mongoDb.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default:false
    },
    addresses: {
        type:Array,default:[]
    }
  }, {
    timestamps: true,
    minimize: false
  });

module.exports = mongoDb.model("user",userModel)