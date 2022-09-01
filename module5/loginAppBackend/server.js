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
// module.exports = "Cgd8lbLa5BkNVDVb";this is the password which is present in the secrets

app.post("/signup", async function(req,res){
    try{
        let data = req.body;
        console.log(data);
         let newUser = await userModel.create(data);
    
        res.json({
            message:"data received",
            
        })
    
    }
   catch(err){
    
    res.send(err.message);
   }
})


app.post("/login",async function(req,res){
    try{
        let data = req.body;
        let{email,password} = data;
        if(email && password)
        {
            let user = await userModel.findOne({email:email});
            if(user){
                if(user.password == password){
                    res.send("User logged in ");
                }
                else{
                    res.send("email or password does not exist");
                }
            }
            else{
                res.send("user with this email does not exist .kindly sign up");
            }
        }
        else{
            res.send("Kindly enter email and password both");
        }
        
    }
    catch(err){
        console.log(err.message);
    }
})



app.listen(3000,function(req,res){
    console.log("server started at 3000")
})