const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    role:{type:String,required:true},
    phone:{type:String,required:true},
    status:{type:String,required:true},
    email:{type:String,required:true},
    pw:{type:String,required:true},

},{timestapms:true})
module.exports=mongoose.Model("User",userSchema);
