const express = require("express");
const app = express();
const mailSender = require("./mailSender")

//npm i cookie-parser

const cookieParser = require("cookie-parser");

//npm i jsonwebtoken
var jwt = require('jsonwebtoken');
const secretKey = "ao98rey3hiaueir49";


app.use(cookieParser());


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
            console.log(user);
            if(user){
                if(user.password == password){
                    const token = jwt.sign({data:user['_id']},secretKey);
                    console.log(token);
                    res.cookie("JWT",token);
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

app.patch("/forgetPassword", async function(req,res){
try{
    let {email} = req.body;
    //mail ke basis par search ho raha he
    //by default->find and update ->not udpated send document
    //new = true _. we will get updated doc
    //{otp:otp,otpExpiry:afterFiveMin},{new:true}
    let user = await userModel.findOne({email:email});
    if(user){
        let otp = otpGenerator();
        let afterFiveMin = Date.now() + 1000*60*5;
    
   await mailSender(email,otp);
   user.otp = otp;
   user.otpExpiry = afterFiveMin;
   await user.save();
   res.json({
    data:user,
    "message":"otp sent to your email"
   })
    }
    else{
        res.json({
            result:"user with this email does not exist"
        })
    }
}
catch(err){
    res.send(err.message);
}
    
})
app.patch("/resetPassword",async function(req,res){
try{
let {otp,password,confirmPassword,email} = req.body;
let user = await userModel.findOne({email});
let currentTime = Date.now();
if(currentTime > user.otpExpiry){
    delete user.otp;
    delete user.otpExpiry;
    await user.save();
    res.json({
        message:"OTP Expired"
    })
}else{
    if(user.otp != otp){
        res.json({
            message:"OTP does not match"
        })
    }
    else{
        user = await userModel.findOneAndUpdate({otp},{password,confirmPassword},{runValidators:true,new:true});
        delete user.otp;
        delete user.otpExpiry;
        await user.save();

        res.json({
            user:user,
            message:"user password reset complete"
        })

    }
}


}
catch(err){
   res.send(err.message);
}

})

function otpGenerator(){
    return Math.floor(Math.random() * 1000000);
}



app.get("/users",protectRoute,async function(req,res){
    try{
        let users = await userModel.find();
        res.json(users);

    }   
    catch(err){
        res.send(err.message);
    }
})

app.get("/user",protectRoute,async function(req,res){
    const userId = req.userId;
    const user = await userModel.findById(userId);
    res.json({
        data:user,
        message:"data about logged in user is send"
    })
})

function protectRoute(req,res,next){
    try{
        let cookies = req.cookies;
        let JWT = cookies.JWT;
        if(cookies.JWT){
            const token = jwt.verify(JWT,secretKey);
            console.log(token);
            let userId = token.data;
            req.userId = userId;

            next();
        }
        else{
            res.send("you are not logged in kindly login");
        }
    }
    catch(err){
        console.log(err);
        res.send(err.message);
    }
}


app.listen(3000,function(req,res){
    console.log("server started at 3000")
})

