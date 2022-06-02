const Document = require("../../models/admin/document");
const Group = require("../../models/student/group");
const Research = require("../../models/student/research");
const Submission = require("../../models/student/submission");

const graphData = async (req, res) => {
  try {
    const count = await Document.find().count();
    const groups = await Group.find().count();
    const newgroups = await Group.find({
      panelMember1: { $ne: "member" },
    }).count();
    const submission = await Submission.find().count();
    const research = await Research.find().count();

    const data = {
      document: count,
      groups: groups,
      newGroups: newgroups,
      research: research,
      submission: submission,
    };
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { graphData };
