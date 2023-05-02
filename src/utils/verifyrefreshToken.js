const UsertokenModel =require( "../models/usertokenModel");
const jwt = require("jsonwebtoken");
const { refreshTokenvalidation } = require("../utils/validationSchema");
const generateToken = require("./generatewebToken");
const asyncHandler = require("express-async-handler");
const verifyRefreshToken = asyncHandler( async (req,res)=>{
    const privateKey= process.env.REFRESH_TOKEN_SECERT;
    const{refreshtoken} =  req.body
    if(!refreshtoken){
        res.status(400)
        throw new Error("Refresh Token require")
    }
    const{error} = await refreshTokenvalidation(req.body);
    if(error){
        res.status(400)
        throw new Error("Refresh Token require")
    }
   
 jwt.verify(refreshtoken,privateKey,async (err,decoded)=>{
    if(err){
        req.status(401)
        throw new Error("Refresh Token is not Autorized");
    } 
    const istoken = await UsertokenModel.findOne({userId:decoded._id,token:refreshtoken})
    if(!istoken){
     res.status(404)
     throw new Error("user is Logout succefully")
    }
    const{ accessToken,refreshToken,error} = await generateToken(decoded)
    if(error){
        res.status(401);
        throw new Error("User is not valid"); 
    }
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken});
   })

});
module.exports= verifyRefreshToken;