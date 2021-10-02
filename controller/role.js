const response = require('../utils/Response');
const log = require('../utils/bunyanLogger');
const Roles= require('../models/role');
const Permission= require('../models/permissions')

class Role{
    constructor(){}

    async createRole(req,res,next){
       try {
        const rolePresent=await Roles.findOne({roleName:req.body.roleName});
        if(rolePresent){
            throw new Error("Role with this title already exists")
        }
        const PermissionExists=[]
        //remove duplicates
        const permissions=[...new Set(req.body.permissions)];
        await Promise.race(permissions.map(async permission=>{
              const permissionExists= await Permission.findById(permission);
               if(!permissionExists){
                   PermissionExists.push(false);
               } 
        }));
        if(PermissionExists.includes(false)){
            throw new Error("One or more Permissions do not exist or have been deleted");
        }
          const createdRole= await Roles.create({roleName:req.body.roleName,permissions})
                       
        response.successReponse({ status: 201, result: createdRole, res })
       } catch (error) {
        response.errorResponse({ status: 400, 
            result: error.message, 
            res, errors: error.stack })
       }

    }
    async ListRole(req,res,next){
        try {
            
        } catch (error) {
            
        }
    }
}


const roleInstance= new Role();
module.exports= roleInstance;