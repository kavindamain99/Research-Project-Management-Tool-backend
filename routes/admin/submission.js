const express = require("express");
const router = express.Router();

const authenticate = require("../../helpers/registerMiddlware/auth");

const {
  insertSubmission,
  deleteSubmission,
  updateSubmission,
  getSubmissions,
  getSubmission,
} = require("../../controllers/admin/submission");

router.post("/insert/submission", insertSubmission);
router.delete("/delete/submission/:id", deleteSubmission);
router.put("/update/submission/:id", updateSubmission);
router.get("/get/submission/:id", authenticate, getSubmission);
router.get("/get/submission", getSubmissions);

module.exports = router;
