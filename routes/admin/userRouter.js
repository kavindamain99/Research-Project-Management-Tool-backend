const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  getPanel,
  getPanelS,
  deletePanel,
} = require("../../controllers/admin/userList");

router.get("/getStudents", getStudents);
router.get("/get/panel", getPanel);
router.get("/get/panel/:id", getPanelS);
router.delete("/delete/panel/:id", deletePanel);

router.get("/getStudent/:id", getStudent);
router.put("/update/student/:id", updateStudent);
router.delete("/delete/student/:id", deleteStudent);

module.exports = router;
