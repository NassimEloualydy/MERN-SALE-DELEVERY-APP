const {signInUser,login}=require("../controllers/userController");
const Router=require("express").Router();
Router.post("/signInUser",signInUser);
Router.post("/login",login);
module.exports=Router