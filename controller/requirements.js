
const Requirements= require('../models/requirements');
const log = require('../utils/bunyanLogger');
const response = require('../utils/Response');

class RequirementClass{

    async createRequirement(req,res,next){
        try {
           
           
            const requirement= await Requirements.create(req.body);

            response.successReponse({status:201,result:requirement,res})
        } catch (error) {
            error.statusCode=400;
            next(error)
        }
    }
    async listRequirement(req,res,next){
        try {
            const pageNo = +req.query.pageNo || 0;
            const itemsPerPage = +req.query.itemsPerPage || 10;
            const requirements= await Requirements.find().skip(pageNo*itemsPerPage).limit(itemsPerPage)
            const Count= await Requirements.countDocuments();
           
            response.successReponse({status:200,result:{Count,requirements},res})
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