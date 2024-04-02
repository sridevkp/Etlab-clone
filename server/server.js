const cors = require("cors")
const express = require("express")
const app= express()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require("jsonwebtoken")

app.use( cors() )
app.use( express.json())

PORT = 8080
SALT = 8

const refreshTokens = []

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
    pwd : bcrypt.hashSync("parent123",SALT),
    role : ROLES.PARENT
}]

app.use("/students", authUser, require("./routes/students.js"))
app.use("/parents" , authUser, require("./routes/parents.js") )
app.use("/admin"   , authUser, require("./routes/admin.js")   ) 


function authUser( req, res, next ){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if( token == null ) return req.sendStatus(401) ;

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
        if( err ) return res.sendStatus(403) ;
        req.user = user
        next()
    })
}

app.post( "/login", ( req, res ) => {
    const username = req.body.username
    const finding = users.find( user => user.username.toLowerCase() == username.toLowerCase() ) 
    
    if( finding ){
        const pwd = req.body.pwd
        if( bcrypt.compareSync( pwd, finding.pwd) ){
            
            const username = finding.username
            const role = finding.role
            const message = "Login successfull"
            const redirect = `/${role}/dashboard`
            const token = generateToken({ username })
            const refreshToken = jwt.sign( {username}, process.env.REFRESH_TOKEN_SECRET )

            res.status(200)
            .json({ username, role, token, refreshToken, message, redirect }) 

            return
        }
        return res.sendStatus(401)//unauthorized
                // .send({ message : "Incorrect password"})
    }
    return res.sendStatus( 404 )//not found
            // .send({ message : "User not found"})
})

app.delete("/logout", ( req, res ) => {
    
})

app.post("/token", ( req, res ) => {
    const refreshToken = req.body.token
    if( refreshToken ){
        if( refreshTokens.includes( refreshToken )){
            return jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {
                if( err ) return res.sendStatus(403);
                const token = generateToken( { username: user.username } )
                return res.json({ token })
            })
        }
        return res.sendStatus(403)
    }
    res.sendStatus(401)
})
app

function generateToken(user){
    return jwt.sign( user , process.env.ACCESS_TOKEN_SECRET , { expiresIn : 60*15 })
}

app.listen( PORT, () => {
    console.log("Serve listening on port "+ PORT )
})