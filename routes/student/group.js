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

router.post("/insert/group", authenticate, insertGroup);
router.delete("/delete/group/:id", authenticate, deleteGroup);
router.put("/update/group/:id", authenticate, updateGroup);
router.get("/get/group/:id", authenticate, getGroup);
router.get("/get/group", authenticate, getGroups);

module.exports = router;
