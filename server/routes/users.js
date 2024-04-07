const express = require("express")
const router = express.Router()

const users = require("../views/user.json").users

router.get("/bio", ( req, res ) => {
        const user = users[String( req.user.id )]
        const bio = user?.bio 
        if( ! bio ) return res.sendStatus(404);
        res.status(200).json( { name : user.username, ...bio, role : user.role })
    })
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