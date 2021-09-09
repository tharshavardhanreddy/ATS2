const express= require('express');
const dotenv= require('dotenv');
const log= require('./utils/bunyanLogger');
const connectDB= require('./config/db')
const router=require('./router/router')
const cors= require('cors');
const {errorResponse}= require('./utils/Response')
dotenv.config({path:'./config/config.env'});
const app=express();
const port=process.env.PORT ||5000;
connectDB();
app.use(express.json());
const corsOptions = {
    origin: "*",
    methods: ["POST", "GET", "PUT"]
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
    // console.log(req.hostname, req.headers, req.path);
 
    const allowedMethods = ["POST", "GET", "PUT"];
    if (!allowedMethods.includes(req.method)) {
        errorResponse({ status: 400, result: `${req.method} method is not allowed`, res })

    }
    next();
})
app.use("/api/v1",router);



app.listen(port,()=>{
    log.info({module:'index'},`Server started on port ${port}`)
})