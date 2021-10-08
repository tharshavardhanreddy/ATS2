const express= require('express');
const roleController= require('../controller/role')
const { authorize,protect }= require('../middleware/user')
const adminRouter=require('./admin')
const roleRouter= express.Router();
roleRouter.use('/assignRole/:roleid/user/:userid',adminRouter)
roleRouter.post('/createRole',roleController.createRole)
roleRouter.get("/listRoles",roleController.ListRole)
roleRouter.put("/editRolePermission",roleController.editRolePermissions)


module.exports= roleRouter;