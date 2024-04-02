const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const refreshTokens = []

const authUser = ( req, res, next ) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if( token == null ) return req.sendStatus(401) ;

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
        if( err ) return res.sendStatus(403) ;
        req.user = user
        next()
    })
}

const handleLogin =  ( req, res ) => {
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
            .cookie( "rft", refreshToken, { httpOnly: true, maxAge: 24 *60 *60 *1000})
            .json({ username, role, token, message, redirect }) 
            
            return
        }
        return res.sendStatus(401)//unauthorized
                // .send({ message : "Incorrect password"})
    }
    return res.sendStatus( 404 )//not found
            // .send({ message : "User not found"})
}
const generateToken = (user) => {
    return jwt.sign( user , process.env.ACCESS_TOKEN_SECRET , { expiresIn : 60*15 })
}

const handleLogout = ( req, res ) => {
    const cookies = req.cookies
    if( !cookies?.rft ) return res.sendStatus( 204 )//no content
    
    const refreshToken = cookies.rft
    console.log("logged out", refreshToken)

    res.clearCookie("rft", { httpOnly: true })
    if( ! removeToken( refreshToken )){
        return res.sendStatus( 204 )
    }
    return res.sendStatus(200)
}

const refreshToken = ( req, res ) => {
    const cookies = req.cookies
    if( !cookies?.rft ) return res.sendStatus( 401 )

    const refreshToken = cookies.rft
    console.log( "refreshed ",refreshToken )
    if( refreshTokens.includes( refreshToken )){
        return jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {
            if( err ) return res.sendStatus(403);
            const token = generateToken( { username: user.username } )
            return res.json({ token })
        })
    } 
    return res.sendStatus(403)
}

function removeToken( token ){
    const index = refreshTokens.indexOf( token )
    if( index != -1 ){
        return refreshTokens.splice( index, 1)
        
    }
    return false
}
module.exports = { authUser, handleLogin, handleLogout, refreshToken, generateToken }