const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb+srv://mittal123:Tushar@cluster0.4orw0.mongodb.net/User?retryWrites=true&w=majority').then(()=>{
    console.log("Connected Successfully.");
}).catch((err)=>{  
    console.log('Some error connecting with DB.');
});

const userSchema = new mongoose.Schema({
    name :{
        type :String,
        required : true,
    },
    email :{
        type : String,
        unique : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    password :{
        type : String,
        required : true
    },
    jwt : {
        type : String
    },
    posts : [
        {
            post : {
               type:String 
            },
            likes :{
                type : Number,
                default : 0
            }
        }
    ]

});

module.exports = mongoose.model("User",userSchema);
