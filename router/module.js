const express= require('express');
const moduleRouter= express.Router();
const {protect,authorize}= require("../middleware/user");
const  moduleController= require("../controller/module")

moduleRouter.post("/addModule",protect,authorize("ADMIN"),moduleController.addModule);
moduleRouter.get("/viewModules",protect,authorize("ADMIN"),moduleController.viewModules);


module.exports= moduleRouter;