app = require("express")()

PORT = 8080

ROLES = { 
    STUDENT : "student",
    ADMIN : "admin",
    PARENT: "parent"
}

const users = [{
    username : "Sridev",
    pwd : "student123",
    role : ROLES.STUDENT
},{
    username : "Romana",
    pwd : "admin123",
    role : ROLES.ADMIN
},{
    username : "Smitha",
    pwd : "parent123",
    role : ROLES.PARENT
}]

app.use("/students", require("./routes/students.js"))
app.use("/parents" , require("./routes/parents.js") )
app.use("/admin"   , require("./routes/admin.js")   ) 

app.post( "/login", ( req, res ) => {
    const username = req.body.username
    const finding = users.find( user => user.username == user ) 
    if( finding ){
        if( finding.pwd == req.body.pwd ){
            res.status(200)//successfull
            const username = finding.username
            const role = finding.role
            const token = "sampletoken123"
            res.json({ username, role, token }) 
            return
        }
        return res.status(401)//unauthorized
    }
    return res.status( 404 )//not found
})



app.listen( PORT, () => {
    console.log("Serve listening on port "+ PORT )
})