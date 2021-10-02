const mongoose= require('mongoose');

const roleSchema=mongoose.Schema({
    roleName:String,
    permissions:[{
        id:mongoose.Schema.Types.ObjectId,
        ref:'Permission',
        require:true
    }]
})

module.exports = mongoose.model("Permission", permissionSchema);