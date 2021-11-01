const mongoose= require('mongoose');

const clientSchema =  mongoose.Schema({

clientName:String,
location:String,
POCName:String,
POCNumber:String,
POCEmail:String
    

});




module.exports = mongoose.model("Client", clientSchema);