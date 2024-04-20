const mongoose = require("mongoose")

const feeSchema = new mongoose.Schema({
    for: String,
    issued_on:{
        type: Date,
        default: () => Date.now(),
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