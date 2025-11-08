const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.auth=async (req,res,next)=>{
    try{

        const token=req.headers.authorization.split(' ')[1]
        const {user}=await jwt.decode(token,process.env.JWT_SECRETE)        

        req.user=user
        next()
    }catch(err){
        return res.status(400).json({err:"User unothrized !!"})
    }

}