const express= require('express');
const locationRouter= express.Router();
const locationController= require('../controller/location');

locationRouter.post('/createskill',locationController.addLocation);
locationRouter.get('/getskills',locationController.viewLocations)


module.exports= locationRouter;