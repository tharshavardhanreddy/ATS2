const express= require('express');

const { authorize,protect }= require('../middleware/user');
const Requirement= require('../controller/requirements')

const requirementRouter= express.Router();

requirementRouter.post("/createRequirement",protect, authorize({permissionType:"WRITE",moduleName:"Requirements"}),Requirement.createRequirement);
requirementRouter.get("/listRequirement",protect, authorize({permissionType:"READ",moduleName:"Requirements"}),Requirement.listRequirement);
// requirementRouter.post("/singleRequirement",protect, authorize({permissionType:"READ",moduleName:"Requirements"}),Requirement.SingleRequirementDetails);
requirementRouter.post("/singleRequ",protect, authorize({permissionType:"READ",moduleName:"Requirements"}),Requirement.SingleRequDetails);



module.exports= requirementRouter