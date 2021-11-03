const ClientModel= require("../models/client");
const user = require("../models/user");
const log = require("../utils/bunyanLogger");
const response = require('../utils/Response');
class Client{
    constructor(){

    }

    async createClient(req,res,next){
        try {
            const employee= await user.findOne({email:req.body.email})
            const Client= await ClientModel.findOne({clientName:req.body.clientName,location:req.body.location})
               log.info(employee)
            if(!employee|| employee.roleApplied!=="EMPLOYEE"){
                throw new Error("AM not found")
            }
              if(Client){
                  throw new Error("Client Already exists")
              }
            
            req.body.AM= employee._id
             const newClient= await ClientModel.create(req.body);
             response.successReponse({ status: 200, result: newClient, res })
            
        } catch (error) {
            response.errorResponse({
                status: 400,
                result: error.message,
                res, errors: error.stack
            })
        }
    }
    async listClient(req,res,next){
        try {
            const clientList= await ClientModel.find().populate('AM','_id email firstname lastname')
            response.successReponse({ status: 200, result: clientList, res })
           
       } catch (error) {
           response.errorResponse({
               status: 400,
               result: error.message,
               res, errors: error.stack
           })
       }

    }

}

const clientInstance = new Client();
module.exports = clientInstance;