const cors = require("cors")
const express = require("express")
const app = express()
require('dotenv').config()
var cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')

const { authUser } = require("./controllers/authController.js")

const PORT = process.env.PORT || 8080
const SALT = Number(process.env.SALT) || 10

app.use( cors() )
app.use( cookieParser() )
app.use( express.json() )


ROLES = { 
    STUDENT : "students",
    ADMIN : "admins",
    PARENT: "parents"
}

const users = [{
    username : "Sridev",
    pwd : bcrypt.hashSync("student123", SALT ),
    role : ROLES.STUDENT
},{
    username : "Romana",
    pwd : bcrypt.hashSync("admin123", SALT),
    role : ROLES.ADMIN
},{
    username : "Smitha",
    pwd : bcrypt.hashSync("parent123", SALT),
    role : ROLES.PARENT
}]

app.use("/auth", require("./routes/auth.js"))

app.use( authUser )
    .use("/students", require("./routes/students.js"))
    .use("/parents" , require("./routes/parents.js") )
    .use("/admin"   , require("./routes/admin.js")   ) 




app.listen( PORT, () => {
    console.log("Serve listening on port "+ PORT )
})