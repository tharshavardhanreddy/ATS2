const express= require('express');

const { authorize,protect }= require('../middleware/user')
const roleRouter= express.Router();



module.exports= roleRouter;