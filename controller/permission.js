const Permission= require('../models/permissions');
const response = require('../utils/Response');
const log = require('../utils/bunyanLogger');
const Modules= require('../models/module')

async function checkModuleExistance(val){
  
    const result=[]
    await Promise.all(val.map( async item=>{
         const module=await Modules.findOne({moduleName:item});
         if(!module){
             result.push(false);
         }else{
             result.push(true)
         }
    }));
    if(result.includes(false)){
        return false
    }
      return true

}

class PermissionController{

    async ListPermissions(req,res,next){
        try {
           
            const module= req.query.moduleName;
            const permissions= await Permission.find().select('-id -__v');
            response.successReponse({ status: 200, result: { permissions }, res })
        } catch (error) {
            response.errorResponse({ status: 400, result: error.message, res, errors: error.stack })
        }
    }
    async createPermission(req,res,next){
        try {
            const permissionExists= await Permission.findOne({permissionName:req.body.permissionName});
            if(permissionExists){
                throw new Error('Permission already exists')
            }
            let moduleNames=req.body.modules;
            let finalModules=[]
            moduleNames= [...new Set(moduleNames)];
            const modulesExist=await checkModuleExistance(moduleNames);
              if(!modulesExist){
                  throw new Error("All the modules specfied do not exist. Please review")
              }
            const newPermission= await Permission.create({
                permissionName:req.body.permissionName,
                permissionType:req.body.permissionType,
                 moduleTypes:moduleNames});
             response.successReponse({ status: 200, result: newPermission, res })
        } catch (error) {
            response.errorResponse({ status: 400, result: error.message, res, errors: error.stack })
        }
    }
    async addModulesToPermission(req,res,next){
       try {
        const permissionExists= await Permission.findOne({permissionName:req.body.permissionName});
        if(!permissionExists){
            throw new Error('Permission does not exist')
        }
          const moduleexists= await checkModuleExistance([req.body.moduleName]);
            if(!moduleexists){
                throw  new Error('Specified Module does not exist')
            }
           const updatedPermission= await Permission.findOneAndUpdate({permissionName:req.body.permissionName },{
               $addToSet:{
                   moduleTypes:req.body.moduleName                
                   
               }
           },{new:true,runValidators:true});
           response.successReponse({ status: 200, result: updatedPermission, res })
       } catch (error) {
        response.errorResponse({ status: 400, result: error.message, res, errors: error.stack })
       }
    }
    async removeModulesFromPermission(req,res,next){
        try {
            const permissionExists= await Permission.findOne({permissionName:req.body.permissionName});
            if(!permissionExists){
                throw new Error('Permission does not exist')
            }
              const moduleexists= await checkModuleExistance([req.body.moduleName]);
                if(!moduleexists){
                    throw  new Error('Specified Module does not exist')
                }
               const updatedPermission= await Permission.findOneAndUpdate({permissionName:req.body.permissionName, },{
                   $pull:{
                       moduleTypes:req.body.moduleName                
                       
                   }
               },{new:true,runValidators:true});
               response.successReponse({ status: 200, result: updatedPermission, res })
           } catch (error) {
            response.errorResponse({ status: 400, result: error.message, res, errors: error.stack })
           }
    }
}

const permission= new PermissionController();
module.exports= permission;