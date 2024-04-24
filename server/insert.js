// const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost:27017/etlabs")

// const { feeModel: Fee } = require("./models/Fee")
// const { userModel: User } = require("./models/User")

// async function main(){
//     const sridev = await User.findOne({username:"Sridev"})
//     // const fee = await Fee.create({
//     //     amt : 10000,
//     //     description:"Exam fee",
//     //     due : new Date(2024,5,13)
//     // })
//     const fee = await Fee.findOne({ amt:20000})
//     console.log( fee )
//     // await fee.save()
//     sridev.dues.push( fee )
//     await sridev.save()
// }

// main()