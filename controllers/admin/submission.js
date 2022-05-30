const Submission = require("../../models/admin/submission");

const insertSubmission = async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.send(submission);
  } catch (error) {
    res.send(error);
  }
};

const updateSubmission = async (req, res) => {
  const subId = req.params.id;

  try {
    const submission = await Submission.findOneAndUpdate(
      { _id: subId },
      req.body
    );
    res.json(submission);
  } catch (error) {
    res.send(error);
  }
};

const deleteSubmission = async (req, res) => {
  const subId = req.params.id;
  try {
    const submission = await User.findOneAndDelete({ _id: subId });
    if (!submission) {
      res.send({ msg: "submission Not Found" });
    } else {
      res.send(submission);
    }
  } catch (error) {
    res.send(error);
  }
};

const getSubmissions = async (req, res) => {
  try {
    const submission = await Submission.find();
    res.send(submission);
  } catch (error) {
    res.send(error);
  }
};

const getSubmission = async (req, res) => {
  const subId = req.params.id;
  try {
    const submission = await Submission.findOne({ _id: subId });
    if (submission) {
      res.json(submission);
    } else {
      res.json("submission not found");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  insertSubmission,
  deleteSubmission,
  updateSubmission,
  getSubmission,
  getSubmissions,
};
