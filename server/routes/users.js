const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const userController = require("../controllers/userController");

router.get("/bio", userController.getBio )
    .get("/fees", userController.getDuesAndReceipts )
    .get("/attendance", ( req, res ) => {
        res.send("this feature will be available soon")
    })
    .get("/results", ( req, res ) => {
        res.send("this feature will be available soon")
    })
    .get("/inbox", ( req, res ) => {
        res.send("this feature will be available soon")
    })
    .post("/send", ( req, res ) => {
        res.send("this feature will be available soon")
    })
    .route("/leave").get( ( req, res ) => {
                        res.send("this feature will be available soon")
                    }).post(( req, res ) => {
                        res.send("this feature will be available soon")
                    })


module.exports = router