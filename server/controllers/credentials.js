const allowedOrigin = "http://localhost:5173"

const credentials = ( req, res, next ) => {
    const origin = req.headers.origin
    if( allowedOrigin == origin ){
        res.header( "Access-Control-Allow-Credentials", true )
        }
    next()
}
const corsOptions = {credentials: true, origin: allowedOrigin }

module.exports = { credentials, corsOptions } 