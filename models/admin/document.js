const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "please provide a document name"],
    },
    desc: {
      type: "string",
      required: [true, "please provide a document description"],
    },
    studentAllowed: {
      type: "boolean",
      default: false,
    },
    staffAllowed: {
      type: "boolean",
      default: false,
    },
    type: {
      type: "string",
      default: "document",
    },
    document: {
      type: "string",
      default: "placeholder.jpg",
    },
    cloudinary_id: {
      type: "string",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("document", documentSchema);
