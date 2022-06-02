const express = require("express");
const router = express.Router();

const authenticate = require("../../helpers/registerMiddlware/auth");

const {
  deleteGroup,
  updateGroup,
  getGroups,
  getGroup,
} = require("../../controllers/admin/stGroup");

const { insertGroup } = require("../../controllers/student/group");

router.post("/insert/group", insertGroup);
router.delete("/delete/group/:id", deleteGroup);
router.put("/update/group/:id", updateGroup);
router.get("/get/group/:id", getGroup);
router.get("/get/group", getGroups);

module.exports = router;
