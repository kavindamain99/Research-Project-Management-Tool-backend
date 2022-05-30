const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  groupId: {
    type: "string",
    required: [true, "Group Id must be provided"],
  },
  topic: {
    type: "string",
    required: [true, "Topic must be provided"],
  },
  researchfield: {
    type: "string",
    required: [true, " Research Field must be provided"],
  },
  supervisor: {
    type: "string",
    default: "member",
  },
  coSupervisor: {
    type: "string",
    default: "member",
  },
  status: {
    type: "boolean",
    default: true,
  },
});

module.exports = new mongoose.model("research", researchSchema);
