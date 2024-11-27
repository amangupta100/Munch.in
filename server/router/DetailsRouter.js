const express = require("express")
const { details, updatedDetails } = require("../controllers/Details")
const router = express.Router()


router.post("/details",details)
router.post("/updatedDetails",updatedDetails)

module.exports = router