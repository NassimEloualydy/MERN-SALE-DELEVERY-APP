const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    photo_1:{data:Buffer,contentType:String},
    photo_2:{data:Buffer,contentType:String},
    photo_3:{data:Buffer,contentType:String},
    photo_4:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    
})