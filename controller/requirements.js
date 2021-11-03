
const Requirements= require('../models/requirements');
const log = require('../utils/bunyanLogger');
const response = require('../utils/Response');
const Client= require('../models/client');
const { convertToObjectID } = require('../utils/misc');
class RequirementClass{

    async createRequirement(req,res,next){
        try {
           
           const client= await Client.findById(convertToObjectID(req.body.ClientId))
           if(!client){
               throw new Error("Client does not exist")
           }
           const existingRequirement= await Requirements.find();
   
           log.info(existingRequirement)
           if(existingRequirement.length===0){
               req.body.InternalJobCode="SELL-1";
           }else{
               
               req.body.InternalJobCode=`SELL-${+existingRequirement.reverse()[0].InternalJobCode.split("-")[1]+1}`
           }
           req.body.AssignedAM=client.AM
            const requirement= await Requirements.create(req.body)

            response.successReponse({status:201,result:requirement,res})
        } catch (error) {
            error.statusCode=400;
            next(error)
        }
    }
    async listRequirement(req,res,next){
        try {
            // const pageNo = +req.query.pageNo || 0;
            // const itemsPerPage = +req.query.itemsPerPage || 10;
            let requirements,count;
            if(req.query.name){
                 requirements=await Requirements.find({RequirementName:req.query.name})
                 count=await Requirements.countDocuments({RequirementName:req.query.name})
            }else{

                 requirements= await Requirements.find()
                  count= await Requirements.countDocuments();
            }
           
            response.successReponse({status:200,result:{count,requirements},res})
        } catch (error) {
            error.statusCode=400;
            next(error)
        }
        }
   async changeRequirementStatus(req,res,next){
       try {
           
       } catch (error) {
           
       }

   }
    

}

const requirementInstance= new RequirementClass();
module.exports= requirementInstance