const express= require('express');
const moduleRouter= express.Router();
const {protect,authorize}= require("../middleware/user");
const  moduleController= require("../controller/module")

moduleRouter.post("/addModule",moduleController.addModule);
moduleRouter.get("/viewModules",moduleController.viewModules);


module.exports= moduleRouter;