const express= require('express');
const adminRouter= express.Router({mergeParams:true});
const {protect,authorize}=require('../middleware/user');
const adminController=require('../controller/admin')

adminRouter.get("/users",protect,authorize(["ADMIN"]),adminController.getUsers)
adminRouter.put('/firstApproval',protect,authorize(["ADMIN"]),adminController.firstApproval)
adminRouter.put('/secondApproval',protect,authorize(["ADMIN"]),adminController.secondApproval)
adminRouter.put("/",protect,authorize(["ADMIN"]),adminController.assignRoleToUser)

module.exports=adminRouter