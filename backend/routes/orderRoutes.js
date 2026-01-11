const express=require("express")
const Router=express.Router()
const {auth}=require("../middleware/auth")
const {addOrder}=require("../controllers/orderControllr")
Router.post('/addOrder',auth,addOrder)
module.exports=Router