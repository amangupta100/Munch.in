const express = require("express")
const { details, updatedDetails, checkToken, deleteAddr } = require("../controllers/Details")
const router = express.Router()


router.post("/details",details)
router.post("/updatedDetails",updatedDetails)
router.post("/checkToken",checkToken)
router.post("/deleteAddr",deleteAddr)

module.exports = router