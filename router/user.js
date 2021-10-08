const express= require('express');
const userRouter= express.Router();
const userInstance= require('../controller/user')
const multer= require('multer')
const upload= multer({dest:'uploads/'})
userRouter.post("/register",userInstance.UserSignUp)
userRouter.post("/login",userInstance.UserLogin);
userRouter.post("/upload",upload.single('requirement'),userInstance.CreateBulk);
userRouter.put("/verifyEmail",userInstance.verifyEmail);
userRouter.get("/getUser",userInstance.getUser)




module.exports= userRouter;