const {signInUser,login,logOut,updateMyAccount}=require("../controllers/userController");
const Router=require("express").Router();
const {auth}=require("../middleware/auth")
Router.post("/signInUser",signInUser);
Router.post("/login",login);
Router.post("/logOut",auth,logOut);
Router.post("/updateMyAccount",auth,updateMyAccount)
module.exports=Router