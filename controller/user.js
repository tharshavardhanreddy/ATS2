const log = require('../utils/bunyanLogger');
const User= require('../models/user');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken')
const {verifyemail}= require('../utils/mailcontent')
const response= require('../utils/Response')

class UserClass{

    async UserSignUp(req,res,next){
        try {
         const input= req.body;
         log.info({module:'User'},input)
         input.role=["OTHER"]
         
           
            if(input.password!==input.confirmpassword){
                throw new Error("Password and ConfirmPassword must match")
            }
            const emailVerifyCode= Math.floor(100000 + Math.random() * 900000);
            input.emailVerifyCode= emailVerifyCode;
            const salt= await bcrypt.genSalt(10);
            input.password=  await bcrypt.hash(input.password,salt);
            const newUser=await User.create(input);
            log.info({module:"User"},newUser)
            await verifyemail(input.email,emailVerifyCode);
            response.successReponse({status:201,result:newUser,res})
          
          
        } catch (error) {
            response.errorResponse({status:400,result:error.message,res,errors:error.stack})
        }
    }

    async UserLogin(req,res,next){
        try {
            const {email,password}= req.body;
              if(!email ||!password){
                  throw new Error("Email or Password Not provided")
              }
              const user= await User.findOne({email});
              if(!user){
                  throw new Error(`User with email ${email} does not exist`)
              }
              const comparePassword= await bcrypt.compare(password,user.password);
              if(!comparePassword){
                  throw new Error("Incorrect Password")
              }
              const token= jwt.sign({ id: user._id }, 
                process.env.sharedkey, 
                { expiresIn: process.env.tokenExpiry });
                const updatedUser= await User.findByIdAndUpdate({_id:user._id},{token},{ new:true,runValidators:true,fields:{password:0,__v:0,_id:0}});
                response.successReponse({status:200,result:updatedUser,res})
        } catch (error) {
            response.errorResponse({status:400,result:error.message,res,errors:error.stack})
        }
    }
}


const userInstance= new UserClass();
module.exports= userInstance;