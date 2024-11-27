const express = require("express")
const app = express()
const mongConn = require("./config/monConn")
const authRouter = require("./router/authRouter")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const Details = require("./router/DetailsRouter")

require("dotenv").config()
mongConn()

app.use(express.json())
app.use(cors({
    origin: 'https://munch-in-gyvv.vercel.app', // Replace with your frontend URL
}))
app.use(cookieParser())
app.use("/auth",authRouter)
app.use("/user",Details)

app.listen(process.env.PORT)
