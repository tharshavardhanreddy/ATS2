const mongoose= require('mongoose');

const userschema = mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    emailVerifyCode:String,
    emailVerifed:{
         type:Boolean,
         enum:[true,false],
         default:false
    },
    roleApplied:{
        type: String,
        enum: ["JOBSEEKER", "COMPANY","ADMIN","INTERNAL-RECRUITER","FREELANCE-RECRUITER","INTERN","OTHER"],
         required:true
    },
    homePhone:String,
    officePhone:String,
    fax:String,
    otherEmail:String,
    role:{
        type: String,
        enum: ["JOBSEEKER", "COMPANY","ADMIN","INTERNAL-RECRUITER","FREELANCE-RECRUITER","INTERN","OTHER"],
        default: "OTHER"
    },
    userVerified:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    credVerified:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    title:String,
    department:String,
    signature:String,
    country:String,
    city:String,
    state:String,
    postalCode:String,
    streetAddress:String,
    password:String

});

userschema.indexes({ phonenumber: 1,email:1 }, { unique: true, sparse: true })
userschema.pre('save', function () {

})


module.exports = mongoose.model("User", userschema);