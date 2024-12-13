const express = require("express")
const { details, updatedDetails, checkToken } = require("../controllers/Details")
const router = express.Router()


router.post("/details",details)
router.post("/updatedDetails",updatedDetails)
router.post("/checkToken",checkToken)

module.exports = router