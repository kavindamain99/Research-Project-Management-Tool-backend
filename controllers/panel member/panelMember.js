const Topic = require("../../models/student/research");
const Group = require("../../models/student/group.js");
const StudentDocuments = require("../../models/student/document.js");
const Result = require("../../models/student/result.js");
const Document = require("../../models/admin/document");

const topicById = async (request, response, next) => {
  const topicId = request.params.id;
  const filter = {
    topicId: topicId,
    state: "accepted",
  };
  try {
    const topic = await Topic.findOne(filter);
    if (topic) {
      request.topic = topic;
      next();
    } else {
      return response
        .status(400)
        .json({ message: "Topic could not be found", error: error });
    }
  } catch (error) {
    return response
      .status(400)
      .json({ message: "Topic could not be found", error: error });
  }
};

const groupIDs = async (request, response, next) => {
  const panelMemberId = request.panelMember.id;

  try {
    const groupIDs = await Group.find({
      $or: [
        { panelMember1: panelMemberId },
        { panelMember2: panelMemberId },
        { panelMember3: panelMemberId },
      ],
    }).select("groupId -_id");
    var IDArray = [];

    groupIDs.forEach((id) => {
      IDArray.push(id.groupId);
    });

    request.groupIDs = IDArray;
    next();
  } catch (error) {
    return response
      .status(400)
      .json({ error: error, message: "Unable to fetch relevant group IDs" });
  }
};

const getSingleTopic = async (request, response) => {
  return response.status(200).json(request.topic);
};

const getAllTopics = async (request, response) => {
  const state = request.params.state;
  const filter = {
    state: "accepted",
    evaluated: state,
    groupId: request.groupIDs,
  };
  try {
    const topics = await Topic.find(filter);
    return response.status(200).json(topics);
  } catch (error) {
    return response
      .status(400)
      .json({ message: "Topics not found", error: error });
  }
};

const evaluateTopic = async (request, response) => {
  const topic = request.topic;

  topic.panelMemberId = request.panelMember.id;
  topic.panelMemberName =
    request.panelMember.firstName + " " + request.panelMember.lastName;
  topic.evaluated = true;
  topic.evaluation = request.body.evaluation;

  const evaluatedTopic = new Topic(topic);
  try {
    await evaluatedTopic.save();
    return response.status(200).json({ message: "Update succesfull" });
  } catch (error) {
    return response
      .status(400)
      .json({ message: "Update failed", error: error });
  }
};

const getDocuments = async (_request, response) => {
  try {
    const documents = await Document.find({ staffAllowed: true });
    return response.status(200).json(documents);
  } catch (error) {
    return response
      .status(400)
      .json({ message: "Unable to fetch documents", error: error });
  }
};

const getStudentPresentations = async (request, response) => {
  const filter = {
    groupId: request.groupIDs,
    type: "presentation",
    marked: false,
  };

  try {
    const presentations = await StudentDocuments.find(filter);
    return response.status(200).json(presentations);
  } catch (error) {
    return response
      .status(400)
      .json({ error: error, message: "Unable to fetch presentations" });
  }
};

const getStudentPresentation = async (request, response) => {
  const presentationId = request.params.id;

  try {
    const presentation = await StudentDocuments.findById(presentationId);
    return response.status(200).json(presentation);
  } catch (error) {
    return response
      .status(400)
      .json({ error: error, message: "Unable to the fetch presentation" });
  }
};

const getGroup = async (request, response) => {
  const groupId = request.params.id;

  try {
    const group = await Group.findOne({ groupId: groupId });
    return response.status(200).json(group);
  } catch (error) {
    return response.status(400).json({ error: "Unable to find the group" });
  }
};

const evaluate = async (request, response) => {
  const marks = request.body;
  const groupId = request.params.id;

  console.log(marks);

  try {
    const result = await Result.findOne({ groupId: groupId });
    if (result) {
      result.student1.presentationMarks = marks.student1;
      result.student2.presentationMarks = marks.student2;
      result.student3.presentationMarks = marks.student3;
      result.student4.presentationMarks = marks.student4;

      try {
        await result.save();
        return response.status(200).json({ message: "Evaluation succesfull" });
      } catch (error) {
        return response
          .status(400)
          .json({ error: "Unable to submit the evaluation" });
      }
    } else {
      var newResult = new Result();

      try {
        const group = await Group.findOne({ groupId: groupId });

        newResult.groupId = groupId;
        newResult.student1.studentId = group.student1;
        newResult.student1.presentationMarks = marks.student1;
        newResult.student2.studentId = group.student2;
        newResult.student2.presentationMarks = marks.student2;
        newResult.student3.studentId = group.student3;
        newResult.student3.presentationMarks = marks.student3;
        newResult.student4.studentId = group.student4;
        newResult.student4.presentationMarks = marks.student4;

        console.log(newResult);

        try {
          await newResult.save();
          return response
            .status(200)
            .json({ message: "Evaluation succesfull" });
        } catch (error) {
          return response
            .status(400)
            .json({ error: "Unable to submit the evaluation" });
        }
      } catch (error) {
        return response.status(400).json({ error: "Unable to find the group" });
      }
    }
  } catch (error) {
    return response.status(400).json({ error: "Unable to find a result" });
  }
};

/**
 * update state of the presentation to marked
 */
const updatePresentationState = async (request, response) => {
  const presentationId = request.params.id;

  try {
    const presentation = await StudentDocuments.findById(presentationId);
    if (presentation) {
      presentation.marked = true;

      try {
        await presentation.save();
        return response.status(200).json({ message: "Update succesfull" });
      } catch (error) {
        console.log(error);
        return response.status(400).json({ error: "Update failed" });
      }
    }
  } catch (error) {
    confirm.log(error);
    return response.status(400).json({ error: "Unable to find presentation" });
  }
};

module.exports = {
  topicById,
  getSingleTopic,
  getAllTopics,
  evaluateTopic,
  groupIDs,
  getDocuments,
  getStudentPresentations,
  getStudentPresentation,
  getGroup,
  evaluate,
  updatePresentationState,
};
