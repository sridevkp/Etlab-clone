const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const { OAuth2Client } = require("google-auth-library")

mongoose.connect('mongodb://localhost:27017/etlabs')
const { userModel: Users } = require("./../models/User")

const REFRESH_AGE = 60 * 60 * 24 * 7;
const ACCESS_AGE = 60 * 5;
const SALT = Number(process.env.SALT) || 10 ;
var refreshTokens = [];

ROLES = { 
    STUDENT : "students",
    ADMIN : "admins",
    PARENT: "parents"
}

const authUser = ( req, res, next ) => {
    const authHeader = req.headers["authorization"]
    const accessToken = authHeader && authHeader.split(' ')[1]
    if( accessToken == null ) return res.sendStatus(401) ;

    jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
        if( err ) return res.sendStatus(403) ;
        req.user = user
        console.log(user)
        next()
    })
}

const handleLogin =  async ( req, res ) => {
    const email = req.body.email
    const finding = await Users.findOne({ email }) 
    
    if( finding ){
        const pwd = req.body.pwd
        if( bcrypt.compareSync( pwd, finding.pwd) ){
            const message = "Login successfull"
            const redirect = `/${finding.role}/dashboard`

            const user = {
                id    : finding.id   ,
                name  : finding.name ,
                email : finding.email,
                role  : finding.role ,
            } 

            const accessToken  = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET , { expiresIn : ACCESS_AGE })
            const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET, { expiresIn : REFRESH_AGE } )
            
            res.status(200)
            .cookie( "rft", refreshToken, { 
                httpOnly: true, 
                sameSite : "None",
                secure : true ,
                maxAge: REFRESH_AGE
            })
            .json({ accessToken, message, redirect }) 
            
            refreshTokens.push( refreshToken )
            console.log(`User logged in ${finding.id}`)
            return 
        }
        return res.sendStatus(401)//unauthorized "Incorrect password"
    }
    return res.sendStatus( 404 )//not found "User not found"
}

const handleGoogleLogin = async ( req, res ) => {
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
    
    console.log(`User logged out ${id}`)

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
            jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {
                if( err ){
                    console.log(err)
                    return res.sendStatus(403);
                }
                
                const accessToken = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET , { expiresIn : ACCESS_AGE })
                console.log(`Refreshed token ${user.id}`)
            return res.json({ accessToken })
        })
    }else{
        return res.sendStatus(403)
    }
}

function removeToken( refreshToken ){
    let exist = false
    refreshTokens = refreshTokens.filter( token => { exist = true; return token != refreshToken } )
    return exist
}

module.exports = { authUser, handleLogin, handleGoogleLogin, handleLogout, refreshToken }