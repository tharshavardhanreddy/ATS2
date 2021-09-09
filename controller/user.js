const log = require('../utils/bunyanLogger');
const User= require('../models/user');
const bcrypt= require('bcryptjs')
const {verifyemail}= require('../utils/mailcontent')
const response= require('../utils/Response')

class UserClass{

    async UserSignUp(req,res,next){
        try {
         const input= req.body;
          log.info({module:"User"},input)
            //  if(!input.hasOwnProperty('firstname') ||!input.hasOwnProperty('lastname')|| !input.hasOwnProperty('email')||!input.hasOwnProperty('mobile') ||!input.hasOwnProperty('password')||!input.hasOwnProperty('confirmpassword')|| !input.hasOwnProperty('appliedrole')){
            //      throw new Error("FirstName, LastName,Email,Password,ConfirmPassword & AppliedRole are mandatory fields")
            //  }
            if(input.password!==input.confirmpassword){
                throw new Error("Password and ConfirmPassword must match")
            }
            const emailVerifyCode= Math.floor(100000 + Math.random() * 900000);
            input.emailVerifyCode= emailVerifyCode;
            const salt= await bcrypt.genSalt(10);
            input.password=  await bcrypt.hash(input.password,salt);
            await verifyemail(input.email,emailVerifyCode);
            const newUser=await User.create(input);
            response.successReponse({status:201,result:newUser,res})
          
          
        } catch (error) {
            response.errorResponse({status:400,result:error.message,res,errors:error.stack})
        }
    }
}


const userInstance= new UserClass();
module.exports= userInstance;