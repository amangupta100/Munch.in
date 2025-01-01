const express = require("express")
const { details, updatedDetails, checkToken, deleteAddr, order, getOrdersDet } = require("../controllers/Details")
const router = express.Router()


router.post("/details",details)
router.post("/updatedDetails",updatedDetails)
router.post("/checkToken",checkToken)
router.post("/deleteAddr",deleteAddr)
router.post("/order",order)
router.post("/getOrderDet",getOrdersDet)

module.exports = router