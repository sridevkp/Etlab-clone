const express = require("express")
const router = express.Router()

router.get("/reciepts", ( req, res ) => {
    res.send("No reciepts")
})
.get("/pay", ( req, res ) => {
    res.send("this feature is not available yet")
})

module.exports = router