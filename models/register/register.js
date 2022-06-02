const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: [true, "please Enter name"],
  },
  lastName: {
    type: "string",
    required: [true, "please Enter name"],
  },
  email: {
    type: "string",
    required: [true, "please Enter email"],
    //validate email
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      "please provide valid email",
    ],
  },
  password: {
    type: "string",
    required: [true, "please Enter password"],
    minlength: [4, "must be least 4 characters"],
  },
  contactNum: {
    type: "string",
    required: [true, "Please enter a contact number"],
    minlength: [10, "must be 10 characters"],
    maxlength: [10, "must be 10 characters"],
  },
  studentId: {
    type: "string",
    required: [true, "Please enter a student id"],
    unique: [true, "Student id already exists"],
  },
  degree: {
    type: "string",
    required: [true, "Please enter a degree"],
  },
});

//hashing password using acessing the mongoose cretae middleware
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
//return first name
userSchema.methods.getId = function () {
  return this.studentId;
};

module.exports = mongoose.model("User", userSchema);
