const {signInUser,login,logOut,updateMyAccount,getPhoto}=require("../controllers/userController");
const Router=require("express").Router();
const {auth}=require("../middleware/auth")
Router.post("/signInUser",signInUser);
Router.post("/login",login);
Router.post("/logOut",auth,logOut);
Router.post("/updateMyAccount",auth,updateMyAccount)
Router.get("/getPhoto/:_id",getPhoto)
module.exports=Router