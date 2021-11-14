const express= require('express');
const adminRouter= express.Router({mergeParams:true});
const {protect,authorize}=require('../middleware/user');
const adminController=require('../controller/admin')

adminRouter.get("/users",protect,adminController.getUsers)
adminRouter.put('/firstApproval',protect,authorize({type:"WRITE",module:"User Management"}),adminController.firstApproval)
adminRouter.put('/secondApproval',protect,authorize({type:"WRITE",module:"User Management"}),adminController.secondApproval)
adminRouter.put("/",protect,authorize({type:"WRITE",module:"User Management"}),adminController.assignRoleToUser)

module.exports=adminRouter