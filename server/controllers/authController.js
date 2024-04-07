const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const SALT = Number(process.env.SALT) || 10

var refreshTokens = []

ROLES = { 
    STUDENT : "students",
    ADMIN : "admins",
    PARENT: "parents"
}

const users = require("../views/user.json").users

const authUser = ( req, res, next ) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if( token == null ) return res.sendStatus(401) ;

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
        if( err ) return res.sendStatus(403) ;
        req.user = user
        next()
    })
}

const handleLogin =  ( req, res ) => {
    const username = req.body.username
    const usersList = Object.values(users)
    const finding = usersList.find( user => user.username.toLowerCase() == username.toLowerCase() ) 
    
    if( finding ){
        const pwd = req.body.pwd
        if( bcrypt.compareSync( pwd, finding.pwd) ){
            
            const username = finding.username
            const role = finding.role
            const id = finding.id
            const message = "Login successfull"
            const redirect = `/${role}/dashboard`
            const token = generateToken({ username, id })
            const refreshToken = jwt.sign( {username, id }, process.env.REFRESH_TOKEN_SECRET )

            res.status(200)
            .cookie( "rft", refreshToken, { 
                httpOnly: true, 
                sameSite : "None",
                secure : true ,
                maxAge: 24 *60 *60 *1000
            })
            .json({ username, id, role, token, message, redirect }) 
            
            refreshTokens.push( refreshToken )
            return 
        }
        return res.sendStatus(401)//unauthorized "Incorrect password"
    }
    return res.sendStatus( 404 )//not found "User not found"
}

const generateToken = (user) => {
    return jwt.sign( user , process.env.ACCESS_TOKEN_SECRET , { expiresIn : "10s" })
}

const handleLogout = ( req, res ) => {
    const cookies = req.cookies
    if( !cookies?.rft ) return res.sendStatus( 204 )//no content
    
    const refreshToken = cookies.rft

    res.clearCookie("rft", { 
        httpOnly: true,
        sameSite : "None",
        secure : true 
    })
    if( ! removeToken( refreshToken )){
        return res.sendStatus( 204 )
    }
    return res.sendStatus(200)
}

const refreshToken = ( req, res ) => {
    const cookies = req.cookies
    if( !cookies?.rft ) return res.sendStatus( 401 )

    const refreshToken = cookies.rft
    if( refreshTokens.includes( refreshToken )){
        return jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {
            if( err ) return res.sendStatus(403);
            const token = generateToken( { username: user.username, id : user.id } )
            return res.json({ token })
        })
    } 
    return res.sendStatus(403)
}

function removeToken( refreshToken ){
    let exist = false
    refreshTokens = refreshTokens.filter( token => { exist = true; return token != refreshToken } )
    return exist
}

module.exports = { authUser, handleLogin, handleLogout, refreshToken, generateToken }