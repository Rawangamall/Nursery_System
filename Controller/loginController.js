const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");

require("./../Models/teacher");
const teacherSchema=mongoose.model("teacher");

exports.login = (request, response, next) => {
	if (request.body.fullname == "admin" && request.body.password == 1234) {
		let token = jwt
        .sign({ _id: 1, role: "admin" }, "SK", { expiresIn: "3h" });
		response.status(200).json({ message: "Authenticated", token });
	}
	else{
		teacherSchema.findOne({ fullname: request.body.fullname })
			.then((data) => {
				if (data == null) {
					let error = new Error("Not Authenticated");
					error.status = 401;
					next(error);
               }else{
				let token = jwt
				.sign({ _id:2, role: "teacher" }, "SK", { expiresIn: "3h" });
				response.status(200).json({ message: "Authenticated", token });
			   }
           })
       }
}