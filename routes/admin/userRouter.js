const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} = require("../../controllers/admin/userList");

router.get("/getStudents", authenticate, getStudents);
router.get("/getStudent/:id", authenticate, getStudent);
router.put("/updateStudent/:id", authenticate, updateStudent);
router.delete("/deleteStudent/:id", authenticate, deleteStudent);

module.exports = router;
