const express = require("express");
const router = express.Router();

const {
  Login,
  Register,
  adminLogin,
} = require("../../controllers/register/register");

router.post("/login", Login);
router.post("/register", Register);
router.post("/admin", adminLogin);

module.exports = router;
