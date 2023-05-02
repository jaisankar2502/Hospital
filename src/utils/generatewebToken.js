const jwt = require('jsonwebtoken')
const UserToken= require('../models/usertokenModel');
  

const generateToken =  async(employee)=>{
    try {
        let time = Math.floor(Date.now() / 1000) + (60 * 60)
        const payload = {employeename: employee.employeename,employeeemail: employee.employeeemail,_id: employee._id,time:time}
        const accessToken= jwt.sign(payload,process.env.ACCESS_TOKEN_SECERT,{expiresIn:"14m"})
        const refreshToken= jwt.sign(payload,process.env.REFRESH_TOKEN_SECERT,{expiresIn:"30d"})
        const userToken = await UserToken.findOne({userId:employee._id})
        if (userToken){
        await UserToken.deleteOne({userId:employee._id});
        }
         await UserToken.create({userId:employee._id,token:refreshToken});
         return {accessToken,refreshToken}
        }
        catch (error) {

         return error;   
        
    }
    

}
module.exports= generateToken;