const ClientModel= require("../models/client");
const response = require('../utils/Response');
class Client{
    constructor(){

    }

    async createClient(req,res,next){
        try {
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
            const clientList= await ClientModel.find(req.body);
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