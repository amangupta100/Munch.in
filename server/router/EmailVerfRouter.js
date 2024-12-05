const { SendOTP, VerifyOTP } = require("../controllers/SendOTP")
const router = require("express").Router()

router.post("/sendOTP",SendOTP)
router.post("/verifyOTP",VerifyOTP)

module.exports = router