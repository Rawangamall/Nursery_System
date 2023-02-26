const mongoose=require("mongoose");
require("./../Models/class");
require("./../Models/teacher");
require("./../Models/child");

const classSchema=mongoose.model("class");
const childSchema=mongoose.model("child");
const teacherSchema=mongoose.model("teacher");

exports.getAllclasses=(request,response,next)=>{
    
    classSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}
exports.addclass=(request,response,next)=>{
    teacherSchema.find({_id:request.body.supervisior})
    .then((data)=>{
    if(data == null){
        next(new error("not found"));
    }
    else{
        return childSchema.find({_id:{$in: request.body.childernIDs}})
    }
    }).then((array)=>{
    if(array.length != request.body.childernIDs.length)
     {next(new error("There's children notfound"))}
     else{
       return new classSchema({
        name: request.body.name ,
        supervisior :request.body.supervisior ,
        childernIDs :request.body.childernIDs
        }).save()
     }
    }).then((data)=>{
         response.status(201).json({data});
     })
     .catch(error=>{
     next(error);
     })
 }
 exports.updateClass = async (request, response, next) => {
    if(request.body.supervisior != null){
    let teacher = await teacherSchema.findOne({ _id: request.body.supervisior });
       if (teacher == null) {next(new Error("supervisor not found"))};
    }
    else if(request.body.childernIDs != null){
      let child = await childSchema.find({ _id: { $in: request.body.childernIDs } });
      if (child.length != request.body.childernIDs.length)
       { next(new Error("child not found"));}
    }
        classSchema
          .updateOne(
            { _id: request.params._id },
            {
              $set: {
                name: request.body.name,
                supervisior: request.body.supervisior,
                childernIDs: request.body.childernIDs,
              },
            }
          )
          .then((data) => {
            if (data.matchedCount == 0) throw new Error("class not found");
            else response.status(201).json({ data: "updated" });
          })
          .catch((error) => next(error));
  };
  
  exports.deleteclass=(request,response,next)=>{
    classSchema.deleteOne({_id:request.params._id})
    .then(data=>{
        if(data.deletedCount==0)
        {
            next(new error("class not found"));
        }
        else
        response.status(200).json({data:"deleted"});
    })
    .catch(error=>next(error));
}
exports.getChildClass=(request,response,next)=>{
  classSchema.findOne({_id:request.params._id},{childernIDs:1,_id:0})
  .populate({path:"childernIDs",select:{fullname:1,_id:0}})
  .then((result)=>{
      if(result != null)
      {
          response.status(200).json({result});
      }
      else{
          response.status(404).json({data:"Not Found"});
      }
  })
  .catch(error=>{
      next(error);
  })
}

exports.getTeacherClass=(request,response ,next)=>{
  classSchema.findOne({_id:request.params._id},{supervisior:1,_id:0})
  .populate({path:"supervisior",select:{fullname:1,_id:0}})
  .then((result)=>{
      if(result != null)
      {
          response.status(200).json({result});
      }
      else{
          response.status(404).json({data:"Not Found"});
      }
  })
  .catch(error=>{
      next(error);
  })
}