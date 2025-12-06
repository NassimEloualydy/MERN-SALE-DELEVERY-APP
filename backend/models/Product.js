const mongoose=require("mongoose");
const {ObjectId}=require("mongoose").Schema
const productSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    photo_1:{data:Buffer,contentType:String},
    photo_2:{data:Buffer,contentType:String},
    photo_3:{data:Buffer,contentType:String},
    photo_4:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:String,required:true},
    saller:{type:ObjectId,ref:"User",required:true},
    rating:{type:String,required:true},
    status:{type:String,required:true}  
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema)