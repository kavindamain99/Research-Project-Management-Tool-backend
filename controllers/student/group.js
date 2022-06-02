const Group = require("../../models/student/group");

const insertGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.json(group);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { insertGroup };
