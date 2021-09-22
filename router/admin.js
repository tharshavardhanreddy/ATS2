const express= require('express');
const adminRouter= express.Router();
const {protect,authorize}=require('../middleware/user');
const adminController=require('../controller/admin')

adminRouter.get("/users",protect,authorize(["ADMIN"]),adminController.getUsers)
adminRouter.put('/firstApproval',protect,authorize(["ADMIN"]),adminController.firstApproval)
adminRouter.put('/secondApproval',protect,authorize(["ADMIN"]),adminController.secondApproval)


module.exports=adminRouter