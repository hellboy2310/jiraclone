const express = require("express");
const app = express();

const userModel = require("./userModel");
app.use(express.json());
//signup input
//name
//password
//confirm password
//email
//phone
//pic

app.post("/signup", async function(req,res){
    try{
        let data = req.body;
        console.log(data);
         let newUser = await userModel.create(data);
    
        res.json({
            message:"data received",
            data:data
        })
    
    }
   catch(err){
    console.log(err.message);
    res.send(err.message);
   }
})




app.listen(3000,function(req,res){
    console.log("server started at 3000")
})