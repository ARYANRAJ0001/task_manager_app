const express=require("express");
const{signupUser,loginUser,logoutUser}=require("../controllers/authcontroller.js");
const authMiddleware=require("../middleware/authmiddleware.js");
const router=express.Router();
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",authMiddleware,logoutUser);
module.exports=router;