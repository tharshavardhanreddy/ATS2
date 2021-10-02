const express= require('express');
const roleController= require('../controller/role')
const { authorize,protect }= require('../middleware/user')
const adminRouter=require('./admin')
const roleRouter= express.Router();
roleRouter.use('/assignRole/:roleid/user/:id',adminRouter)
roleRouter.post('/createRole',protect,authorize(["ADMIN"]),roleController.createRole)
roleRouter.get("/listRoles",protect,authorize(["ADMIN"]),roleController.ListRole)


module.exports= roleRouter;