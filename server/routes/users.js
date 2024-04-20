const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const { userModel: Users } = require("../models/User")

const db=  mongoose.connect('mongodb://localhost:27017/etlabs')


router.get("/bio", async ( req, res ) => {
        try{
            const user = await Users.findById( req.user.id )
            const bio = user?.bio 
            if( ! bio ) return res.sendStatus(404);
            res.status(200).json( { name : user.username, ...bio, role : user.role })
        }catch( err ){
            console.log( err )
            res.sendStatus(500)
        }
        
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