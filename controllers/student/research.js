const Research = require("../../models/student/research");
const Result = require("../../models/student/result");

const insertResearch = async (req, res) => {
  try {
    const research = await Research.create(req.body);
    res.send(research);
  } catch (error) {
    res.send(error);
  }
};

const updateResearch = async (req, res) => {
  const researchId = req.params.id;

  try {
    const research = await Research.findOneAndUpdate(
      { _id: researchId },
      req.body
    );
    res.send(research);
  } catch (error) {
    res.send(error);
  }
};

const deleteResearch = async (req, res) => {
  const researchId = req.params.id;
  try {
    const research = await Research.findOneAndDelete({ _id: researchId });
    if (!research) {
      res.send({ msg: "research Not Found" });
    } else {
      res.send(research);
    }
  } catch (error) {
    res.send(error);
  }
};

const getResearchs = async (req, res) => {
  try {
    const research = await Research.find();
    res.send(research);
  } catch (error) {
    res.send(error);
  }
};

const getResearch = async (req, res) => {
  const researchId = req.params.id;
  try {
    const research = await Research.findOne({ studentId: researchId });
    if (research) {
      res.json(research);
    } else {
      res.json("research not found");
    }
  } catch (error) {
    res.send(error);
  }
};

const getResult = async (req, res) => {
  const groupId = req.params.id;

  try {
    const result = await Result.find({ groupId: groupId });
    if (result) {
      res.json(result);
    } else {
      res.json("no result found");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  insertResearch,
  deleteResearch,
  updateResearch,
  getResearchs,
  getResearch,
  getResult,
};
