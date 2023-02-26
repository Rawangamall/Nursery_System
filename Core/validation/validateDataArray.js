const {body,param,query}=require("express-validator");

exports.TeacherArrayPOST =[
body("_id").isMongoId().withMessage("should be object type") ,
body("fullname").isString().withMessage("full name should string") ,
body("email").isEmail().withMessage("should be valid email form") ,
body("password").isStrongPassword().withMessage("should be strong password"),
body("images").isString().withMessage("image should string")
]
exports.TeacherArrayPatch =[
    param("_id").isMongoId(),
    body("fullname").optional().isString().withMessage("full name should string") ,
    body("email").optional().isEmail().withMessage("should be valid email form") ,
    body("password").optional().isStrongPassword().withMessage("should be strong password"),
    body("images").optional().isString().withMessage("image should string")
]
exports.TeacherArrayDel =[
    param("_id").isMongoId()
]

//child data
exports.childArrayPOST =[
    body("_id").isInt().withMessage("id should be number type") ,
    body("age").isInt().withMessage("age should be number") ,
    body("level").isIn(["PreKG","KG1","KG2"]).withMessage("should be in one of the level"),
    body("address").isObject().withMessage("adress invalid") ,
    body("address.city").isString().withMessage("address city should be string") ,
    body("address.street").isString().withMessage("address street should be string") ,
    body("address.building").isInt().withMessage("address building should be number")
]
exports.childArrayPatch =[
    param("_id").isInt(),
    body("age").optional().isNumeric().withMessage("age should be number") ,
    body("level").optional().isIn(["PreKG","KG1","KG2"]).withMessage("should be in one of the level"),
    body("address").optional().isObject().withMessage("adress invalid") ,
    body("address.city").optional().isString().withMessage("address city should be string") ,
    body("address.street").optional().isString().withMessage("address street should be string") ,
    body("address.building").optional().isNumeric().withMessage("address building should be number")
]
exports.childArrayDel=[
    param("_id").isInt() 
]

//class data
exports.classArrayPOST =[
    body("name").isString().withMessage("name should string") ,
    body("supervisior").isMongoId(),
    body("childernIDs").isArray().isLength({min:1}).withMessage("ids should be array")
]
exports.classArrayPatch =[
    param("_id").isInt(),
    body("name").optional().isString().withMessage("name should string") ,
    body("supervisior").optional().isMongoId().withMessage("supervisior should be object"),
    body("childernIDs").optional().isArray().isLength({min:1}).withMessage("ids should be array")

]
exports.classArrayDel=[
    param("_id").isInt() 
]