const Group = require("../../models/student/group");

const insertGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.send(group);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { insertGroup };
