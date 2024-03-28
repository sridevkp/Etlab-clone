const express = require("express")
const router = express.Router()

router.get("/bio", ( req, res ) => {
    res.json({
        role : "parent",
        name : "my name",
        age : 18,
        year : 2023,
    })
})

module.exports = router
