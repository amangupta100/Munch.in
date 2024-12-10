const express = require("express")
const { signUp, login, logout, cart, googleLogin, upDateEmailVerf } = require("../controllers/AuthController")
const { signUpValidation, loginValidation } = require("../Middlewares/Validation")
const router = express.Router()

router.post("/signUp",signUpValidation,signUp)
router.post("/login",loginValidation,login)
router.get("/logout",logout)
router.post("/google",googleLogin)
router.post("/updateemailVerf",upDateEmailVerf)
router.get("/checking",(req,res)=>res.send("checking api"))

module.exports = router