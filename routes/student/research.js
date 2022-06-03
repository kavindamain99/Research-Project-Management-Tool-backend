const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const {
  insertResearch,
  deleteResearch,
  updateResearch,
  getResearchs,
  getResearch,
  getResult,
} = require("../../controllers/student/research");

router.post("/insert/research", insertResearch);
router.delete("/delete/research/:id", authenticate, deleteResearch);
router.put("/update/research/:id", authenticate, updateResearch);
router.get("/get/research/:id", getResearch);
router.get("/get/research", getResearch);
router.get("/get/result/:id", getResult);

module.exports = router;
