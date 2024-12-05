const express = require("express")
const app = express()
const mongConn = require("./config/monConn")
const authRouter = require("./router/authRouter")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const Details = require("./router/DetailsRouter")
const EmailVerfRouter = require("./router/EmailVerfRouter")

require("dotenv").config()
mongConn()

app.use(express.json())

const corsOptions = {
    origin:process.env.frontend_URL , // Replace with your frontend's URL
   
  };
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/auth",authRouter)
app.use("/user",Details)
app.use("/verifyEmail",EmailVerfRouter)

app.listen(process.env.PORT)
