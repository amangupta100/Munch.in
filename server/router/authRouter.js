const express = require("express")
const { signUp, login, logout, cart, googleLogin } = require("../controllers/AuthController")
const { signUpValidation, loginValidation } = require("../Middlewares/Validation")
const router = express.Router()

router.post("/signUp",signUpValidation,signUp)
router.post("/login",loginValidation,login)
router.get("/logout",logout)
router.post("/google",googleLogin)

module.exports = router