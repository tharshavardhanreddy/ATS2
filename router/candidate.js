const express= require('express');

const { authorize,protect }= require('../middleware/user');
const Candidate= require('../controller/candidate')

const candidateRouter= express.Router();

candidateRouter.post("/createCandidate",protect,authorize({permissionType:"WRITE",moduleName:"Candidate"}),Candidate.createCandidate);
// authorize({permissionType:"WRITE",moduleName:"Candidate"}
candidateRouter.post("/assignedcandidates",protect, authorize({permissionType:"WRITE",moduleName:"Candidate"}),Candidate.assignedCandidates);
// requirementRouter.post("/singleRequirement",protect, authorize({permissionType:"READ",moduleName:"Requirements"}),Requirement.SingleRequirementDetails);


module.exports= candidateRouter