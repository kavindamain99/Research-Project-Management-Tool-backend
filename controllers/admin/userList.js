const User = require("../../models/register/register");

const getStudents = async (req, res) => {
  try {
    const students = await User.find();
    res.json(students);
  } catch (error) {
    console.log(error);
  }
};

const getStudent = async (req, res) => {
  const userId = req.params.id;
  try {
    const student = await User.findOne({ _id: userId });
    if (student) {
      res.json(student);
    } else {
      res.json("student not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await User.findOneAndUpdate({ _id: studentId }, req.body);
    res.json(student);
  } catch (error) {
    res.send(error);
  }
};
const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await User.findOneAndDelete({ _id: studentId });
    if (!student) {
      res.json({ msg: "Student Not Found" });
    } else {
      res.json({ student });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
};
