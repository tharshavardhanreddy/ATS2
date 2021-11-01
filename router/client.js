const express= require('express');
const clientRouter= express.Router();
const clientController= require('../controller/client')

clientRouter.post("/",clientController.createClient);
clientRouter.get("/",clientController.listClient);



module.exports=clientRouter