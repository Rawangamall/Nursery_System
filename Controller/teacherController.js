const mongoose=require("mongoose");
require("./../Models/teacher");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const teacherSchema=mongoose.model("teacher");

exports.getAllteachers=(request,response,next)=>{
   // console.log(request);    //test token
    teacherSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}

exports.addTeacher=(request,response,next)=>{
    if(request.body.password != null){
        var hash = bcrypt.hashSync(request.body.password,salt);
      }
 new teacherSchema({
    _id:request.body._id,
    fullname:request.body.fullname,
    email:request.body.email,
    password:hash,
    images:request.body.images
   }).save()
    .then((data)=>{
        response.status(201).json({data});
    })
    .catch(error=>{
    next(error);
    })
}

exports.updateTeacher=(request,response,next)=>{
    if(request.body.password != null){
    var hash = bcrypt.hashSync(request.body.password,salt);
    }
    teacherSchema.updateOne(
    {_id:request.body._id}
    ,{
        $set:{
            fullname:request.body.fullname,
            email:request.body.email,
            password:hash,
            images:request.body.images
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("the yeacher not found"));
        }
        else
        response.status(200).json({data:"updated"});
    })
    .catch(error=>next(error));
    
}
exports.deleteTeacher=(request,response)=>{
    teacherSchema.deleteOne({_id:request.params._id})
    .then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("the child not found"));
        }
        else
        response.status(200).json({data:"deleted"});
    })
    .catch(error=>next(error));}