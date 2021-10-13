const express= require('express');
const dotenv= require('dotenv');
const log= require('./utils/bunyanLogger');
const connectDB= require('./config/db')
const router=require('./router/router')
const cors= require('cors');
const {errorResponse}= require('./utils/Response')
const error= require('./middleware/error')
dotenv.config({path:'./config/config.env'});
const app=express();
const port=process.env.PORT ||5000;
connectDB();

app.use(express.json());
const corsOptions = {
    origin: "*",
    methods: ["POST", "GET", "PUT","DELETE"]
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
    // console.log(req.hostname, req.headers, req.path);
 
      try {
        const allowedMethods = ["POST", "GET", "PUT","DELETE"];
        if (!allowedMethods.includes(req.method)) {
            // errorResponse({ status: 400, result: `${req.method} method is not allowed`, res })
            throw "not allowed"
    
        }
      } catch (error) {
        errorResponse({ status: 400, result: `${req.method} method is not allowed`, res })
      }
    next();
});

app.use("/api/v1",router);
app.use(error)
app.use((req,res,next)=>{
  
  errorResponse({status:404,result:"Requested resource not found",res})
})



app.listen(port,()=>{
    log.info({module:'index'},`Server started on port ${port}`)
})


