//here we need to require express
const express = require("express");

//app signifies your server
const app = express();
app.use(express.json());

let user;
app.get("/",function(req,res){
    res.end("homepage");
})



app.get("/sayhello",function(req,res){
    res.json({
        user:user
    })
})

app.post("/sayHello",function(req,res){
    user = req.body;
    res.json({
        message:"data receive successfully",
        user:user
    })
})

app.patch("/sayHello",function(req,res){
    dataToUpdate = req.body;
    for(key in dataToUpdate){
        user[key] = dataToUpdate[key];
    }
    res.json({
        message:"Data updated",
        user:user
    })
     
})
//delete
app.delete("/sayHello",function(req,res){
    user = {};
    res.json({
        message:"deletion done",
        user:user
    })
})

app.get("/getMultiply/:num1/:num2",function(req,res){
    console.log(req.params);
    
    let num1  = req.params.num1;
    let num2 = req.params.num2;
    let mul = num1 * num2;

    res.end("Multiply of params are"+mul);
})

app.listen(3000,function(){
    console.log("server started at port 3000"); 
})

app.get("/sayBye",function(req,res){
    res.end("Bye");
})