const express = require('express');
const UserRouter= require('./user');
const ModuleRouter= require('./module');
const PermissionRouter= require('./permission')
const AdminRouter=require('./admin');
const roleRouter = require('./role');
const clientRouter=require('./client')
const requirementRouter= require('./requirements');
const skillRouter= require('./skill');
const locationRouter= require('./location');


const router = express.Router();

router.use("/user",UserRouter);
router.use("/module",ModuleRouter)
router.use("/permission",PermissionRouter);
router.use("/admin",AdminRouter);
router.use('/role',roleRouter);
router.use("/client",clientRouter);
router.use("/requirement",requirementRouter);
router.use("/skill",skillRouter);
router.use("/location",locationRouter)





module.exports= router;