const response= require('../utils/Response');
const log = require('../utils/bunyanLogger');
const Module= require("../models/module")

class ModuleController{

    async addModule(req,res,next){
        try {
              const module=await Module.create(req.body);
            response.successReponse({status:200,result:module,res})
        } catch (error) {
            response.errorResponse({status:400,result:error.message,res,errors:error.stack})
        }

    }
    async viewModules(req,res,next){
        try {
              const module=await Module.find({},'-_id -__v');
            response.successReponse({status:200,result:module,res})
        } catch (error) {
            response.errorResponse({status:400,result:error.message,res,errors:error.stack})
        }

    }
}

const moduleController= new ModuleController();
module.exports=moduleController

