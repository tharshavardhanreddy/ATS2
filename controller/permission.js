const Permission= require('../models/permissions');
const response = require('../utils/Response');
const log = require('../utils/bunyanLogger');

class PermissionController{

    async ListPermissions(req,res,next){
        try {
            if(!req.query.moduleName){
                throw new Error("ModuleName is required")
            }
            const module= req.query.moduleName;
            const permissions= await Permission.find({moduleType:module});
            response.successReponse({ status: 200, result: { permissions }, res })
        } catch (error) {
            response.errorResponse({ status: 400, result: error.message, res, errors: error.stack })
        }
    }
}

const permission= new PermissionController();
module.exports= permission;