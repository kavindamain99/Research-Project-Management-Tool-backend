const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const {
  getStaff,
  getStaffs,
  deleteStaff,
  updateStaff,
} = require("../../controllers/admin/staffList");

router.get("/get/staff", authenticate, getStaffs);
router.get("/get/staff/:id", authenticate, getStaff);
router.put("/update/staff/:id", authenticate, updateStaff);
router.delete("/delete/staff/:id", authenticate, deleteStaff);

module.exports = router;
