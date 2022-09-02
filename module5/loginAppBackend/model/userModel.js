
const mongoose = require('mongoose');
const {Schema } = mongoose;
const pass = require("../secrets");

let dbLink =  `mongodb+srv://dbUser:${pass}@cluster0.ldaghnx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbLink).then(function(){
    console.log("connected");
}).catch(function(err){
    console.log("erorr",err);
})
//how to create a schema -> only entries will be added to you schema

let userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is not given please provide a name"]
    },
    password:{
        type:String,
        required:[true,"Password is missing"]
    },
    confirmPassword:{
        type:String,
        required:[true,"Confirm password is missing"],

        validate:{
            validator: function(){
                return this.password == this.confirmPassword;
            },
            message:"Password mismatch"
        }
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email is missing"]
    },
    phone:{
        type:String,
        minLength:[10,"Less than 10 numbers"],
        maxLength:[10,"more than 10 numbers"]
    },
    pic:{
        type:String,
        default:"logo2.png"
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    },
    address:{
        type:String
    }

})

//now we have to convert it into a model so that we can work on it
//model will be responsible to create document and read document

const userModel = mongoose.model('LoginUserModel',userSchema);
module.exports = userModel;
