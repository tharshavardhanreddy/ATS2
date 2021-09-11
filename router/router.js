const express = require('express');
const UserRouter= require('./user');
const ModuleRouter= require('./module');
const router = express.Router();

router.use("/user",UserRouter);
router.use("/module",ModuleRouter)



module.exports= router;