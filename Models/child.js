const mongoose=require("mongoose");

//create schema object

const schema=new mongoose.Schema({
    _id:{type:Number,required:true},
    age:Number,
    fullname:String,
    level:{ type: String,enum :["PreKG","KG1","KG2"],default: "PreKG"},
    address:{type:Object ,
      city: String,
      street: String,
      building: Number,
    }
});

//mapping
mongoose.model("child",schema);
