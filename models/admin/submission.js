const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "please provide a submission namee"],
  },
  desc: {
    type: "string",
    required: [true, "please provide a description"],
  },
  type: {
    type: "string",
    required: [true, "please provide a submission type "],
  },
  deadline: {
    type: "string",
    required: [true, "please provide a deadline"],
  },
  degree: {
    type: "string",
    required: [true, "please provide a degree"],
  },
});

module.exports = new mongoose.model("submission", submissionSchema);
