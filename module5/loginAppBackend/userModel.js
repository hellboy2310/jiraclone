
const mongoose = require('mongoose');

let dbLink =  `mongodb+srv://dbUser:Cgd8lbLa5BkNVDVb@cluster0.ldaghnx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbLink).then(function(){
    console.log("connected");
}).catch(function(err){
    console.log("erorr",err);
})