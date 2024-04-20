const express = require("express")
const router = express.Router()

const users = require("../models/user.json").users

router.get("/ping", ( req, res ) => {
    res.status(200).send("pong")
})

module.exports = router
