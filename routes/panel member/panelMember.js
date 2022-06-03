const express = require("express");

const {
  panelMemberAuthorization,
} = require("../../helpers/supervisor/authorization.js");

const {
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
} = require("../../controllers/panel member/panelMember.js");

const {
  signUp,
  signIn,
} = require("../../controllers/panel member/registration.js");

const router = express.Router();

router.post("/panelmember/signup", signUp);
router.post("/panelmember/signin", signIn);
router.post("/panelmember/evaluation/:id", panelMemberAuthorization, evaluate);

router.get(
  "/panelmember/topic/:id",
  panelMemberAuthorization,
  topicById,
  getSingleTopic
);
router.get(
  "/panelmember/topics/:state",
  panelMemberAuthorization,
  groupIDs,
  getAllTopics
);
router.get("/panelmember/documents", panelMemberAuthorization, getDocuments);
router.get(
  "/panelmember/student/presentations",
  panelMemberAuthorization,
  groupIDs,
  getStudentPresentations
);
router.get(
  "/panelmember/student/presentation/:id",
  panelMemberAuthorization,
  getStudentPresentation
);
router.get(
  "/panelmember/student/group/:id",
  panelMemberAuthorization,
  getGroup
);

router.put(
  "/panelmember/topic/:id",
  panelMemberAuthorization,
  topicById,
  evaluateTopic
);
router.put(
  "/panelmember/student/presentaton/:id",
  panelMemberAuthorization,
  updatePresentationState
);

module.exports = router;
