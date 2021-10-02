const express= require('express');
const roleController= require('../controller/role')
const { authorize,protect }= require('../middleware/user')
const roleRouter= express.Router();

roleRouter.post('/createRole',protect,authorize(["ADMIN"]),roleController.createRole)

module.exports= roleRouter;