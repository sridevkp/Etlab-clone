const mongoose = require("mongoose")
const { userModel: Users } = require("../models/User")
const db =  mongoose.connect('mongodb://localhost:27017/etlabs')


const getBio = async ( req, res ) => {
    try{
        const user = await Users.findById( req.user.id )
        const bio = user?.bio 
        if( ! bio ) return res.sendStatus(404);
        res.status(200).json( { name : user.email, ...bio, role : user.role })
    }catch( err ){
        console.log( err )
        res.sendStatus(500)
    } 
}

const getDuesAndReceipts = async ( req, res ) => {
    try{
        const user = await Users.findById( req.user.id );
        const dues = user?.dues
        const receipts = user?.receipts
        if( !user ) return res.sendStatus(404);
        res.status(200).json( { dues, receipts })
    }catch(err){
        console.log( err )
        res.sendStatus(500)
    }
}

module.exports = { getBio, getDuesAndReceipts }