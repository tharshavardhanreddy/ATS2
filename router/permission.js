const express= require('express');
const permission = require('../controller/permission');
const { authorize,protect }= require('../middleware/user')
const permissionRouter= express.Router();

permissionRouter.get("/listPermission",protect,authorize("ADMIN"),permission.ListPermissions)

module.exports= permissionRouter;