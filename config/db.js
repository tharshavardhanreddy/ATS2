const log= require('../utils/bunyanLogger')
const mongoose = require('mongoose')
global.mongoose = mongoose;



const connectdb = async () => {
    try {
       log.info({module:"DB"},'connecting db') 
     await mongoose.connect(`mongodb+srv://${process.env.mongouser}:${process.env.mongopassword}@box-test.ocogl.mongodb.net/SellcraftCRM?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        
        useUnifiedTopology: true,
    });


        log.info({module:"DB"},'MongoDB connected')
     

    } catch (error) {
        log.error({module:"DB"},'error connecting db')
        log.error({module:"DB"},error.message)

    }

}
module.exports = connectdb;