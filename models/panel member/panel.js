const mongoose = require("mongoose");
const panelMemberSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Id required"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please provide an valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: [8, "Password must have atleast 8 characters"],
    },
    faculty: {
      type: String,
      enum: [
        "Faculty of Information Technology",
        "Faculty of Engineering",
        "Faculty of Business",
      ],
      required: [true, "Please select a faculty"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number required"],
      minlength: [10, "Contact number must have 10 digits"],
      maxlength: [10, "Contact number must have 10 digits"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("panelmember", panelMemberSchema);
