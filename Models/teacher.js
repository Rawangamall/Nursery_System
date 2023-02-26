const mongoose=require("mongoose");

const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

//create schema objcet
const schema=new mongoose.Schema({
    _id:{type:mongoose.ObjectId,required:true},
    fullname:String,
    email:{type: String,required:true,validate:[validateEmail,"invalid email"],unique:true},
    password:String,
    images:String
});

//mapping
mongoose.model("teacher",schema);
