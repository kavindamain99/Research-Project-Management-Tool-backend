const Staff = require("../../models/panel member/register");

const getStaffs = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.send(staff);
  } catch (error) {
    res.send(error);
  }
};

const getStaff = async (req, res) => {
  const staffId = req.params.id;
  try {
    const staff = await Staff.findOne({ _id: staffId });
    if (staff) {
      res.send(staff);
    } else {
      res.send("staff not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateStaff = async (req, res) => {
  const staffId = req.params.id;

  try {
    const staff = await Staff.findOneAndUpdate({ _id: staffId }, req.body);
    res.send(staff);
  } catch (error) {
    res.send(error);
  }
};
const deleteStaff = async (req, res) => {
  const staffId = req.params.id;

  try {
    const staff = await Staff.findOneAndDelete({ _id: staffId });
    if (!student) {
      res.send({ msg: "Staff Not Found" });
    } else {
      res.send(staff);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getStaff,
  getStaffs,
  deleteStaff,
  updateStaff,
};
