const express = require("express");

const app = express();

app.use(express.json());

app.post("/simple",function(req,res,next){
    let data = req.body;
    let length = Object.keys(data).length;
    if(length == 0){
        res.send("kindly enter data in body");
    }
    else{
        next();
    }
})

app.post("/simple",function(req,res){
    console.log("data",req.body);
    res.status(200).send("hello from post 2");//status 200 means success
})

app.listen(3000,function(){
    console.log("server started at port 3000");
})