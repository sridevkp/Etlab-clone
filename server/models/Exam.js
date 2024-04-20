const mongoose = require("mongoose")

const examSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    starting:{
        type: Date,
        default: () => Date.now(),
    },
    ending: Date,
})

const examModel = mongoose.model( "Exam", examSchema )
module.exports = { examSchema, examModel }