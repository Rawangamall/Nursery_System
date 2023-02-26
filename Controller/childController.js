const mongoose=require("mongoose");
require("./../Models/child");

const childSchema=mongoose.model("child");

exports.getAllchildren=(request,response,next)=>{
    
    childSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}

exports.addchild=(request,response,next)=>{
   new childSchema({
    _id:request.body._id,
    age:request.body.age,
    fullname:request.body.fullname,
    level:request.body.level,
    address:request.body.address
  }).save()
    .then((data)=>{
        response.status(201).json({data});
    })
    .catch(error=>{
    next(error);
    })
}

exports.updatechild=(request,response,next)=>{
    
    childSchema.updateOne(
    {_id:request.body._id}
    ,{
        $set:{
            age:request.body.age,
            fullname:request.body.fullname,
            level:request.body.level,
            address:request.body.address
          }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("the child not found"));
        }
        else
        response.status(200).json({data:"updated"});
    })
    .catch(error=>next(error));
    
}
exports.deletechild=(request,response,next)=>{
    childSchema.deleteOne({_id:request.params._id})
    .then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("the child not found"));
        }
        else
        response.status(200).json({data:"deleted"});
    })
    .catch(error=>next(error));
} 