const User=require("../models/User")
const formidable=require("formidable")
const bcrypt=require("bcryptjs")
const fs=require("fs");
const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.signInUser=async (req,res)=>{
    const form=new formidable.IncomingForm()
    form.keepExtentions=true
    form.parse(req,async (err,fields,files)=>{
        const {first_name,last_name,email,pw,phone}=fields;
        var d=await User.find().select("-photo").and({first_name,last_name})
        if(d.length!=0)
            return res.status(400).json({err:"Please the first name and the last name is already exist !!"})
        d=await User.find({email}).select("-photo")
        if(d.length!=0)
            return res.status(400).json({err:"Please the email is already exist !!"})
        d=await User.find({phone}).select("-photo")
        if(d.length!=0)
            return res.status(400).json({err:"Please the phone is already exist !!"})
        const salt=await bcrypt.genSalt(10)
        const hashed_pw=await bcrypt.hash(pw,salt)
        const user=await User.create({
            first_name,last_name,email,phone,status:'Disconnected',role:'Admin',
            pw:hashed_pw,
            photo:{
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        })
        if(user)
            return res.json({message:"Sign in with success !!"})
    })

}
exports.login=async (req,res)=>{
    const {email,pw}=req.body;
    var u=await User.find({email}).select("-photo")
    if(u.length==0)
        return res.status(400).json({err:"Please the email is not found !!"});
    const isPassed=await bcrypt.compare(pw,u[0].pw)
    if(!isPassed)
        return res.status(400).json({err:"Please the password doesn't matched !!"})
    const JWT_SECRETE=process.env.JWT_SECRETE
    const token=await jwt.sign({user:u[0]},JWT_SECRETE,{expiresIn:'30d'})
    const d=await User.findOneAndUpdate(
        {_id:u[0]._id},
        {$set:{
            status:'Connected',
        }},{
            $new:true
        }
    )
    return res.json({token,user:u[0]})
}