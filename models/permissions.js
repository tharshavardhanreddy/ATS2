const mongoose= require('mongoose');

const permissionSchema = mongoose.Schema({

moduleType:{
    type:String,
    
},
permission:String

});




module.exports = mongoose.model("Permission", permissionSchema);