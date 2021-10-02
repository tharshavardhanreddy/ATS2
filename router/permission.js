const express= require('express');
const permission = require('../controller/permission');
const { authorize,protect }= require('../middleware/user')
const permissionRouter= express.Router();

permissionRouter.get("/listPermission",protect,authorize("ADMIN"),permission.ListPermissions)
permissionRouter.post("/createPermission",protect,authorize("ADMIN"),permission.createPermission)
permissionRouter.put("/addModuleToPermission",protect,authorize("ADMIN"),permission.addModulesToPermission)
permissionRouter.put("/removeModuleFromPermission",protect,authorize("ADMIN"),permission.removeModulesFromPermission)

module.exports= permissionRouter;