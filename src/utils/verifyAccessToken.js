const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');



const accessTokenvalidator = asyncHandler(async (req,res,next)=>{
    let authHeader = req.headers.authorization || req.headers.Authorization
     if(authHeader && authHeader.startsWith('Bearer')){
        const token= authHeader.split(" ")[1];
        const privateKey= process.env.ACCESS_TOKEN_SECERT
        if(token && privateKey){
            jwt.verify(token,privateKey, (err,decoded)=>{
                if(err){
                    res.status(401)
                    throw new Error("user is not Autorized");
                }
               req.payload = decoded
                next()
             } )
        }
        if(!token || !privateKey){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
     }
     else{
        res.status(401);
        throw new Error("User is not authorized or token is missing");
     }
})
module.exports = accessTokenvalidator