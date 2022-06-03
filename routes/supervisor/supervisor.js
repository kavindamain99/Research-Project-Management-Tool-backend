const express = require("express");

const {
  supervisorAuthorization,
} = require("../../helpers/supervisor/authorization.js");

const {
  signUp,
  signIn,
} = require("../../controllers/supervisor/registration.js");

const {
  topicById,
  getSingleTopic,
  getAllTopics,
  updateState,
  getDocuments,
  groupIDs,
  getAssignedGroups,
  getStudentDocuments,
  getStudentDocument,
  getGroup,
  evaluateDocument,
  evaluateFinalThesis,
  updateDocumentState,
} = require("../../controllers/supervisor/supervisor.js");

const router = express.Router();

router.post("/supervisor/signup", signUp);
router.post("/supervisor/signin", signIn);
router.post(
  "/supervisor/evaluation/document/:id",
  supervisorAuthorization,
  evaluateDocument
);
router.post(
  "/supervisor/evaluation/finalthesis/:id",
  supervisorAuthorization,
  evaluateFinalThesis
);

router.get(
  "/supervisor/topic/:id",
  supervisorAuthorization,
  topicById,
  getSingleTopic
);
router.get("/supervisor/topics/:state", supervisorAuthorization, getAllTopics);
router.get(
  "/supervisor/groups",
  supervisorAuthorization,
  groupIDs,
  getAssignedGroups
);
router.get("/supervisor/documents", supervisorAuthorization, getDocuments);
router.get(
  "/supervisor/student/documents/:type",
  supervisorAuthorization,
  groupIDs,
  getStudentDocuments
);
router.get(
  "/supervisor/student/document/:id",
  supervisorAuthorization,
  getStudentDocument
);
router.get("/supervisor/student/group/:id", supervisorAuthorization, getGroup);

router.put(
  "/supervisor/topic/:id/:state",
  supervisorAuthorization,
  topicById,
  updateState
);
router.put(
  "/supervisor/student/document/:id",
  supervisorAuthorization,
  updateDocumentState
);

module.exports = router;
