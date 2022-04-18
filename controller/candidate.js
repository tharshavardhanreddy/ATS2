
const Candidate= require('../models/candidate');
const log = require('../utils/bunyanLogger');
const response = require('../utils/Response');
const Requirements= require('../models/requirements');
const { convertToObjectID } = require('../utils/misc');
class CandidateClass{

    async createCandidate(req,res,next){
        try {
           const requirementid= await Requirements.findById(convertToObjectID(req.body.RequirementId))
           if(!requirementid){
               throw new Error("Requirement does not exist")
           }
           const existingCandidate= await Candidate.find();
   
           if(existingCandidate){
            throw new Error("Candidate details already exists")
           }
        //    if(existingRequirement.length===0){
        //        req.body.InternalJobCode="SELL-1";
        //    }else{
               
        //        req.body.InternalJobCode=`SELL-${+existingRequirement.reverse()[0].InternalJobCode.split("-")[1]+1}`
        //    }
        //    req.body.AssignedAM=client.AM;
        //    const date= new Date();
        //    req.body.CreatedDate= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
            const candidate= await Candidate.create(req.body)

            response.successReponse({status:201,result:candidate,res})
        } catch (error) {
            error.statusCode=400;
            next(error)
        }
    }
    // async listRequirement(req,res,next){
    //     try {
    //         let requirements,count;
    //         if(req.query.name){
    //              requirements=await Requirements.find({RequirementName:req.query.name}).populate("ClientId","-_id -AM -__v")
    //              count=await Requirements.countDocuments({RequirementName:req.query.name})
    //         }else{

    //              requirements= await Requirements.find().populate("ClientId","-_id -AM -__v")
    //               count= await Requirements.countDocuments();
    //         }
           
    //         response.successReponse({status:200,result:{count,requirements},res})
    //     } catch (error) {
    //         error.statusCode=400;
    //         next(error)
    //     }
    //     }

//         async SingleRequirementDetails(req,res,next){
//             const reqid = req.body.id
//             try {
//             const singlereq = await Requirements.findById(reqid)
//             if(!singlereq){
//                 throw new Error("Requirement not found!")
//             }
//                 response.successReponse({status:200,result:singlereq,res})
//             } catch (error) {
//                 error.statusCode=400;
//                 next(error)
//             }
//             }

//    async changeRequirementStatus(req,res,next){
//        try {
           
//        } catch (error) {
           
//        }

//    }
    

}

const candidateInstance= new CandidateClass();
module.exports= candidateInstance