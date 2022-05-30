const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const {
  insertResearch,
  deleteResearch,
  updateResearch,
  getResearchs,
  getResearch,
} = require("../../controllers/student/research");

router.post("/insert/research", authenticate, insertResearch);
router.delete("/delete/research/:id", authenticate, deleteResearch);
router.put("/update/research/:id", authenticate, updateResearch);
router.get("/get/research/:id", authenticate, getResearch);
router.get("/get/research", authenticate, getResearch);

module.exports = router;