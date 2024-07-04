const mongoose = require("mongoose")
const RazorPay = require("razorpay")
const crypto = require("crypto")

const db =  mongoose.createConnection('mongodb://localhost:27017/etlabs')

const { userModel: Users } = require("../models/User")
const { feeModel: Fees } = require("../models/Fee")
const { stdout } = require("process")

const razor = new RazorPay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

const createOrder = async ( req, res ) => {
    try{
        const id = req.body.id;
        const fee = await Fees.findById(id)
        
        const options = {
            amount : fee.amt * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }   
        razor.orders.create( options, ( err, order ) => {
            if( err ){
                console.log(err)
                return res.sendStatus(503)
            }
            console.log(`Order created for fee ${id}`)
            res.status(200).json({ order })
        })
    }catch( err ){
        console.log( err )
        res.sendStatus( 500 )
    }
}

const verifyPayment = async ( req, res ) => {
    try{
        const {
            fee_id,
            razorpay_order_id ,
            razorpay_payment_id,
            razorpay_signature
        } = req.body ;
        const sign = razorpay_order_id+"|"+razorpay_payment_id;
        
        const expectedSign = crypto
        .createHmac("sha256", process.env.KEY_SECRET )
        .update(sign.toString())
        .digest("hex")

        if( expectedSign === razorpay_signature ){
            res.status(200).send("Payment verified");
            const payment = await razor.payments.fetch( razorpay_payment_id ) 
            const user = await Users.findById( req.user.id )
            const fee = await Fees.findById( fee_id )
            
            user.receipts.push({
                mode: payment.method,
                payment_id:razorpay_payment_id,
                date : new Date(),
                fee 
            })
            user.dues = user.dues.filter( due => due._id != fee_id )
            console.log(`Payment verified ${razorpay_payment_id}`)
            return user.save()
        }
        return res.status(400).send("Invalid signature sent")


    }catch( err ){
        process.stdout( `Payment failed` , err)
        res.sendStatus(500)
    }
}

module.exports = { createOrder, verifyPayment }