const mongoose = require("mongoose")

const { userSchema: User } = require("./User")

const classSchema = new mongoose.Schema({
    class_name : {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        default: () => new Date().getFullYear(),
    },
    faculty: [User],
    members: [User]

})

    const classModel = mongoose.model( "Class", classSchema )
module.exports = classModel