const mongoose = require("mongoose")


const ROLES = { 
    STUDENT : "students",
    ADMIN : "admins",
    PARENT: "parents"
}

const { examSchema: Exam } = require("./Exam")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: ROLES.STUDENT,

    },
    branch: String,
    batch: Number,
    bio: {
        admission_no: String,
        dob: Date,
        joined: { 
            type: Date,
            default: () => Date.now(),
        },
        gender: String,
        blood_group: String,
        pob: String,
        mother_tongue:String
    },
    parents_details: {
        fathers_name: String,
        fathers_phno: Number,
        mothers_name: String,
        mothers_phno: Number,
        parent_email: String,
    },
    contact_details: {
        phno: Number,
        email:String,
        present_address: {
            pin: Number,
            house_name:String,
            street: String,
            city: String,
            district: String,
            state: String,
        }, 

    },
    results: [{
        exam: Exam,
        subject: String,
        sem:Number,
        marks_obtained: Number,
        max_marks: Number,
        remarks: String,
    }],
    attendance: {
        absent: [{ 
            subject: String,
            hour: Number,
            from: Date,
            to: Date
        }],
        onduty:[{
            subject: String,
            duty: String,
            hour: Number,
            from: Date,
            to: Date 
        }],
    },
    inbox: [{
        from : String,
        date: Date,
        subject: String,
        body: String,
    }]
})

const userModel = mongoose.model( "User", userSchema )
module.exports = { userSchema, userModel }