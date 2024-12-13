const router = require("express").Router()
const Razorpay = require("razorpay")

router.post("/orders",async (req,res)=>{
    const razorpay = new Razorpay({
      key_id:process.env.RAZORPAY_KEY_ID,
      key_secret:process.env.RAZORPAY_SECRET
    })

    const options = {
      amount:req.body.amount,
      receipt:"receipt#1",
      payment_capture:1,
      currency:req.body.currency
    }
    
    try{
   
      const response = await razorpay.orders.create(options)
      res.json({order_id:response.id,currency:response.currency,amount:response.amount,success:true})
  
    }catch(err){
      res.send(err.message)
    }
  })
  
  router.get("/payment/:paymentId", async(req, res) => {
    const {paymentId} = req.params;
  
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_SECRET
    })
    
    try {
        const payment = await razorpay.payments.fetch(paymentId)
  
        if (!payment){
            return res.status(500).json("Error at razorpay loading")
        }
  
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    } catch(error) {
        res.status(500).json("failed to fetch")
    }
  })

module.exports = router