const express=require("express")
const Router=express.Router()
const {auth}=require("../middleware/auth")
const {submitProduct,getSallers,getdata,getPhotoImage,deleteProduct}=require("../controllers/productController")
Router.post("/submitproduct",auth,submitProduct);
Router.post("/getSallers",auth,getSallers);
Router.post("/getdata",auth,getdata)
Router.get("/getPhotoImage/:photo_number/:_id",getPhotoImage)
Router.post("/deleteProduct/:_id",auth,deleteProduct);
module.exports=Router
