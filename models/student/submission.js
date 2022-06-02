const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: "string",
    },
    groupId: {
      type: "string",
    },
    type: {
      type: "string",
    },

    topicId: {
      type: "string",
    },
    submitTime: {
      type: "string",
    },
    document: {
      type: "string",
      default: "placeholder.jpg",
    },
    marked: {
      type: "boolean",
      default: false,
    },
    markedBy: {
      type: "string",
      default: "pending",
    },
    cloudinary_id: {
      type: "string",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("studentSubmission", submissionSchema);
