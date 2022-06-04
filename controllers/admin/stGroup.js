const Group = require("../../models/student/group");

const updateGroup = async (req, res) => {
  const groupId = req.params.id;

  try {
    const group = await Group.findOneAndUpdate({ _id: groupId }, req.body);
    res.send(group);
  } catch (error) {
    res.send(error);
  }
};

const deleteGroup = async (req, res) => {
  const groupId = req.params.id;
  try {
    const group = await Group.findOneAndDelete({ _id: groupId });
    if (!group) {
      res.send({ msg: "group Not Found" });
    } else {
      res.send(group);
    }
  } catch (error) {
    res.send(error);
  }
};

const getGroups = async (req, res) => {
  try {
    const group = await Group.find({ panelMember1: "member" });
    res.send(group);
  } catch (error) {
    res.send(error);
  }
};

const getGroup = async (req, res) => {
  const groupId = req.params.id;
  try {
    const group = await Group.findOne({ _id: groupId });
    if (group) {
      res.json(group);
    } else {
      res.json("group not found");
    }
  } catch (error) {
    res.send(error);
  }
};

const getGroupHome = async (req, res) => {
  const stId = req.params.id;
  try {
    const group = await Group.findOne({ student1: stId });
    if (group) {
      res.json(group);
    } else {
      res.json("group not found");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  deleteGroup,
  updateGroup,
  getGroup,
  getGroupHome,
  getGroups,
};
