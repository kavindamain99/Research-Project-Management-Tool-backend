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

router.post("/insert/submission", authenticate, insertSubmission);
router.delete("/delete/submission/:id", authenticate, deleteSubmission);
router.put("/update/submission/:id", authenticate, updateSubmission);
router.get("/get/submission/:id", authenticate, getSubmission);
router.get("/get/submission", authenticate, getSubmissions);

module.exports = router;
