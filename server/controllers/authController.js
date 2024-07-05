const axios = require("axios")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const { OAuth2Client, auth } = require("google-auth-library")

mongoose.connect('mongodb://localhost:27017/etlabs')
const { userModel: Users } = require("./../models/User")
const { ROLES } = require("../enums/roles")

const REFRESH_AGE = 60 * 60 * 24 * 7;    // 7 days
const ACCESS_AGE  = 60 * 2;              // 2 mins
const SALT = Number(process.env.SALT) || 10 ;

var refreshTokens = [];

const authUser = ( req, res, next ) => {
    const authHeader = req.headers["authorization"]
    const accessToken = authHeader && authHeader.split(' ')[1]
    if( accessToken == null ) return res.sendStatus(401) ;

    jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
        if( err ) return res.sendStatus(403) ;
        req.user = user
        next()
    })
}

const handleLogin =  async ( req, res ) => {
    const email = req.body.email
    const found = await Users.findOne({ email }) 
    
    if( found ){
        const pwd = req.body.pwd
        if( bcrypt.compareSync( pwd, found.pwd) ){
            const message = "Login successfull"
            const redirect = `/${found.role}/dashboard`

            const user = {
                id    : found.id   ,
                name  : found.name ,
                email : found.email,
                role  : found.role ,
            } 

            const accessToken  = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET , { expiresIn : ACCESS_AGE  })
            const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET, { expiresIn : REFRESH_AGE })
            
            res.status(200)
            .cookie( "rft", refreshToken, { 
                httpOnly: true, 
                sameSite : "None",
                secure : true ,
                maxAge: REFRESH_AGE
            })
            .json({ accessToken, message, redirect }) 
            
            refreshTokens.push( refreshToken )
            console.log(`User logged in ${found.id}`)
            return 
        }
        return res.sendStatus(401)//unauthorized "Incorrect password"
    }
    return res.sendStatus( 404 )//not found "User not found"
}

const generateOAuthUrl = async ( req, res ) => {
    res.header('Access-Control-Allow-Origin','http://localhost:5173');
    res.header('Referrer-Policy','no-referrer-when-downgrade');

    const redirectUrl = 'http://localhost:8080/auth/google/cb' ;

    const authClient = new OAuth2Client(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        redirectUrl
    )
    const authUrl = authClient.generateAuthUrl({
        access_type : "offline",
        scope : [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'openid'
          ],
        prompt : "consent"
    })

    res.json({ redirect : authUrl })
}

const handleOAuthCallback = async ( req, res ) => {
    const code = req.query.code;
    const redirectUrl = 'http://localhost:8080/auth/google/cb' ;
    try{
        const authClient = new OAuth2Client(
            process.env.OAUTH_CLIENT_ID,
            process.env.OAUTH_CLIENT_SECRET,
            redirectUrl
        );
        const { tokens } = await authClient.getToken( code );
        await authClient.setCredentials(tokens);
        const user = authClient.credentials ;

        const ticket = await authClient.verifyIdToken({ idToken: user.id_token, audience: process.env.OAUTH_CLIENT_ID });
        const payload = ticket.getPayload();
        
        email = payload.email
        const found = await Users.findOne({ email })  
    
        if( found ){
            const message = "Login successfull"

            const user = {
                id    : found.id   ,
                name  : found.name ,
                email : found.email,
                role  : found.role ,
            } 

            // const accessToken  = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET , { expiresIn : ACCESS_AGE  })
            const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET, { expiresIn : REFRESH_AGE })
            
            res.status(200)
            .cookie( "rft", refreshToken, { 
                httpOnly: true, 
                sameSite : "None",
                secure : true ,
                maxAge: REFRESH_AGE
            })
            .redirect( `http://localhost:5173/refresh?url=/${found.role}/profile` )
            
            refreshTokens.push( refreshToken )
            console.log(`User logged in ${found.id}`)
            return 
        }
        return res.sendStatus( 404 )

    }catch( err ){
        console.log(err);
        res.sendStatus(500);
    }
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
            jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, data ) => {
                if( err ){
                    console.log(err)
                    return res.sendStatus(403);
                }

                const { iat, exp, ...user } = data
                
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

module.exports = { authUser, handleLogin, generateOAuthUrl, handleLogout, refreshToken, handleOAuthCallback }