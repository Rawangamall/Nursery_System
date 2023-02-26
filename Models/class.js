const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object

const schema=new mongoose.Schema({
    _id: Number,
    name:String,
    supervisior: { type: mongoose.ObjectId, ref: "teacher" },
    childernIDs: { type: Array, ref: "child" ,required:true}
});

schema.plugin(AutoIncrement);

//mapping
mongoose.model("class",schema);
