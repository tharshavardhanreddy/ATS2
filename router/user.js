const express= require('express');
const userRouter= express.Router();
const userInstance= require('../controller/user')

userRouter.post("/register",userInstance.UserSignUp)



module.exports= userRouter;