const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const db=  mongoose.createConnection('mongodb://localhost:27017/etlabs')

router.get("/reciepts", ( req, res ) => {
    res.send("No reciepts")
})
.get("/pay", ( req, res ) => {
    res.send("this feature is not available yet")
})

module.exports = router