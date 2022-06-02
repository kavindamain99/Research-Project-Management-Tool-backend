const Submission = require("../../models/student/submission");
const cloudinary = require("../../helpers/admin/cloudinary");

const insertSubmission = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "studentSubmission",
    });

    let document = new Submission({
      studentId: req.body.studentId,
      groupId: req.body.groupId,
      topicId: req.body.topicId,
      type: req.body.type,
      submitTime: req.body.submitTime,
      document: result.secure_url,
      cloudinary_id: result.public_id,
    });

    console.log(document);
    documentSaved = await document.save();
    res.json(documentSaved);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { insertSubmission };
