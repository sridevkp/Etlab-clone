const cors = require("cors")
const express = require("express")
const app = express()
require('dotenv').config()
var cookieParser = require('cookie-parser')
const { credentials, corsOptions } = require("./controllers/credentials.js")
const { authUser } = require("./controllers/authController.js")

const PORT = process.env.PORT || 8080

app.use( credentials )
app.use(cors(corsOptions))
app.use( cookieParser() )
app.use( express.json() )

app.use("/auth", require("./routes/auth.js"))

app.use( authUser )
    .use("/fees", require("./routes/fees.js"))
    .use("/users", require("./routes/users.js"))
    .use("/students", require("./routes/students.js"))
    .use("/parents" , require("./routes/parents.js") )
    .use("/admins"   , require("./routes/admin.js")   ) 




app.listen( PORT, () => {
    console.log("Server listening on port "+ PORT )
})