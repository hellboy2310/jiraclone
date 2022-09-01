
const mongoose = require('mongoose');
const {Schema } = mongoose;
const pass = require("./secrets");

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
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        minLength:10,
        maxLength:10
    },
    pic:{
        type:String,
        default:"logo2.png"
    },
    address:{
        type:String
    }

})

//now we have to convert it into a model so that we can work on it
//model will be responsible to create document and read document

const userModel = mongoose.model('LoginUserModel',userSchema);
module.exports = userModel;
 

