const mongoose= require('mongoose');

const roleSchema=mongoose.Schema({
    roleName:String,
    permissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Permission',
        
    }]
})

module.exports = mongoose.model('Roles',roleSchema);