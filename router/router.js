const express = require('express');
const UserRouter= require('./user');
const ModuleRouter= require('./module');
const PermissionRouter= require('./permission')
const AdminRouter=require('./admin')
const router = express.Router();

router.use("/user",UserRouter);
router.use("/module",ModuleRouter)
router.use("/permission",PermissionRouter);
router.use("/admin",AdminRouter);



module.exports= router;