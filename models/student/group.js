const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: {
    type: "string",
    required: [true, "group name must be provided"],
  },
  groupId: {
    type: "string",
    unique: true,
    default: "id",
  },
  student1: {
    type: "string",
    required: [true, "student must be provided"],
    unique: true,
  },
  student2: {
    type: "string",
    required: [true, "student must be provided"],
    unique: true,
  },
  student3: {
    type: "string",
    required: [true, "student must be provided"],
    unique: true,
  },
  student4: {
    type: "string",
    required: [true, "student must be provided"],
    unique: true,
  },
  panelMember1: {
    type: "string",
    default: "member",
  },
  panelMember2: {
    type: "string",
    default: "member",
  },
  panelMember3: {
    type: "string",
    default: "member",
  },
});

module.exports = new mongoose.model("group", groupSchema);
