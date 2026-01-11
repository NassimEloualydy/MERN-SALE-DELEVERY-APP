const mongoose=require("mongoose")
const {ObjectId}=require("mongoose").Schema
const OrderSchema=mongoose.Schema({
    product:{type:ObjectId,ref:"Product",required:true},
    user:{type:ObjectId,ref:"User",required:true},
    state:{type:String,required:true},
    is_paid:{type:Boolean,required:true},
    is_delevered:{type:Boolean,required:true},
    qty:{type:String,required:true},
    price_totale:{type:String,required:true}
},{timestamps:true})
module.exports=mongoose.model("Order",OrderSchema)
