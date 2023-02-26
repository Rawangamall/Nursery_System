const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose=require("mongoose");
const nurseryRoute=require("./Routes/nurseryRoute");
const loginRoute=require("./Routes/login");
const authenticationMW = require("./Core/auth/authenticationMW");
//server
const server = express();
let port=process.env.PORT||8080;


//db connection
mongoose.set('strictQuery', true);  //warning
mongoose.connect("mongodb://127.0.0.1:27017/ITIDB")
        .then(()=>{
            console.log("DB connected");
            server.listen(port,()=>{
                console.log("server is listenng..🤞",port);
            });
        })
        .catch(error=>{
            console.log("Db Problem "+error);
        })


server.use(cors());

//auth
server.use(morgan("dev"));

//body parse
server.use(express.json());
server.use(express.urlencoded({extended:false}));

//Routes  
server.use(loginRoute);
server.use(authenticationMW);
server.use(nurseryRoute);

server.use((request,response,next)=>{
    response.status(404).json({message:"page not found"})
})
server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});
})
