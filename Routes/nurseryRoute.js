const express=require("express");
const teacherController=require("./../Controller/teacherController");
const childController=require("./../Controller/childController");
const classController=require("./../Controller/classController");
const router=express.Router();
const validateMW=require("./../Core/validation/validateMW");
const validateData=require("./../Core/validation/validateDataArray");
const { checkAdmin, checkTeacherAndAdmin }  = require("./../Core/auth/authenticationMW")
const multer = require("multer");
const path = require("path");

     //--------------image uploading-------------
const storage = multer.diskStorage({
        destination: (request, file, callback) => {
        callback(null, path.join(__dirname, "..", "images"));
        },
        filename: function(req, file, cb){
        cb(null,file.originalname + '-' + Date.now() + path.extname(file.originalname));
        }
        
        });

const upload = multer({
        storage: storage,
        fileFilter:function(req, file, cb){
                const filetypes = /jpeg|jpg|png|gif/;
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                const mimetype = filetypes.test(file.mimetype);
              
                if(mimetype && extname){
                  return cb(null,true);
                } else {
                  cb('Error: Images Only!');
                }          
          }
        });
  
      
        //----------------------teacher--------------------

router.route("/teachers")
       .all(checkAdmin)
      .get(validateMW,teacherController.getAllteachers)
      .post(upload.single("images"),validateData.TeacherArrayPOST,validateMW,teacherController.addTeacher)
      
router.route("/teacher/:_id")
        .patch(checkTeacherAndAdmin,upload.single("images"),validateData.TeacherArrayPatch,validateMW,teacherController.updateTeacher)
        .delete(checkAdmin,validateData.TeacherArrayDel,teacherController.deleteTeacher)


        //----------------------child--------------------

router.route("/child")
        .get(validateMW,childController.getAllchildren)
        .post(validateData.childArrayPOST,validateMW,childController.addchild)

router.route("/child/:_id")
.patch(validateData.childArrayPatch,validateMW,childController.updatechild)
.delete(validateData.childArrayDel,childController.deletechild)


        //----------------------class--------------------
        
router.route("/class")
        .get(validateMW,classController.getAllclasses)
        .post(validateData.classArrayPOST,validateMW,classController.addclass)

router.route("/class/:_id")
.patch(validateData.classArrayPatch,validateMW,classController.updateClass)
.delete(validateData.classArrayDel,classController.deleteclass)

router.route("/classchildern/:_id")
.get(validateMW,classController.getChildClass)

router.route("/classTeacher/:_id")
.get(validateMW,classController.getTeacherClass)

module.exports=router;