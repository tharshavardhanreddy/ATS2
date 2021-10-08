const express= require('express');
const permission = require('../controller/permission');
const { authorize,protect }= require('../middleware/user')
const permissionRouter= express.Router();

permissionRouter.get("/listPermission",permission.ListPermissions)
permissionRouter.post("/createPermission",permission.createPermission)
permissionRouter.put("/addModuleToPermission",permission.addModulesToPermission)
permissionRouter.put("/removeModuleFromPermission",permission.removeModulesFromPermission)
permissionRouter.delete("/deletePermission",permission.deletePermission)

module.exports= permissionRouter;