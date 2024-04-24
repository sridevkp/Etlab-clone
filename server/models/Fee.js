const mongoose = require("mongoose")

const feeSchema = new mongoose.Schema({
    description: String,
    issuedOn:{
        type: Date,
        default: () => new Date(),
    },
    due: {
        type: Date,
        required: true
    },
    amt:{
        type: Number,
        required: true
    },
})

const feeModel = mongoose.model( "Fee", feeSchema )
module.exports = { feeSchema, feeModel }